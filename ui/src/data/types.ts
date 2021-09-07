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

/*
 * TODO: the following types will cause a merge conflict with the
 * citation entity model once PR #29 for ticket #28339 is merged.
 * Make sure that Author ID is not lost in the merge.
 */
export type Author = {
  id: number;
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
  boundingBox: BoundingBox;
  paper: CitationPaper;
};
