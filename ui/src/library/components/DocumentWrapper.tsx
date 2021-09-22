import { PDFDocumentProxy } from 'pdfjs-dist/types/display/api';
import * as React from 'react';
import { DocumentProps } from 'react-pdf';
import { Document } from 'react-pdf/dist/esm/entry.webpack';
import { DocumentContext } from '../context/DocumentContext';
import { UiContext } from '../context/UiContext';

import { computePageSize } from '../scale';

type Props = {
  children?: React.ReactNode;
} & DocumentProps;

export const DocumentWrapper: React.FunctionComponent<Props> = ({ children, ...rest }: Props) => {
  const { setNumPages, setPageSize } = React.useContext(DocumentContext);
  const { setErrorMessage, setIsLoading } = React.useContext(UiContext);

  // TODO: #28926 Improve performance by using callbacks for load handlers
  function onPdfLoadSuccess(pdfDoc: PDFDocumentProxy): void {
    // getPage uses 1-indexed pageNumber, not 0-indexed pageIndex
    pdfDoc.getPage(1).then(page => {
      setPageSize(
        computePageSize({
          userUnit: page.userUnit,
          topLeft: { x: page.view[0], y: page.view[1] },
          bottomRight: { x: page.view[2], y: page.view[3] },
        })
      );
    });
    setIsLoading(false);
    setNumPages(pdfDoc.numPages);
    setErrorMessage(null);
  }

  // TODO: #28926 Improve performance by using callbacks for load handlers
  function onPdfLoadError(error: unknown): void {
    setIsLoading(false);
    setErrorMessage(getErrorMessage(error));
  }

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
      {...rest}
    >
      {children}
    </Document >
  );
}
