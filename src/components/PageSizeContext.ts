import * as React from 'react';

import { PageRotation } from '../rotate';
import { PdfPixelSize } from '../scale';

export type PageSizeContextData = {
  pageSize: PdfPixelSize; // Scaled at 100%, might want a better name
  scale: number;
  rotation: PageRotation;
};

export const PageSizeContext = React.createContext<PageSizeContextData>({
  pageSize: { height: 0, width: 0 },
  scale: 1,
  rotation: PageRotation.Rotate0,
});
