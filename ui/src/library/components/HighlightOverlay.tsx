import * as React from 'react';

import { BoundingBoxProps } from './BoundingBox';
import { PageSizeContext } from './PageSizeContext';

type Props = {
  children?: React.ReactElement<BoundingBoxProps> | Array<React.ReactElement<BoundingBoxProps>>;
  pageNumber: number;
};

export const HighlightOverlay: React.FunctionComponent<Props> = ({
  children,
  pageNumber,
}: Props) => {
  const { pageSize, scale } = React.useContext(PageSizeContext);
  const style = {
    width: pageSize.width * scale,
    height: pageSize.height * scale,
  };

  const getUnmaskedArea = function (
    boundingBoxes:
      | React.ReactElement<BoundingBoxProps>
      | Array<React.ReactElement<BoundingBoxProps>>
  ) {
    if (!boundingBoxes) {
      return;
    }

    const boxes = Array.isArray(boundingBoxes) ? boundingBoxes : [boundingBoxes];
    return boxes.map((box, i) => {
      const boxStyle = box && {
        width: box.props.width,
        height: box.props.height,
      };
      return (
        <rect style={boxStyle} x={box.props.left} y={box.props.top} key={i} fill="black"></rect>
      );
    });
  };

  const maskId = `highlight-overlay-mask-${pageNumber}`;

  return (
    <div className="reader__page-highlight-overlay" style={style}>
      <svg className="page-mask" style={style}>
        <mask id={maskId}>
          <rect style={style} fill="white"></rect>
          {children && getUnmaskedArea(children)}
        </mask>
        <rect style={style} fill="white" opacity="0.6" mask={`url(#${maskId})`}></rect>
      </svg>
    </div>
  );
};
