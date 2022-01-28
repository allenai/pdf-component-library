import { BoundingBoxType as BoundingBox } from '@allenai/pdf-components';

// Raw citation attributes in S2airs format
export type RawMention = {
  boundingBoxes: Array<BoundingBox>;
};

// Raw citation entity in S2airs format
export type RawCitation = {
  citedPaperId: string;
  mentions: Array<RawMention>;
};

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

export function makeAuthors(rawAuthors: any[]): Array<Author> {
  const result = rawAuthors.map(authorItem => {
    return {
      id: authorItem.authorId,
      name: authorItem.name,
      url: `https://semanticscholar.org/author/${authorItem.authorId}`,
    };
  });
  return result;
}

export function makePaperUrl(paperId: string): string {
  return `https://semanticscholar.org/paper/${paperId}`;
}
