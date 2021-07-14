import * as React from 'react';

import { PageRotation } from '../rotate';
import { PageSizeContext, PageSizeContextData } from './PageSizeContext';

type Props = {
  className?: string;
  /**
   * top, left, height, and width are in screen pixel units
   * at 100% scaling of the page
   */
  top: number;
  left: number;
  height: number;
  width: number;
  onClick?: () => void;
};

export const BoundingBox: React.FunctionComponent<Props> = ({
  className,
  top,
  left,
  height,
  width,
  onClick,
}: Props) => {
  const context = React.useContext(PageSizeContext);
  const componentClassName = ['reader__page-overlay__bounding-box', className]
    .filter(Boolean)
    .join(' ');
  return (
    <div
      className={componentClassName}
      style={computeStyleWithContext(top, left, height, width, context)}
      onClick={onClick}
    />
  );
};

type StyleSizeProps = {
  top: number;
  left: number;
  height: number;
  width: number;
};

/**
 * Computes the style for the bounding box given the current page scaling and rotation context
 * TODO: top, left, height, and width can probably be collapsed into a BoundingBox type for storing
 *       size/placement info about boxes on the page.
 * @param top top value for the boundingbox
 * @param left left value for the boundingbox
 * @param height height value for the boundingbox
 * @param width width value for the boundingbox
 * @param context PageSizeContext from the context provider
 * @returns
 */
function computeStyleWithContext(
  top: number,
  left: number,
  height: number,
  width: number,
  context: PageSizeContextData
): StyleSizeProps {
  const { rotation, scale, pageSize } = context;
  switch (rotation) {
    case PageRotation.Rotate90:
      return {
        top: left * scale,
        left: (pageSize.height - height - top) * scale,
        height: width * scale,
        width: height * scale,
      };
    case PageRotation.Rotate180:
      return {
        top: (pageSize.height - height - top) * scale,
        left: (pageSize.width - width - left) * scale,
        height: height * scale,
        width: width * scale,
      };
    case PageRotation.Rotate270:
      return {
        top: (pageSize.width - width - left) * scale,
        left: top * scale,
        height: width * scale,
        width: height * scale,
      };
    default:
      return {
        top: top * scale,
        left: left * scale,
        height: height * scale,
        width: width * scale,
      };
  }
}
