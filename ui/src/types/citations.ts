import { BoundingBox } from '../library/types';
import { Entity, ENTITY_TYPE, EntityAttributes } from './entity';

export type Author = {
  id: number;
  name: string;
  url?: string;
};

export class CitationAttributes extends EntityAttributes {
  paperId: number;
  paper?: CitationPaper;

  constructor(paperId: number, boundingBoxes: Array<BoundingBox>) {
    super();
    this.paperId = paperId;
    this.bounding_boxes = boundingBoxes;
  }
}

export class Citation extends Entity {
  attributes: CitationAttributes;

  constructor(entity: Entity, paperId: number, boundingBoxes: Array<BoundingBox>) {
    super(entity.id, ENTITY_TYPE.CITATION);
    this.attributes = new CitationAttributes(paperId, boundingBoxes);
  }
}

export class CitationPaper {
  abstract?: string;
  authors?: Array<Author>;
  title?: string;
  url?: string;
  year?: number;

  constructor(
    abstract?: string,
    authors?: Array<Author>,
    title?: string,
    url?: string,
    year?: number
  ) {
    this.abstract = abstract ? abstract : '';
    this.authors = authors ? authors : [];
    this.title = title ? title : '';
    this.url = url ? url : '';
    this.year = year ? year : undefined;
  }
}
