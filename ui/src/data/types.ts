export type BoundingBox = {
  page: number;
  left: number;
  top: number;
  width: number;
  height: number;
};

export enum ENTITY_TYPE {
  CITATION,
  EQUATION,
  SENTENCE,
  SYMBOL,
  TERM,
}

export type Entity = {
  id: string;
  type: ENTITY_TYPE;
  attributes: {
    boundingBoxes: Array<BoundingBox>;
  };
};

export type Reference = {
  id: string;
};

export type Symbol = Entity & {
  type: ENTITY_TYPE.SYMBOL;
  attributes: {
    tex: string;
    type: string;
    mathml: string;
    matchmlNearMatches: Array<string>;
    isDefinition: boolean;
    disambiguatedId: string;
    nicknames: Array<string>;
    diagramLabel: string | null;
    definitions: Array<string>;
    definingFormulas: Array<string>;
    passages: Array<string>;
    snippets: Array<string>;
  };
  relationships: {
    equation: Reference;
    children: Array<Reference>;
    sentence: Reference;
    parent: {
      id: string | null;
      type: string;
    };
    nicknameSentences: Array<Reference>;
    definitionSentences: Array<Reference>;
    definingFormulaEquations: Array<Reference>;
    snippetSentences: Array<Reference>;
  };
};
