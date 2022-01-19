import { PDFDocumentProxy } from 'pdfjs-dist/types/display/api';
import * as React from 'react';

import { Dimensions } from '../components/types/types';
import { logProviderWarning } from '../utils/provider';

export interface IDocumentContext {
  numPages: number;
  pageDimensions: Dimensions; // Scaled at 100%
  pdfDocProxy?: PDFDocumentProxy;
  setNumPages: (numPages: number) => void;
  setPageDimensions: (pageDimensions: Dimensions) => void;
  setPdfDocProxy: (pdfDocProxy: PDFDocumentProxy) => void;
}

export const DocumentContext = React.createContext<IDocumentContext>({
  numPages: 0,
  pageDimensions: { height: 0, width: 0 },
  pdfDocProxy: undefined,
  setNumPages: numPages => {
    logProviderWarning(`setNumPages(${numPages})`, 'DocumentContext');
  },
  setPageDimensions: pageDimensions => {
    logProviderWarning(`setPageDimensions(${pageDimensions})`, 'DocumentContext');
  },
  setPdfDocProxy: pdfDocProxy => {
    logProviderWarning(`setPdfDocProxy(${pdfDocProxy})`, 'DocumentContext');
  },
});
