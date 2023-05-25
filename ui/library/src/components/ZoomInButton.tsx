import * as React from 'react';

import { TransformContext } from '../context/TransformContext';
import { PercentFormatter } from '../utils/format';

export type Props = {
  className?: string;
  children?: React.ReactNode;
  onZoom?: (scale: number) => void;
};

const MAX_ZOOM_IN_SCALE = 500;

export const ZoomInButton: React.FunctionComponent<Props> = ({
  className,
  children,
  onZoom,
  ...extraProps
}: Props) => {
  const { scale, setScale, zoomIncrementValue } = React.useContext(TransformContext);

  const handleZoomIn = React.useCallback(
    (event): void => {
      event.preventDefault();
      event.stopPropagation();
      const newScaleValue = scale + zoomIncrementValue;
      const zoomScale = Number(PercentFormatter.format(newScaleValue).replace('%', ''));

      if (zoomScale <= MAX_ZOOM_IN_SCALE) {
        if (onZoom) {
          onZoom(newScaleValue);
        }

        setScale(newScaleValue);
      }
    },
    [scale]
  );

  return (
    <button
      className={`reader__zoom-btn zoom-in ${className}`}
      onClick={handleZoomIn}
      {...extraProps}>
      {children ? children : '+'}
    </button>
  );
};
