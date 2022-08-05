import * as React from 'react';

import { ScrollContext } from '../context/ScrollContext';
import { TransformContext } from '../context/TransformContext';

export type Props = {
  children?: React.ReactNode;
};

export const ZoomInButton: React.FunctionComponent<Props> = ({
  children,
  ...extraProps
}: Props) => {
  const { scale, setScale, zoomMultiplier } = React.useContext(TransformContext);
  const { updateScrollPosition } = React.useContext(ScrollContext);

  const handleZoomIn = React.useCallback(
    (event): void => {
      event.preventDefault();
      event.stopPropagation();
      updateScrollPosition(1 * zoomMultiplier);
      setScale(scale * zoomMultiplier);
    },
    [scale, zoomMultiplier, updateScrollPosition]
  );

  return (
    <button className="reader__zoom-btn zoom-in" onClick={handleZoomIn} {...extraProps}>
      {children ? children : '+'}
    </button>
  );
};
