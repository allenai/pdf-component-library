import * as React from 'react';

import { logProviderWarning } from '../utils/provider';
import { PageRotation } from '../utils/rotate';

export interface ITransformContext {
  rotation: PageRotation;
  scale: number;
  zoomMultiplier: number;
  setRotation: (rotation: PageRotation) => void;
  setScale: (scale: number) => void;
  setZoomMultiplier: (zoom: number) => void;
}

export const TransformContext = React.createContext<ITransformContext>({
  rotation: PageRotation.Rotate0,
  scale: 1,
  zoomMultiplier: 1.2,
  setRotation: rotation => {
    logProviderWarning(`setRotation(${rotation})`, 'TransformContext');
  },
  setScale: scale => {
    logProviderWarning(`setScale(${scale})`, 'TransformContext');
  },
  setZoomMultiplier: zoom => {
    logProviderWarning(`setZoomMultiplier(${zoom})`, 'TransformContext');
  },
});
