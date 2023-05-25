import { ITransformContext } from '../../src/context/TransformContext';
import { PageRotation } from '../../src/utils/rotate';

export const mockTransformContext: ITransformContext = {
  pixelRatio: 1,
  rotation: PageRotation.Rotate0,
  scale: 1.0,
  zoomIncrementValue: 0.2,
  setPixelRatio: (pixelRatio: number) => {
    return pixelRatio;
  },
  setRotation: (rotation: PageRotation) => {
    return rotation;
  },
  setScale: (scale: number) => {
    return scale;
  },
  setZoomIncrementValue: (value: number) => {
    return value;
  },
};
