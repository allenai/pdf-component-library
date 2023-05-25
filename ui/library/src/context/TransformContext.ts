import * as React from 'react';

import { logProviderWarning } from '../utils/provider';
import { PageRotation } from '../utils/rotate';

export const DEFAULT_ZOOM_SCALE = 1.0;
export interface ITransformContext {
  pixelRatio: number;
  rotation: PageRotation;
  scale: number;
  zoomIncrementValue: number;
  setPixelRatio: (devicePixelRatio: number) => void;
  setRotation: (rotation: PageRotation) => void;
  setScale: (scale: number) => void;
  setZoomIncrementValue: (value: number) => void;
}

export const TransformContext = React.createContext<ITransformContext>({
  pixelRatio: (typeof window !== 'undefined' ? window.devicePixelRatio : null) || 1,
  rotation: PageRotation.Rotate0,
  scale: 1,
  zoomIncrementValue: 0.2,
  setPixelRatio: pixelRatio => {
    logProviderWarning(`setPixelRatio(${pixelRatio})`, 'TransformContext');
  },
  setRotation: rotation => {
    logProviderWarning(`setRotation(${rotation})`, 'TransformContext');
  },
  setScale: scale => {
    logProviderWarning(`setScale(${scale})`, 'TransformContext');
  },
  setZoomIncrementValue: value => {
    logProviderWarning(`setZoomIncrementValue(${value})`, 'TransformContext');
  },
});

export function useTransformContextProps(): ITransformContext {
  const [pixelRatio, setPixelRatio] = React.useState<number>(
    (typeof window !== 'undefined' ? window.devicePixelRatio : null) || 1
  );
  const [rotation, setRotation] = React.useState<PageRotation>(PageRotation.Rotate0);
  const [scale, setScale] = React.useState<number>(DEFAULT_ZOOM_SCALE);
  const [zoomIncrementValue, setZoomIncrementValue] = React.useState<number>(0.2);

  return {
    pixelRatio,
    rotation,
    scale,
    setPixelRatio,
    setRotation,
    setScale,
    zoomIncrementValue,
    setZoomIncrementValue,
  };
}
