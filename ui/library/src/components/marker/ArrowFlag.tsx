import classnames from "classnames";
import * as React from "react";

import { DocumentContext } from "../../context/DocumentContext";
import {
  BoundingBox as BoundingBoxType,
  scaleRawBoundingBox,
} from "../types/boundingBox";
import { ArrowFlagBase, POSITION, PositionType } from "./ArrowFlagBase";

type Props = {
  boundingBoxes: Array<BoundingBoxType>; // all bounding boxes are expected to be on the same page
  className?: string;
  label?: string;
};

const CENTER_LINE = 0.5;
const LINE_HEIGHT_MULTIPLIER = 1.5;

export const ArrowFlag: React.FunctionComponent<Props> = ({
  boundingBoxes,
  className,
  label,
  ...extraProps
}: Props) => {
  const { pageDimensions } = React.useContext(DocumentContext);
  const convertRatioToPx = React.useCallback(
    (rawBoundingBox: BoundingBoxType): BoundingBoxType =>
      scaleRawBoundingBox(
        rawBoundingBox,
        pageDimensions.height,
        pageDimensions.width
      ),
    [pageDimensions]
  );

  if (boundingBoxes.length == 0) return null;

  // If any bounding boxes span over the center line, we know that either the paper is
  // single-column or a mix of single-column and two-column. In such case, bounding
  // boxes will not be divided so as to guarantee only 1 flag is rendered on the left side.
  const hasWideBox = boundingBoxes.some(
    ({ left, width }) => left < CENTER_LINE && left + width >= CENTER_LINE
  );

  let leftBoundingBoxes = boundingBoxes,
    rightBoundingBoxes: BoundingBoxType[] = [];
  if (!hasWideBox) {
    leftBoundingBoxes = boundingBoxes.filter(({ left }) => left < CENTER_LINE);
    rightBoundingBoxes = boundingBoxes.filter(
      ({ left }) => left >= CENTER_LINE
    );
  }

  // To handle a special case where the previous bounding box is on the right while
  // the later is on the left. In such case, there are only 2 bounding boxes.
  // The vertical distance between the two boxes is used to differentiate whether this case
  // happens on a single-column paper or a two-column paper. If it's the previous, then
  // the whole flag should appear on the left. Both bounding boxes will be categorized
  // as leftBoundingBoxes. Otherwise, the tail wrapping still applies.
  if (leftBoundingBoxes.length === 1 && rightBoundingBoxes.length === 1) {
    // If the vertical difference between the two boxes is smaller then 1.5 times line height,
    // the paper is categorized as single-column. Both bounding boxes are set to leftBoundingBoxes.
    // ArrowFlag will appear on the left
    if (
      Math.abs(rightBoundingBoxes[0].top - leftBoundingBoxes[0].top) <
      LINE_HEIGHT_MULTIPLIER * rightBoundingBoxes[0].height
    ) {
      leftBoundingBoxes = boundingBoxes;
      rightBoundingBoxes = [];
    }
  }

  // Sort bounding boxes by their top positions
  leftBoundingBoxes.sort((first, second) => first.top - second.top);
  rightBoundingBoxes.sort((first, second) => first.top - second.top);

  const renderArrowFlagBase = (
    boxes: BoundingBoxType[],
    position: PositionType,
    showLabel: boolean
  ) => {
    if (boxes.length == 0) return null;

    const firstBox = convertRatioToPx(boxes[0]),
      lastBox = convertRatioToPx(boxes[boxes.length - 1]);
    const props = {
      label: showLabel ? label : undefined,
      tailLength: lastBox.top + lastBox.height - firstBox.top,
      originTop: firstBox.top,
      position,
    };

    return <ArrowFlagBase {...props} />;
  };

  const hasLeftFlag = leftBoundingBoxes.length > 0;

  return (
    <div
      className={classnames("pdf-reader__arrow-flag", className)}
      {...extraProps}
    >
      {renderArrowFlagBase(leftBoundingBoxes, POSITION.LEFT, hasLeftFlag)}
      {renderArrowFlagBase(rightBoundingBoxes, POSITION.RIGHT, !hasLeftFlag)}
    </div>
  );
};
