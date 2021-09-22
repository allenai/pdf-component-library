import { Citation } from './citations';
import { Entity } from './entity';

export class PaperRaw {
  pdfUrl: string;
  entities: Array<Entity>;

  constructor(pdfUrl?: string, entities?: Array<Entity>) {
    this.pdfUrl = pdfUrl ? pdfUrl : '';
    this.entities = entities ? entities : [];
  }
}

export class Annotations {
  citations: Array<Citation>;

  constructor(citations?: Array<Citation>) {
    this.citations = citations ? citations : [];
  }
}

export class PaperAnnotated extends PaperRaw {
  annotations: Map<number, Annotations>;

  constructor(paperRaw?: PaperRaw) {
    if (paperRaw) {
      super(paperRaw.pdfUrl, paperRaw.entities);
    } else {
      super();
    }

    this.annotations = new Map<number, Annotations>();
  }
}
