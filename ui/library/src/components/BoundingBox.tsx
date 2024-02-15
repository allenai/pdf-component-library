import classNames from "classnames";
import * as React from "react";

import { DocumentContext } from "../context/DocumentContext";
import { TransformContext } from "../context/TransformContext";
import { computeBoundingBoxStyle } from "../utils/style";
import { BoundingBox as BoundingBoxType } from "./types/boundingBox";

export type Props = {
  className?: string;
  underlineClassName?: string;
  id?: string;
  isHighlighted?: boolean;
  onClick?: () => void;
  voiceOverLabel?: string;
} & BoundingBoxType;

export const BoundingBox: React.FunctionComponent<Props> = ({
  top,
  left,
  height,
  width,
  className,
  underlineClassName,
  id,
  isHighlighted,
  onClick,
  voiceOverLabel,
  ...extraProps
}: Props) => {
  const { pageDimensions } = React.useContext(DocumentContext);
  const { rotation, scale } = React.useContext(TransformContext);
  const boxSize = { top, left, height, width };
  const componentClassName = classNames(
    "pdf-reader__overlay-bounding-box",
    isHighlighted === true
      ? "pdf-reader__overlay-bounding-box-highlighted"
      : "",
    className
  );

  const getBoundingBoxStyle = React.useCallback(() => {
    return computeBoundingBoxStyle(boxSize, pageDimensions, rotation, scale);
  }, [pageDimensions, rotation, scale]);

  const rotationClassName = React.useCallback(() => {
    return `rotate${rotation}`;
  }, [rotation]);

  return (
    <React.Fragment>
      <div
        className={`pdf-reader__overlay-bounding-box-underline ${
          underlineClassName || rotationClassName()
        }`}
        style={getBoundingBoxStyle()}
      />
      <div
        id={id}
        className={`${componentClassName} ${rotationClassName()}`}
        style={getBoundingBoxStyle()}
        onClick={onClick}
        role="button"
        tabIndex={0}
        aria-label={voiceOverLabel}
        {...extraProps}
      />
    </React.Fragment>
  );
};
