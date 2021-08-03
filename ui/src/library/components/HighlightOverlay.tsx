import * as React from 'react';

import { BoundingBoxProps } from './BoundingBox';
import { getStyleFromContext, PageSizeContext } from './PageSizeContext';

type Props = {
  children?: React.ReactElement<BoundingBoxProps> | Array<React.ReactElement<BoundingBoxProps>>;
  pageNumber: number;
};

export const HighlightOverlay: React.FunctionComponent<Props> = ({
  children,
  pageNumber,
}: Props) => {
  const context = React.useContext(PageSizeContext);
  const pageStyleProps = {
    top: 0,
    left: 0,
    height: context.pageSize.height,
    width: context.pageSize.width,
  };
  const pageStyle = getStyleFromContext(pageStyleProps, context);
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
      const boxStyleProps = {
        top: box.props.top,
        left: box.props.left,
        height: box.props.height,
        width: box.props.width,
      };
      const boxStyle = getStyleFromContext(boxStyleProps, context);
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
