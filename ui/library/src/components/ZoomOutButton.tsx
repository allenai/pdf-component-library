import * as React from 'react';

import { TransformContext } from '../context/TransformContext';
import { ScrollContext } from '../context/ScrollContext';

export type Props = {
  children?: React.ReactNode;
};

export const ZoomOutButton: React.FunctionComponent = ({ children, ...extraProps }: Props) => {
  const { scale, setScale, zoomMultiplier } = React.useContext(TransformContext);
  const { recalibrateScrollPosition } = React.useContext(ScrollContext);

  const handleZoomOut = React.useCallback(
    (event): void => {
      event.preventDefault();
      event.stopPropagation();
      recalibrateScrollPosition(1 / zoomMultiplier);
      setScale(scale / zoomMultiplier);
    },
    [scale, zoomMultiplier, recalibrateScrollPosition]
  );

  return (
    <button className="reader__zoom-btn zoom-out" onClick={handleZoomOut} {...extraProps}>
      {children ? children : '-'}
    </button>
  );
};
