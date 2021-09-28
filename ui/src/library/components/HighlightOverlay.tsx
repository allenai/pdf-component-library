import * as React from 'react';

import { DocumentContext } from '../context/DocumentContext';
import { TransformContext } from '../context/TransformContext';
import { BoundingBoxProps, computeStyleWithContext } from './BoundingBox';

type Props = {
  children?: React.ReactElement<BoundingBoxProps> | Array<React.ReactElement<BoundingBoxProps>>;
  pageIndex: number;
};

export const HighlightOverlay: React.FunctionComponent<Props> = ({
  children,
  pageIndex,
}: Props) => {
  const documentContext = React.useContext(DocumentContext);
  const transformContext = React.useContext(TransformContext);
  const pageStyle = computeStyleWithContext(
    0,
    0,
    documentContext.pageSize.height,
    documentContext.pageSize.width,
    documentContext,
    transformContext
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
        documentContext,
        transformContext
      );
      return <rect style={boxStyle} x={boxStyle.left} y={boxStyle.top} key={i} fill="black"></rect>;
    });
  };

  const maskId = `highlight-overlay-mask-${pageIndex}`;

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
