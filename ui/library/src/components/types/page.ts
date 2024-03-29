export type PageReference = {
  num: number;
  gen: number;
};

// The definitions here are aligned with CSS properties
// TODO: show a picture about what these properties are in WIKI page
export type PageProperties = {
  width: number;
  height: number;
  // CSS margins, not document margin
  marginTop: number;
  marginBottom: number;
  marginLeft: number;
  marginRight: number;
};

/**
 * pageNumber: number starts from 1
 * pageIndex: number starts from 0
 */
export type PageNumber = {
  pageNumber?: number;
  pageIndex?: number;
};
