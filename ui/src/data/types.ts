export type BoundingBox = {
  page: number;
  left: number;
  top: number;
  width: number;
  height: number;
};

export enum ENTITY_TYPE {
  CITATION,
  EQUATION,
  SENTENCE,
  SYMBOL,
  TERM,
}

export type Entity = {
  id: string;
  type: ENTITY_TYPE;
  attributes: {
    boundingBoxes: Array<BoundingBox>;
  };
};

export type Sentence = Entity & {
  type: ENTITY_TYPE.SENTENCE;
  attributes: {
    text: string;
    tex: string;
    texStart: number;
    texEnd: number;
  };
};
