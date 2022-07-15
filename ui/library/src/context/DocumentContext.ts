import * as React from 'react';
import { pdfjs } from 'react-pdf';

import { Dimensions } from '../components/types/boundingBox';
import { OutlineNode } from '../components/types/outline';
import { Nullable } from '../components/types/utils';
import { logProviderWarning } from '../utils/provider';

export interface IDocumentContext {
  numPages: number;
  outline: Nullable<Array<OutlineNode>>;
  pageDimensions: Dimensions; // Scaled at 100%
  pdfDocProxy?: pdfjs.PDFDocumentProxy;
  setNumPages: (numPages: number) => void;
  setOutline: (outline: Nullable<Array<OutlineNode>>) => void;
  setPageDimensions: (pageDimensions: Dimensions) => void;
  setPdfDocProxy: (pdfDocProxy: pdfjs.PDFDocumentProxy) => void;
}

export const DocumentContext = React.createContext<IDocumentContext>({
  numPages: 0,
  outline: [],
  pageDimensions: { height: 0, width: 0 },
  pdfDocProxy: undefined,
  setNumPages: numPages => {
    logProviderWarning(`setNumPages(${numPages})`, 'DocumentContext');
  },
  setOutline: outline => {
    logProviderWarning(`setOutline(${outline})`, 'DocumentContext');
  },
  setPageDimensions: pageDimensions => {
    logProviderWarning(`setPageDimensions(${pageDimensions})`, 'DocumentContext');
  },
  setPdfDocProxy: pdfDocProxy => {
    logProviderWarning(`setPdfDocProxy(${pdfDocProxy})`, 'DocumentContext');
  },
});

export function useDocumentContextProps(): IDocumentContext {
  const [numPages, setNumPages] = React.useState<number>(0);
  const [outline, setOutline] = React.useState<Nullable<Array<OutlineNode>>>(null);
  const [pageDimensions, setPageDimensions] = React.useState<Dimensions>({ height: 0, width: 0 });
  const [pdfDocProxy, setPdfDocProxy] = React.useState<pdfjs.PDFDocumentProxy>();

  return {
    numPages,
    outline,
    pageDimensions: pageDimensions,
    pdfDocProxy,
    setNumPages,
    setOutline,
    setPageDimensions: setPageDimensions,
    setPdfDocProxy,
  };
}
