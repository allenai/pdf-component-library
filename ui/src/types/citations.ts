import { BoundingBox } from '../library/types';
import { EntityAttributesRaw, EntityRaw } from './entity';

// Raw citation attributes in the same format as our data source
export type CitationAttributesRaw = {
  paperId: string;
} & EntityAttributesRaw;

// Raw citation entity in the same format as our data source
export type CitationRaw = {
  attributes: CitationAttributesRaw;
} & EntityRaw;

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
  boundingBox: BoundingBox;
  paperId: string;
  paper: CitationPaper | null;
};

// Create a new Citation object
export function makeCitation(paperId: string, boundingBox: BoundingBox): Citation {
  return {
    boundingBox,
    paperId,
    paper: null,
  };
}
