import { BoundingBoxType as BoundingBox } from 'pdf-components-dist';

// Raw BoundingBoxes top, left, height, and width attributes are expressed as a ratio of the
// page height/width and need to be scaled according to page size before they can be rendered
export type BoundingBoxRaw = BoundingBox;

// Calculate a bounding box's pixel coordinates from the raw bounding box's coorditate ratios scaled to the page size
export function scaleRawBoundingBox(
  boundingBoxRaw: BoundingBoxRaw,
  pageHeight: number,
  pageWidth: number
): BoundingBox {
  const boxScaled: BoundingBox = {
    page: boundingBoxRaw.page,
    top: boundingBoxRaw.top * pageHeight,
    left: boundingBoxRaw.left * pageWidth,
    height: boundingBoxRaw.height * pageHeight,
    width: boundingBoxRaw.width * pageWidth,
  };

  return boxScaled;
}
