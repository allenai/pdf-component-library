import * as React from 'react';

import { BoundingBoxProps, computeStyleWithContext } from './BoundingBox';
import { PageSizeContext } from '../context/PageSizeContext';
import { TransformContext } from '../context/TransformContext';

type Props = {
  children?: React.ReactElement<BoundingBoxProps> | Array<React.ReactElement<BoundingBoxProps>>;
  pageNumber: number;
};

export const HighlightOverlay: React.FunctionComponent<Props> = ({
  children,
  pageNumber,
}: Props) => {
  const pageSizeContext = React.useContext(PageSizeContext);
  const transformContext = React.useContext(TransformContext);
  const pageStyle = computeStyleWithContext(
    0,
    0,
    pageSizeContext.pageSize.height,
    pageSizeContext.pageSize.width,
    pageSizeContext,
    transformContext,
  );

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
      const boxStyle = computeStyleWithContext(
        box.props.top,
        box.props.left,
        box.props.height,
        box.props.width,
        pageSizeContext,
        transformContext,
      );
      return <rect style={boxStyle} x={boxStyle.left} y={boxStyle.top} key={i} fill="black"></rect>;
    });
  };

  const maskId = `highlight-overlay-mask-${pageNumber}`;

  return (
    <div className="reader__page-highlight-overlay" style={pageStyle}>
      <svg className="page-mask" style={pageStyle}>
        <mask id={maskId}>
          <rect style={pageStyle} fill="white"></rect>
          {children && getUnmaskedArea(children)}
        </mask>
        <rect style={pageStyle} fill="white" opacity="0.6" mask={`url(#${maskId})`}></rect>
      </svg>
    </div>
  );
};
