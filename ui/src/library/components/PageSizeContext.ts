import * as React from 'react';

import { PageRotation } from '../rotate';
import { PdfPixelSize } from '../scale';
import { logProviderWarning } from './errorUtils';

export type PageSizeContextData = {
  pageSize: PdfPixelSize; // Scaled at 100%, might want a better name
  rotation: PageRotation;
  scale: number;
  setPageSize: (pageSize: PdfPixelSize) => void;
  setRotation: (rotation: PageRotation) => void;
  setScale: (scale: number) => void;
};

export const PageSizeContext = React.createContext<PageSizeContextData>({
  pageSize: { height: 0, width: 0 },
  rotation: PageRotation.Rotate0,
  scale: 1,
  setPageSize: pageSize => {
    logProviderWarning(`setPageSize(${pageSize})`, 'PageSizeContext');
  },
  setRotation: rotation => {
    logProviderWarning(`setRotation(${rotation})`, 'PageSizeContext');
  },
  setScale: scale => {
    logProviderWarning(`setScale(${scale})`, 'PageSizeContext');
  },
});

export type StyleSizeProps = {
  top: number;
  left: number;
  height: number;
  width: number;
};

export function getStyleFromContext(sizeProps: StyleSizeProps, context: PageSizeContextData): StyleSizeProps {
  const { top, left, height, width } = sizeProps;
  const { rotation, scale, pageSize } = context;
  switch (rotation) {
    case PageRotation.Rotate90:
      return {
        top: left * scale,
        left: (pageSize.height - height - top) * scale,
        height: width * scale,
        width: height * scale,
      };
    case PageRotation.Rotate180:
      return {
        top: (pageSize.height - height - top) * scale,
        left: (pageSize.width - width - left) * scale,
        height: height * scale,
        width: width * scale,
      };
    case PageRotation.Rotate270:
      return {
        top: (pageSize.width - width - left) * scale,
        left: top * scale,
        height: width * scale,
        width: height * scale,
      };
    default:
      return {
        top: top * scale,
        left: left * scale,
        height: height * scale,
        width: width * scale,
      };
  }
}
