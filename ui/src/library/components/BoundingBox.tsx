import classNames from 'classnames';
import * as React from 'react';

import { DocumentContext, IDocumentContext } from '../context/DocumentContext';
import { ITransformContext, TransformContext } from '../context/TransformContext';
import { PageRotation } from '../rotate';
import { BoundingBox as BoundingBoxType, Size } from '../types';

type Props = {
  className?: string;
  id?: string;
  isHighlighted?: boolean;
  onClick?: () => void;
} & BoundingBoxType;

export type BoundingBoxProps = Props;

export const BoundingBox: React.FunctionComponent<Props> = ({
  top,
  left,
  height,
  width,
  className,
  id,
  isHighlighted,
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
): Size {
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

// Raw bounding box size attributes are designated as a percentage of total page height/width.
// Bounding boxes need to be scaled relative to the current page size before they can be rendered.
export function scaleRawBoundingBoxWithContext(
  box: BoundingBoxType,
  documentContext: IDocumentContext,
  transformContext: ITransformContext
): BoundingBoxType {
  const { pageSize } = documentContext;
  const scaledToPageSize = {
    top: box.top * pageSize.height,
    left: box.left * pageSize.width,
    height: box.height * pageSize.height,
    width: box.width * pageSize.width,
  };

  const transformedSize = computeStyleWithContext(
    scaledToPageSize.top,
    scaledToPageSize.left,
    scaledToPageSize.height,
    scaledToPageSize.width,
    documentContext,
    transformContext
  );
  return {
    page: box.page,
    ...transformedSize,
  };
}
