import * as React from 'react';

import { logProviderWarning } from '../utils/provider';
import { PageRotation } from '../utils/rotate';

export interface ITransformContext {
  rotation: PageRotation;
  scale: number;
  zoomMultiplier: number;
  isScaleChanged: boolean;
  setRotation: (rotation: PageRotation) => void;
  setScale: (scale: number) => void;
  setZoomMultiplier: (zoom: number) => void;
  setIsScaleChanged: (isScaleChange: boolean) => void;
}

export const TransformContext = React.createContext<ITransformContext>({
  rotation: PageRotation.Rotate0,
  scale: 1,
  zoomMultiplier: 1.2,
  isScaleChanged: false,
  setRotation: rotation => {
    logProviderWarning(`setRotation(${rotation})`, 'TransformContext');
  },
  setScale: scale => {
    logProviderWarning(`setScale(${scale})`, 'TransformContext');
  },
  setZoomMultiplier: zoom => {
    logProviderWarning(`setZoomMultiplier(${zoom})`, 'TransformContext');
  },
  setIsScaleChanged: isScaleChange => {
    logProviderWarning(`setIsScaleChanged(${isScaleChange})`, 'TransformContext');
  },
});

export function useTransformContextProps(): ITransformContext {
  const [rotation, setRotation] = React.useState<PageRotation>(PageRotation.Rotate0);
  const [scale, setScale] = React.useState<number>(1.0);
  const [zoomMultiplier, setZoomMultiplier] = React.useState<number>(1.2);
  const [isScaleChanged, setIsScaleChanged] = React.useState<boolean>(false);

  return {
    rotation,
    scale,
    isScaleChanged,
    setRotation,
    setScale,
    setZoomMultiplier,
    setIsScaleChanged,
    zoomMultiplier,
  };
}
