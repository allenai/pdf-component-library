import * as React from 'react';

import { logProviderWarning } from '../utils/provider';
import { PageRotation } from '../utils/rotate';

export interface ITransformContext {
  pixelRatio: number;
  rotation: PageRotation;
  scale: number;
  zoomMultiplier: number;
  setPixelRatio: (devicePixelRatio: number) => void;
  setRotation: (rotation: PageRotation) => void;
  setScale: (scale: number) => void;
  setZoomMultiplier: (zoom: number) => void;
}

export const TransformContext = React.createContext<ITransformContext>({
  pixelRatio: window.devicePixelRatio || 1,
  rotation: PageRotation.Rotate0,
  scale: 1,
  zoomMultiplier: 1.2,
  setPixelRatio: pixelRatio => {
    logProviderWarning(`setPixelRatio(${pixelRatio})`, 'TransformContext');
  },
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

export function useTransformContextProps(): ITransformContext {
  const [pixelRatio, setPixelRatio] = React.useState<number>(window.devicePixelRatio || 1);
  const [rotation, setRotation] = React.useState<PageRotation>(PageRotation.Rotate0);
  const [scale, setScale] = React.useState<number>(1.0);
  const [zoomMultiplier, setZoomMultiplier] = React.useState<number>(1.2);

  return {
    pixelRatio,
    rotation,
    scale,
    setPixelRatio,
    setRotation,
    setScale,
    setZoomMultiplier,
    zoomMultiplier,
  };
}
