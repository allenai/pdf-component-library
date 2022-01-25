// Height and width are in screen pixel units at 100% scaling of the page
export type Dimensions = {
  height: number;
  width: number;
};

// Top and left are in screen pixel units at 100% scaling of the page
export type Origin = {
  top: number;
  left: number;
};

export type Size = Dimensions & Origin;

export type BoundingBox = {
  page: number;
} & Size;

// Raw BoundingBoxes top, left, height, and width attributes are expressed as a ratio of the
// page height/width and need to be scaled according to page size before they can be rendered
export type RawBoundingBox = BoundingBox;

// Calculate a bounding box's pixel coordinates from the raw bounding box's coorditate ratios scaled to the page size
export function scaleRawBoundingBox(
  boundingBoxRaw: RawBoundingBox,
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
