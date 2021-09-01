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

// TODO: uncomment this once other types are merged in
// export type Mention = Citation | Equation | Symbol | Term;
export type Mention = Entity;

export type SymbolData = {
  label: string;
  definingFormulaEquations: Array<string>;
  definingFormulas: Array<string>;
  definitionSentences: Array<string>;
  definitionTexs: Array<string>;
  definitions: Array<string>;
  snippets: Array<string>;
  snippetSentences: Array<string>;
  sources: Array<string>;
};

export type PaperData = {
  entities: Array<Mention>;
  sharedSymbolData: Array<SymbolData>;
};
