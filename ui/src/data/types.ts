/**
 * top, left, height, and width are in screen pixel units
 * at 100% scaling of the page
 */
export type Size = {
  top: number;
  left: number;
  height: number;
  width: number;
};

export type BoundingBox = {
  page?: number;
} & Size;

export enum ENTITY_TYPE {
  CITATION,
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

export type Citation = {
  type: ENTITY_TYPE.CITATION;
  attributes: {
    paper: CitationPaper;
  };
} & Entity;
