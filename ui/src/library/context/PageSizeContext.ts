import * as React from 'react';

import { Size } from '../scale';

export interface IPageSize {
  pageSize: Size; // Scaled at 100%, might want a better name
};

export const PageSizeContext = React.createContext<IPageSize>({
  pageSize: { height: 0, width: 0 },
});
