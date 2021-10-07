import * as React from 'react';

import { DocumentContext } from '../context/DocumentContext';
import { TransformContext } from '../context/TransformContext';
import { computeBoundingBoxStyle, computePageStyle } from '../styleUtils';
import { BoundingBoxProps } from './BoundingBox';

type Props = {
  children?: React.ReactElement<BoundingBoxProps> | Array<React.ReactElement<BoundingBoxProps>>;
  pageIndex: number;
};

export const HighlightOverlay: React.FunctionComponent<Props> = ({
  children,
  pageIndex,
}: Props) => {
  const { pageSize } = React.useContext(DocumentContext);
  const { rotation, scale } = React.useContext(TransformContext);
  const pageStyle = computePageStyle(pageSize, rotation, scale);
  const maskId = `highlight-overlay-mask-${pageIndex}`;

  const getUnmaskedArea = React.useCallback((
    boundingBoxes:
      | React.ReactElement<BoundingBoxProps>
      | Array<React.ReactElement<BoundingBoxProps>>
  ) => {
    const boxes = Array.isArray(boundingBoxes) ? boundingBoxes : [boundingBoxes];
    return boxes.map((box, i) => {
      const boxStyle = computeBoundingBoxStyle(box.props, pageSize, rotation, scale);
      return <rect style={boxStyle} x={boxStyle.left} y={boxStyle.top} key={i} fill="black"></rect>;
    });
  }, [pageSize, rotation, scale]);

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
