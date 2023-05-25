import { Dimensions } from '../../src/components/types/boundingBox';
import { IDocumentContext } from '../../src/context/DocumentContext';

export const mockDocumentContext: IDocumentContext = {
  numPages: 2,
  numPagesLoaded: 2,
  outline: [],
  outlinePositions: null,
  pageDimensions: {
    height: 1056,
    width: 816,
  },
  getOutlineTargets: () => {
    return [];
  },
  setNumPages: (numPages: number) => {
    return numPages;
  },
  setNumPagesLoaded: numPages => {
    return numPages;
  },
  setOutline: outline => {
    return outline;
  },
  setOutlinePositions: outlinePositions => {
    return outlinePositions;
  },
  setPageDimensions: (pageDimensions: Dimensions) => {
    return pageDimensions;
  },
  setPdfDocProxy: pdfDocProxy => {
    return pdfDocProxy;
  },
};
