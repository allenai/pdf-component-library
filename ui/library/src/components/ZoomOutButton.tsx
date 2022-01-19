import * as React from 'react';

import { TransformContext } from '../context/TransformContext';

export type Props = {
  children?: React.ReactNode;
};

export const ZoomOutButton: React.FunctionComponent = ({ children }: Props) => {
  const { scale, setScale, zoomMultiplier } = React.useContext(TransformContext);

  const handleZoomOut = React.useCallback(() => {
    setScale(scale / zoomMultiplier);
  }, [scale, zoomMultiplier]);

  return (
    <button className="reader__zoom-btn zoom-out" onClick={handleZoomOut}>
      {children ? children : '-'}
    </button>
  );
};
