import * as React from 'react';
import { Document, DocumentProps, pdfjs } from 'react-pdf';

import { DocumentContext } from '../context/DocumentContext';
import { ScrollContext } from '../context/ScrollContext';
import { TransformContext } from '../context/TransformContext';
import { UiContext } from '../context/UiContext';
import { getErrorMessage } from '../utils/errorMessage';
import { initPdfWorker } from '../utils/pdfWorker';
import { computePageDimensions, IPDFPageProxy } from '../utils/scale';
import { scrollToPosition } from '../utils/scroll';
import { Destination, Ref } from './types/destination';

export type Props = {
  children?: React.ReactNode;
} & DocumentProps;

export const DocumentWrapper: React.FunctionComponent<Props> = ({
  children,
  ...extraProps
}: Props) => {
  initPdfWorker();

  const { pdfDocProxy, setNumPages, setPageDimensions, setPdfDocProxy } =
    React.useContext(DocumentContext);
  const { resetScrollObservers } = React.useContext(ScrollContext);
  const { rotation } = React.useContext(TransformContext);
  const { setErrorMessage, setIsLoading } = React.useContext(UiContext);

  function getFirstPage(pdfDoc: pdfjs.PDFDocumentProxy): Promise<IPDFPageProxy> {
    // getPage uses 1-indexed pageNumber, not 0-indexed pageIndex
    return pdfDoc.getPage(1);
  }

  React.useEffect(() => {
    resetScrollObservers();
  }, []);

  const onPdfLoadSuccess = React.useCallback((pdfDoc: pdfjs.PDFDocumentProxy): void => {
    setNumPages(pdfDoc.numPages);
    getFirstPage(pdfDoc)
      .then(page => {
        setPageDimensions(computePageDimensions(page));
        setErrorMessage(null);
      })
      .catch(error => {
        setErrorMessage(getErrorMessage(error));
      })
      .finally(() => {
        setIsLoading(false);
      });

    if (!pdfDocProxy) {
      setPdfDocProxy(pdfDoc);
    }
  }, []);

  const onPdfLoadError = React.useCallback((error: unknown): void => {
    setErrorMessage(getErrorMessage(error));
    setIsLoading(false);
  }, []);

  const onItemClicked = (param: Destination): void => {
    if (!pdfDocProxy) {
      return;
    }

    // Scroll to the destination of the item
    pdfDocProxy.getDestination(param.dest).then(destArray => {
      if (!destArray) {
        return;
      }

      const [ref, , , bottomPoints] = destArray;
      pdfDocProxy.getPageIndex(new Ref(ref)).then(refInfo => {
        scrollToPosition(parseInt(refInfo.toString()), 0, bottomPoints, rotation);
      });
    });
  };

  return (
    <Document
      options={{ cMapUrl: 'cmaps/', cMapPacked: true }}
      onLoadError={onPdfLoadError}
      onLoadSuccess={onPdfLoadSuccess}
      externalLinkTarget="_blank"
      // @ts-ignore: the arguments should be { dest, pageIndex, pageNumber }
      // @types/react-pdf hasn't updated the function signature
      // https://github.com/DefinitelyTyped/DefinitelyTyped/blob/d73eb652e0ba8f89395a0ef2ba69cf1e640ce5be/types/react-pdf/dist/Document.d.ts#L72
      onItemClick={onItemClicked}
      {...extraProps}>
      {children}
    </Document>
  );
};
