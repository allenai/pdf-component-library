import * as React from 'react';

import { Size } from '../scale';
import { logProviderWarning } from './providerUtils';

export interface IDocumentContext {
  numPages: number;
  pageSize: Size; // Scaled at 100%, might want a better name
  setNumPages: (numPages: number) => void;
  setPageSize: (pageSize: Size) => void;
}

export const DocumentContext = React.createContext<IDocumentContext>({
  numPages: 0,
  pageSize: { height: 0, width: 0 },
  setNumPages: numPages => {
    logProviderWarning(`setNumPages(${numPages})`, 'DocumentContext');
  },
  setPageSize: pageSize => {
    logProviderWarning(`setPageSize(${pageSize})`, 'DocumentContext');
  },
});
