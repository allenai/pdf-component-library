import { Dimensions, Size } from '../components/types/boundingBox';
import { isSideways, PageRotation } from './rotate';

// Computes the style for a bounding box, accounting for page roation and page scaling/zoom
export function computeBoundingBoxStyle(
  boundingBoxSize: Size,
  pageDimensions: Dimensions,
  rotation: PageRotation,
  scale: number
): Size {
  const { top, left, height, width } = boundingBoxSize;

  switch (rotation) {
    case PageRotation.Rotate90:
      return {
        top: left * scale,
        left: (pageDimensions.height - height - top) * scale,
        height: width * scale,
        width: height * scale,
      };
    case PageRotation.Rotate180:
      return {
        top: (pageDimensions.height - height - top) * scale,
        left: (pageDimensions.width - width - left) * scale,
        height: height * scale,
        width: width * scale,
      };
    case PageRotation.Rotate270:
      return {
        top: (pageDimensions.width - width - left) * scale,
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

// Compute the style for a page, accounting for page rotation and page scaling/zoom
export function computePageStyle(
  pageDimensions: Dimensions,
  rotation: PageRotation,
  scale: number
): Size {
  return {
    height: getPageHeight(pageDimensions, rotation) * scale,
    width: getPageWidth(pageDimensions, rotation) * scale,
    left: 0,
    top: 0,
  };
}

// Get page height accounting for page rotation- if the page is rotated on its side, its width becomes its height
export function getPageHeight(pageDimensions: Dimensions, rotation: PageRotation): number {
  return isSideways(rotation) ? pageDimensions.width : pageDimensions.height;
}

// Get page width accounting for page rotation- if the page is rotated on its side, its height becomes its width
export function getPageWidth(pageDimensions: Dimensions, rotation: PageRotation): number {
  return isSideways(rotation) ? pageDimensions.height : pageDimensions.width;
}
