import * as React from "react";

import { TransformContext } from "../context/TransformContext";
import { PercentFormatter } from "../utils/format";

export type Props = {
  className?: string;
  children?: React.ReactNode;
  onZoom?: (scale: number) => void;
};

const MIN_ZOOM_OUT_SCALE = 20;

export const ZoomOutButton: React.FunctionComponent = ({
  className,
  children,
  onZoom,
  ...extraProps
}: Props) => {
  const { scale, setScale, zoomIncrementValue } =
    React.useContext(TransformContext);

  const handleZoomOut = React.useCallback(
    (event): void => {
      event.preventDefault();
      event.stopPropagation();
      const newScaleValue = scale - zoomIncrementValue;
      const zoomScale = Number(
        PercentFormatter.format(newScaleValue).replace("%", "")
      );

      if (zoomScale >= MIN_ZOOM_OUT_SCALE) {
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
      className={`reader__zoom-btn zoom-out ${className}`}
      onClick={handleZoomOut}
      {...extraProps}
    >
      {children ? children : "-"}
    </button>
  );
};
