import * as React from 'react';

import { Size } from '../scale';

export type PageSizeContextData = {
  pageSize: Size; // Scaled at 100%, might want a better name
};

export const PageSizeContext = React.createContext<PageSizeContextData>({
  pageSize: { height: 0, width: 0 },
});
