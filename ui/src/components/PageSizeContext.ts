import { PdfPixelSize } from '../types';

import React from 'react';

export type PageSizeContextData = {
  pageSize: PdfPixelSize, // Scaled at 100%, might want a better name
  scale: number,
};

export const PageSizeContext = React.createContext<PageSizeContextData>({ pageSize: { height: 0, width: 0 }, scale: 1 });
