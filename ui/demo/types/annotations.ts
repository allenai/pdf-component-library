import { Dimensions } from '@allenai/pdf-components';

import { Citation, makeCitation, RawCitation } from './citations';

// Stores the annotations for a particular page. Currently only
// citations are supported.
export type Annotations = {
  citations: Array<Citation>;
};

// Stores a map of page indexes to the annotations for that page
export type PageToAnnotationsMap = Map<number, Annotations>;

export function generateCitations(
  rawCitations: Array<RawCitation>,
  pageDimensions: Dimensions
): PageToAnnotationsMap {
  const pageToAnnotationsMap = new Map<number, Annotations>();
  // Start with all Citations in raw format
  rawCitations.map((rawCitation, citationIndex) => {
    rawCitation.mentions.map((mention, mentionIndex) => {
      // Add all Citation Mentions to Annotation map
      mention.boundingBoxes.map((box, boxIndex) => {
        // Scale raw bounding box data with respect to page size
        const scaledBox = scaleRawBoundingBox(box, pageDimensions.height, pageDimensions.width);
        const citation = makeCitation(
          `${citationIndex}-${mentionIndex}-${boxIndex}`,
          rawCitation.citedPaperId,
          scaledBox
        );
        if (citation) {
          addCitationToPage(citation, pageToAnnotationsMap);
        }
      });
    });
  });

  return pageToAnnotationsMap;
}

function addCitationToPage(citation: Citation, pageToAnnotationsMap: PageToAnnotationsMap) {
  const pageIndex = citation.boundingBox.page;
  const annotationsForPage = pageToAnnotationsMap.get(pageIndex);
  if (!annotationsForPage) {
    pageToAnnotationsMap.set(pageIndex, { citations: [citation] });
  } else {
    annotationsForPage.citations.push(citation);
  }
}
