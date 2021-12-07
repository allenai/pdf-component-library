import { Dimensions } from 'pdf-components-dist';

import { Citation, makeCitation } from './citations';
import { BoundingBoxRaw, ENTITY_TYPE, EntityRaw, scaleRawBoundingBox } from './entity';

// Raw annotation/entity data as returned from our data source
export type AnnotationsRaw = {
  entities: Array<EntityRaw>;
};

// Stores the annotations for a particular page. Currently only
// citations are supported.
export type Annotations = {
  citations: Array<Citation>;
};

// Stores a map of page indexes to the annotations for that page
export type PageToAnnotationsMap = Map<number, Annotations>;

export function transformRawAnnotations(
  annotationsRaw: AnnotationsRaw,
  pageDimensions: Dimensions
): PageToAnnotationsMap {
  // Start with all entities in raw format
  const pageToAnnotationsMap = new Map<number, Annotations>();
  const entitiesRaw = annotationsRaw.entities;
  entitiesRaw.map(entity => {
    // For the time being, we only support Citation Annotations
    // Add Citations to Annotation map
    if (entity.type === ENTITY_TYPE.CITATION) {
      const boundingBoxesRaw: Array<BoundingBoxRaw> = entity.attributes.bounding_boxes;
      boundingBoxesRaw.map(box => {
        // Scale raw bounding box data with respect to page size
        const boundingBoxScaled = scaleRawBoundingBox(
          box,
          pageDimensions.height,
          pageDimensions.width
        );
        const citation = makeCitation(entity.id, entity.attributes.paper_id, boundingBoxScaled);
        if (citation) {
          addCitationToPage(citation, pageToAnnotationsMap);
        }
      });
    }
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
