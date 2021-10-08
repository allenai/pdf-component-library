import { PDFDocumentProxy, PDFPageProxy } from 'pdfjs-dist/types/display/api';
import * as React from 'react';
import { DocumentProps } from 'react-pdf';
import { Document } from 'react-pdf/dist/esm/entry.webpack';

import { DocumentContext } from '../context/DocumentContext';
import { UiContext } from '../context/UiContext';
import { computePageDimensions } from '../scale';

type Props = {
  children?: React.ReactNode;
} & DocumentProps;

export const DocumentWrapper: React.FunctionComponent<Props> = ({ children, ...rest }: Props) => {
  const { setNumPages, setPageDimensions } = React.useContext(DocumentContext);
  const { setErrorMessage, setIsLoading } = React.useContext(UiContext);

  async function getFirstPage(pdfDoc: PDFDocumentProxy): Promise<PDFPageProxy> {
    // getPage uses 1-indexed pageNumber, not 0-indexed pageIndex
    return pdfDoc.getPage(1);
  }

  const onPdfLoadSuccess = React.useCallback(async (pdfDoc: PDFDocumentProxy) => {
    setNumPages(pdfDoc.numPages);

    const page = await getFirstPage(pdfDoc);
    const pageDimensions = computePageDimensions({
      userUnit: page.userUnit,
      topLeft: { x: page.view[0], y: page.view[1] },
      bottomRight: { x: page.view[2], y: page.view[3] },
    });
    setPageDimensions(pageDimensions);
    setErrorMessage(null);
    setIsLoading(false);
  }, []);

  const onPdfLoadError = React.useCallback((error: unknown) => {
    setIsLoading(false);
    setErrorMessage(getErrorMessage(error));
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function getErrorMessage(error: any): string {
    if (!error) {
      return 'Unknown error';
    }
    if (typeof error === 'string') {
      return error;
    }
    if (error instanceof Error) {
      return error.message;
    }
    if (typeof error.error === 'string') {
      return error.error;
    }
    return error.toString();
  }

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
