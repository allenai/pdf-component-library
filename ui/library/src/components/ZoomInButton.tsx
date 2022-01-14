import * as React from 'react';

import { TransformContext } from '../context/TransformContext';

export const ZoomInButton: React.FunctionComponent = () => {
  const { scale, setScale, zoomMultiplier } = React.useContext(TransformContext);

  const handleZoomIn = React.useCallback(() => {
    setScale(scale * zoomMultiplier);
  }, [scale, zoomMultiplier]);

  return (
    <a className="reader__zoom-btn zoom-in" onClick={handleZoomIn}>
      +
    </a>
  );
};
