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

export type Author = {
  name: string;
  url?: string;
};

export type CitationPaper = {
  abstract?: string;
  authors: Array<Author>;
  title: string;
  url?: string;
  year: number;
};

export type Citation = Entity & {
  type: ENTITY_TYPE.CITATION;
  attributes: {
    paper: CitationPaper;
  };
};
