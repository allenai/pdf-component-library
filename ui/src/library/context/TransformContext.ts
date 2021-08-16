import * as React from 'react';

import { logProviderWarning } from './providerUtils';
import { PageRotation } from '../rotate';

export interface ITransformContext {
  rotation: PageRotation;
  scale: number;
  setRotation: (rotation: PageRotation) => void;
  setScale: (scale: number) => void;
}

export const TransformContext = React.createContext<ITransformContext>({
  rotation: PageRotation.Rotate0,
  scale: 1,
<<<<<<< Updated upstream
  // TODO log this instead of returning
=======
>>>>>>> Stashed changes
  setRotation: rotation => {
    logProviderWarning(`setRotation(${rotation})`, 'TransformContext');
  },
  setScale: scale => {
    logProviderWarning(`setScale(${scale})`, 'TransformContext');
  },
});
