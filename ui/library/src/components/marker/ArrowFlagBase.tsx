import classnames from 'classnames';
import * as React from 'react';

import { DocumentContext } from '../../context/DocumentContext';
import { TransformContext } from '../../context/TransformContext';
import { computeBoundingBoxStyle } from '../../utils/style';
import { IconFlag } from '../icon/IconFlag';
import { Size } from '../types/boundingBox';

export const POSITION = {
  LEFT: 'LEFT',
  RIGHT: 'RIGHT',
} as const;

export type PositionType = typeof POSITION[keyof typeof POSITION];

type Props = {
  className?: string;
  flagWidth?: number; // in px
  label?: string;
  originTop?: number; // in px
  position?: PositionType;
  tailLength?: number; // in px
  tailWidgth?: number; // in px
};

const DEFAULT_ORIGIN_TOP_PX = 0;
const DEFAULT_FLAG_WIDTH_PX = 62;
const DEFAULT_FLAG_HEIGHT_PX = 20;
const DEFAULT_TAIL_LENGTH_PX = 40;
const DEFAULT_TAIL_WIDTH_PX = 7;

export const ArrowFlagBase: React.FunctionComponent<Props> = ({
  className,
  label,
  flagWidth,
  originTop,
  position = POSITION.LEFT,
  tailLength,
  tailWidgth,
  ...extraProps
}: Props) => {
  const { pageDimensions } = React.useContext(DocumentContext);
  const { rotation, scale } = React.useContext(TransformContext);
  // function for scaling bounding boxes based on current document states
  const computeSize = React.useCallback(
    (box: Size): Size => computeBoundingBoxStyle(box, pageDimensions, rotation, scale),
    [pageDimensions, rotation, scale, originTop]
  );

  // bounding box of the flag
  const flagSize = {
    top: originTop || DEFAULT_ORIGIN_TOP_PX,
    left: 0,
    height: DEFAULT_FLAG_HEIGHT_PX,
    width: flagWidth || DEFAULT_FLAG_WIDTH_PX,
  };
  // bounding box of the tail
  const tailSize = {
    top: originTop || DEFAULT_ORIGIN_TOP_PX,
    left: 0,
    height: tailLength || DEFAULT_TAIL_LENGTH_PX,
    width: tailWidgth || DEFAULT_TAIL_WIDTH_PX,
  };

  const computedFlagSize = computeSize(flagSize);
  const computedTailSize = computeSize(tailSize);

  const tailPosition = {
    top: computedTailSize.top,
    left: position === POSITION.LEFT ? -computedTailSize.width : pageDimensions.width * scale,
    height: computedTailSize.height,
    width: computedTailSize.width,
  };

  const renderFlag = () => {
    const { top, width, height } = computedFlagSize;
    const flagPosition = {
      top,
      height,
      width,
      left:
        position === POSITION.LEFT
          ? -computedTailSize.width
          : tailPosition.left + tailPosition.width - width + 1,
    };
    const labelPosition = position === POSITION.LEFT ? '47%' : '53%';

    return (
      <div className="pdf-reader__arrow-flag-base__flag" style={flagPosition}>
        <IconFlag className="pdf-reader__arrow-flag-base__flag-icon" headerPosition={position}>
          <text
            x={labelPosition}
            y="54%"
            dominantBaseline="middle"
            textAnchor="middle"
            className="pdf-reader__arrow-flag-base__flag-label">
            {label}
          </text>
        </IconFlag>
      </div>
    );
  };

  return (
    <div className={classnames('pdf-reader__arrow-flag-base', className)} {...extraProps}>
      <div className="pdf-reader__arrow-flag-base__tail" style={tailPosition} />
      {label && renderFlag()}
    </div>
  );
};
