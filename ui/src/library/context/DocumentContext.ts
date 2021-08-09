import * as React from 'react';

import { Size } from '../scale';

export interface IDocument {
  numPages: number,
  pageSize: Size, // Scaled at 100%, might want a better name
};

export const DocumentContext = React.createContext<IDocument>({
  numPages: 0,
  pageSize: { height: 0, width: 0 },
});
