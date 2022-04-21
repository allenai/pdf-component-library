import { PDFDocumentProxy } from 'pdfjs-dist';
import * as React from 'react';
import { Document, DocumentProps } from 'react-pdf';

import { DocumentContext } from '../context/DocumentContext';
import { UiContext } from '../context/UiContext';
import { getErrorMessage } from '../utils/errorMessage';
import { initPdfWorker } from '../utils/pdfWorker';
import { computePageDimensions, IPDFPageProxy } from '../utils/scale';
import { scrollToPosition } from '../utils/scroll';
import Ref from './outline/Ref';

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
  const { setErrorMessage, setIsLoading } = React.useContext(UiContext);

  function getFirstPage(pdfDoc: PDFDocumentProxy): Promise<IPDFPageProxy> {
    // getPage uses 1-indexed pageNumber, not 0-indexed pageIndex
    return pdfDoc.getPage(1);
  }

  const onPdfLoadSuccess = React.useCallback((pdfDoc: PDFDocumentProxy): void => {
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

  const onItemClicked = (param: any): void => {
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
        console.log(refInfo);
        scrollToPosition(parseInt(refInfo.toString()), 0, bottomPoints);
      });
    });
  };

  return (
    <Document
      options={{ cMapUrl: 'cmaps/', cMapPacked: true }}
      onLoadError={onPdfLoadError}
      onLoadSuccess={onPdfLoadSuccess}
      // @ts-ignore: an object with { dest, pageIndex, pageNumber } is passed to the handler function but tslint thinks it should be { pageNumber }
      onItemClick={onItemClicked}
      {...extraProps}>
      {children}
    </Document>
  );
};
