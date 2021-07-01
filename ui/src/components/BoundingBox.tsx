import * as React from "react";
import { PageSizeContext } from "./PageSizeContext";

type Props = {
  className?: string;
  top: number;
  left: number;
  height: number;
  width: number;
  fill?: string;
  stroke?: string;
  onClick: () => void;
};

export default function BoundingBox({
  top,
  left,
  height,
  width,
  ...rest
}: Props) {
  const { scale } = React.useContext(PageSizeContext);
  return (
    <rect
      x={left * scale}
      y={top * scale}
      height={height * scale}
      width={width * scale}
      className="reader__page-overlay__bounding-box"
      {...rest}
    />
  );
}
