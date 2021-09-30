import { Size } from '../library/scale';
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

export function transformRawAnnotations(annotationsRaw: AnnotationsRaw, pageSize: Size): PageToAnnotationsMap {
  // Start with all entities in raw format
  const pageToAnnotationsMap = new Map<number, Annotations>();
  const entitiesRaw = annotationsRaw.entities;
  entitiesRaw.map(entity => {
    // For the time being, we only support Citation Annotations
    // Add Citations to Annotation map
    if (entity.type === ENTITY_TYPE.CITATION) {
      const boundingBoxesRaw: Array<BoundingBoxRaw> = entity.attributes.bounding_boxes;
      boundingBoxesRaw.map(box => {
        // Transform raw bounding box data with respect to page size
        const boundingBoxScaled = scaleRawBoundingBox(box, pageSize.height, pageSize.width);
        const citation = makeCitation(entity.attributes.paper_id, boundingBoxScaled);

        // If this bounding box is associated with a page, add it to
        // the map of page indexes to annotations
        if (typeof box.page === 'number') {
          const annotationsForPage = pageToAnnotationsMap.get(box.page);
          if (!annotationsForPage) {
            pageToAnnotationsMap.set(box.page, { citations: [citation] });
          } else {
            annotationsForPage.citations.push(citation);
          }
        }
      });
    }
  });
  return pageToAnnotationsMap;
}
