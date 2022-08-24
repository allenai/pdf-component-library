import * as React from 'react';

import { ScrollContext } from '../context/ScrollContext';
import { TransformContext } from '../context/TransformContext';
import { PercentFormatter } from '../utils/format';

export type Props = {
  children?: React.ReactNode;
};

const MIN_ZOOM_OUT_SCALE = 25;

export const ZoomOutButton: React.FunctionComponent = ({ children, ...extraProps }: Props) => {
  const { scale, setScale, zoomMultiplier } = React.useContext(TransformContext);
  const { updateScrollPosition } = React.useContext(ScrollContext);

  const handleZoomOut = React.useCallback(
    (event): void => {
      event.preventDefault();
      event.stopPropagation();
      const zoomScale = Number(PercentFormatter.format(scale / zoomMultiplier).replace('%', ''));
      if (zoomScale >= MIN_ZOOM_OUT_SCALE) {
        updateScrollPosition(1 / zoomMultiplier);
        setScale(scale / zoomMultiplier);
      }
    },
    [scale, zoomMultiplier, updateScrollPosition]
  );

  return (
    <button className="reader__zoom-btn zoom-out" onClick={handleZoomOut} {...extraProps}>
      {children ? children : '-'}
    </button>
  );
};
