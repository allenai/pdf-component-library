import { BoundingBox } from '../library/types';

// Raw BoundingBoxes top, left, height, and width attributes are expressed as a ratio of the
// page height/width and need to be scaled according to page size before they can be rendered
export type BoundingBoxRaw = BoundingBox;

// The entity types we support- currently only citation
export enum ENTITY_TYPE {
  CITATION = 'citation',
}

// Raw entity attributes in the same format as our data source.
// Every entity type has bounding_boxes and the generic key allows for
// attributes that differ between entity types.
export type EntityAttributesRaw = {
  bounding_boxes: Array<BoundingBoxRaw>;
  /* eslint-disable @typescript-eslint/no-explicit-any */
  [key: string]: any;
};

// Generic raw entity in the same format that is returned by our data source
export type EntityRaw = {
  id: string;
  type: ENTITY_TYPE;
  attributes: EntityAttributesRaw;
};

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
