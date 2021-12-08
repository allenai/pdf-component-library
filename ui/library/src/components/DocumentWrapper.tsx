import { PDFDocumentProxy } from 'pdfjs-dist/types/display/api';
import * as React from 'react';
import { DocumentProps } from 'react-pdf';
// Import from webpack entrypoint to load PDFjs worker
import { Document, pdfjs } from 'react-pdf/dist/esm/entry.webpack';

import { DocumentContext } from '../context/DocumentContext';
import { UiContext } from '../context/UiContext';
import { getErrorMessage } from '../utils/errorMessage';
import { computePageDimensions, IPDFPageProxy } from '../utils/scale';

export type Props = {
  children?: React.ReactNode;
} & DocumentProps;

export const DocumentWrapper: React.FunctionComponent<Props> = ({ children, ...rest }: Props) => {
  // Set PDFjs worker source or else none of this will work once imported into demo app.
  // Possibly related to issue #30125
  pdfjs.GlobalWorkerOptions.workerSrc = 'node_modules/pdfjs-dist/build/pdf.worker.min.js';

  const { setNumPages, setPageDimensions } = React.useContext(DocumentContext);
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
