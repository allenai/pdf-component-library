import { computePageDimensions, IPDFPageProxy } from '../utils/scale';
import { Document } from 'react-pdf/dist/esm/entry.webpack';
import { DocumentContext } from '../context/DocumentContext';
import { getErrorMessage } from '../utils/errorMessage';
import { initPdfWorker } from '../utils/pdfWorker';
import { PDFDocumentProxy } from 'pdfjs-dist/types/display/api';
import { UiContext } from '../context/UiContext';

import * as React from 'react';
import { DocumentProps } from 'react-pdf';

export type Props = {
  children?: React.ReactNode;
} & DocumentProps;

export const DocumentWrapper: React.FunctionComponent<Props> = ({ children, ...rest }: Props) => {
  initPdfWorker();

  const { pdfDocProxy, setNumPages, setPageDimensions, setPdfDocProxy } = React.useContext(DocumentContext);
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

    if (!pdfDocProxy)
      setPdfDocProxy(pdfDoc)
  }, []);

  const onPdfLoadError = React.useCallback((error: unknown): void => {
    setErrorMessage(getErrorMessage(error));
    setIsLoading(false);
  }, []);

  return (
    <Document
      options={{ cMapUrl: 'cmaps/', cMapPacked: true }}
      onLoadError={onPdfLoadError}
      onLoadSuccess={onPdfLoadSuccess}
      {...rest}>
      {children}
    </Document>
  );
};
