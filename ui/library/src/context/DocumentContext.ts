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
  scrollTarget?: HTMLDivElement;
  setNumPages: (numPages: number) => void;
  setOutline: (outline: Nullable<Array<OutlineNode>>) => void;
  setPageDimensions: (pageDimensions: Dimensions) => void;
  setPdfDocProxy: (pdfDocProxy: pdfjs.PDFDocumentProxy) => void;
  setScrollTarget: (scrollTarget: HTMLDivElement) => void;
}

export const DocumentContext = React.createContext<IDocumentContext>({
  numPages: 0,
  outline: [],
  pageDimensions: { height: 0, width: 0 },
  pdfDocProxy: undefined,
  scrollTarget: undefined,
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
  setScrollTarget: scrollTarget => {
    logProviderWarning(`setScrollTarget(${scrollTarget})`, 'DocumentContext');
  },
});
