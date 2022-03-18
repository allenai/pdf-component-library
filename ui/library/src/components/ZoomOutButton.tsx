import * as React from 'react';

import { TransformContext } from '../context/TransformContext';

export type Props = {
  children?: React.ReactNode;
};

export const ZoomOutButton: React.FunctionComponent = ({ children, ...extraProps }: Props) => {
  const { scale, setScale, zoomMultiplier } = React.useContext(TransformContext);

  const handleZoomOut = React.useCallback(
    (event): void => {
      event.preventDefault();
      event.stopPropagation();
      setScale(scale / zoomMultiplier);
    },
    [scale, zoomMultiplier]
  );

  return (
    <button className="reader__zoom-btn zoom-out" onClick={handleZoomOut} {...extraProps}>
      {children ? children : '-'}
    </button>
  );
};
