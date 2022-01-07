import { BoundingBoxType as BoundingBox } from 'pdf-components-dist';

import { EntityAttributesRaw, EntityRaw } from './entity';

// Raw citation attributes in the same format as our data source
export type CitationAttributesRaw = {
  paperId: string;
} & EntityAttributesRaw;

// Raw citation entity in the same format as our data source
export type CitationRaw = {
  attributes: CitationAttributesRaw;
} & EntityRaw;


// --------- real s2airs data format ----------

export type RawMention = {
  boundingBoxes: Array<BoundingBox>
}

export type RawCitation = {
  citedPaperId: string,
  mentions: Array<RawMention>
}

// --------- real s2airs data format ----------

// UI model for author listing data displayed in CitationPopover popover
export type Author = {
  id: number;
  name: string;
  url: string;
};

// UI model for citation paper data displayed in the CitationPopover popover
export type CitationPaper = {
  abstract: string;
  authors: Array<Author>;
  title: string;
  url: string;
  year: number;
};

// UI model for bounding box and citation paper associated with a CitationPopover
export type Citation = {
  id: string;
  boundingBox: BoundingBox;
  paperId: string;
  paper: CitationPaper | null;
};

// Create a new Citation object
export function makeCitation(
  idString: string,
  paperId: string,
  boundingBox: BoundingBox
): Citation {

  return {
    id: idString,
    boundingBox,
    paperId,
    paper: null,
  };
}
