import * as React from 'react';

import { TransformContext } from '../context/TransformContext';

export const ZoomOutButton: React.FunctionComponent = () => {
  const { scale, setScale, zoomMultiplier } = React.useContext(TransformContext);

  const handleZoomOut = React.useCallback(() => {
    setScale(scale / zoomMultiplier);
  }, [scale, zoomMultiplier]);

  return (
    <a className="reader__zoom-btn zoom-out" onClick={handleZoomOut}>
      -
    </a>
  );
};
