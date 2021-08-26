import { Nullable } from "../types";


export type ForeignKey = {
    id: string,
};

export type BoundingBox = {
    page: number,
    left: number,
    top: number,
    width: number,
    height: number,
};

export type Entity = {
    id: string,
    type: string,
    attributes: {
        boundingBoxes: Array<BoundingBox>,
    },
    relationships: {}, // ?
}

export type Citation = Entity & {
    attributes: {
        paperId: string,
    },
};

export type Sentence = Entity & {
    attributes: {
        text: string,
        tex: string,
        texStart: number,
        texEnd: number,
    },
};

export type Equation = Entity & {
    attributes: {
        tex: string,
    },
};

export type Symbol = Entity & {
    attributes: {
        tex: string,
        type: string,
        mathml: string,
        matchmlNearMatches: Array<string>,
        isDefinition: boolean,
        disambiguatedId: string,
        nicknames: Array<string>, // ?
        diagramLabel: Nullable<string>,
        definitions: Array<string>, // ?
        definingFormulas: Array<string>, // ?
        passages: Array<string>, // ?
        snippets: Array<string>, // ?
    },
    relationships: {
        equation: ForeignKey,
        children: Array<ForeignKey>,
        sentence: ForeignKey,
        parent: {
            id: Nullable<string>,
            type: string
        },
        nicknameSentences: Array<ForeignKey>, // ?
        definitionSentences: Array<ForeignKey>, // ?
        definingFormulaEquations: Array<ForeignKey>, // ?
        snippetSentences: Array<ForeignKey>, // ?
    },
};

export type Term = Entity & {
    attributes: {
        name: string,
        term_type: string,
        definitions: Array<string>,
        definitionTexs: Array<string>,
        sources: Array<string>,
        snippets: Array<string>,
    },
    relationships: {
        sentence: ForeignKey,
        definitionSentences: Array<ForeignKey>,
        snippetSentences: Array<ForeignKey>,
    },
};

export type Mention = Citation | Equation | Symbol | Term; // no Sentence right?

export type SymbolData = {
    label: string,
    definingFormulaEquations: Array<string>, // ?
    definingFormulas: Array<string>,
    definitionSentences: Array<string>, // ?
    definitionTexs: Array<string>,
    definitions: Array<string>,
    snippets: Array<string>,
    snippetSentences: Array<string>, // ?
    sources: Array<string>,
}

export type PaperData = {
    entities: Array<Mention>,
    sharedSymbolData: Array<SymbolData>,
};