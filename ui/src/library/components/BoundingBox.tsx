import classNames from 'classnames';
import * as React from 'react';

import { DocumentContext, IDocumentContext } from '../context/DocumentContext';
import { ITransformContext, TransformContext } from '../context/TransformContext';
import { PageRotation } from '../rotate';

type Props = {
  className?: string;
  id?: string;
  isHighlighted?: boolean;
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

export type BoundingBoxProps = Props;

export const BoundingBox: React.FunctionComponent<Props> = ({
  className,
  id,
  isHighlighted,
  top,
  left,
  height,
  width,
  onClick,
}: Props) => {
  const documentContext = React.useContext(DocumentContext);
  const transformContext = React.useContext(TransformContext);
  const componentClassName = classNames(
    'reader__page-overlay__bounding-box',
    isHighlighted === true ? 'reader__page-overlay__bounding-box-highlighted' : '',
    className
  );
  return (
    <div
      id={id}
      className={componentClassName}
      style={computeStyleWithContext(top, left, height, width, documentContext, transformContext)}
      onClick={onClick}
    />
  );
};

export type StyleSizeProps = {
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
 * @param documentContext documentContext from the context provider
 * @returns style object for the BoundingBox div
 */
export function computeStyleWithContext(
  top: number,
  left: number,
  height: number,
  width: number,
  documentContext: IDocumentContext,
  transformContext: ITransformContext
): StyleSizeProps {
  const { pageSize } = documentContext;
  const { rotation, scale } = transformContext;
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
