import { BoundingBox } from '../library/types';

export enum ENTITY_TYPE {
  CITATION = 'citation',
}

export type Entity = {
  id: number;
  type: ENTITY_TYPE;
  attributes: {
    boundingBoxes: Array<BoundingBox>;
  };
};
