import { Entity, ENTITY_TYPE } from './entity';

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
  type: ENTITY_TYPE.CITATION;
  attributes: {
    paper: CitationPaper;
  };
} & Entity;
