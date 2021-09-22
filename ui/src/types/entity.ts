import { BoundingBox } from '../library/types';

export enum ENTITY_TYPE {
  CITATION = 'citation',
}

export class EntityAttributes {
  bounding_boxes: Array<BoundingBox>;
  [key: string]: any;

  constructor(boundingBoxes?: Array<BoundingBox>) {
    this.bounding_boxes = boundingBoxes ? boundingBoxes : [];
  }
}

export class Entity {
  id: number | string;
  type: ENTITY_TYPE;
  attributes: EntityAttributes;

  constructor(id: number | string, type: ENTITY_TYPE, attributes?: EntityAttributes) {
    this.id = id;
    this.type = type;
    this.attributes = attributes ? attributes : new EntityAttributes();
  }
};

