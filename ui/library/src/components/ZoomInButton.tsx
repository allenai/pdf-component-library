import * as React from 'react';

import { ScrollContext } from '../context/ScrollContext';
import { TransformContext } from '../context/TransformContext';
import { PercentFormatter } from '../utils/format';

export type Props = {
  children?: React.ReactNode;
};

const MAX_ZOOM_IN_SCALE = 500;

export const ZoomInButton: React.FunctionComponent<Props> = ({
  children,
  ...extraProps
}: Props) => {
  const { scale, setScale, zoomMultiplier, setIsScaleChanged } = React.useContext(TransformContext);
  const { updateScrollPosition } = React.useContext(ScrollContext);

  const handleZoomIn = React.useCallback(
    (event): void => {
      event.preventDefault();
      event.stopPropagation();
      const zoomScale = Number(PercentFormatter.format(scale * zoomMultiplier).replace('%', ''));
      if (zoomScale <= MAX_ZOOM_IN_SCALE) {
        setIsScaleChanged(true);
        updateScrollPosition(1 * zoomMultiplier);
        setScale(scale * zoomMultiplier);
      }
    },
    [scale, zoomMultiplier, updateScrollPosition]
  );

  return (
    <button className="reader__zoom-btn zoom-in" onClick={handleZoomIn} {...extraProps}>
      {children ? children : '+'}
    </button>
  );
};
