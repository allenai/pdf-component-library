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
  // TODO: Remove once we have other types
  ENTITY,
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
