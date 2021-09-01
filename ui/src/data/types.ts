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

export type Reference = {
  id: string;
};

export type Term = Entity & {
  attributes: {
    name: string;
    term_type: string;
    definitions: Array<string>;
    definitionTexs: Array<string>;
    sources: Array<string>;
    snippets: Array<string>;
  };
  relationships: {
    sentence: Reference;
    definitionSentences: Array<Reference>;
    snippetSentences: Array<Reference>;
  };
};
