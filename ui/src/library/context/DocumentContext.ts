import * as React from 'react';

import { Dimensions } from '../types';
import { logProviderWarning } from './providerUtils';

export interface IDocumentContext {
  numPages: number;
  pageDimensions: Dimensions; // Scaled at 100%
  setNumPages: (numPages: number) => void;
  setPageDimensions: (pageDimensions: Dimensions) => void;
}

export const DocumentContext = React.createContext<IDocumentContext>({
  numPages: 0,
  pageDimensions: { height: 0, width: 0 },
  setNumPages: numPages => {
    logProviderWarning(`setNumPages(${numPages})`, 'DocumentContext');
  },
  setPageDimensions: pageDimensions => {
    logProviderWarning(`setPageDimensions(${pageDimensions})`, 'DocumentContext');
  },
});
