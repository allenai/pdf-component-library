import * as React from 'react';

import { PageRotation } from '../rotate';

export interface ITransform {
    scale: number,
    rotation: PageRotation,
};

export const TransformContext = React.createContext<ITransform>({
    scale: 1,
    rotation: PageRotation.Rotate0,
});
