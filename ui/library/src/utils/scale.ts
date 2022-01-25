import { Dimensions } from '../components/types/boundingBox';

// Data from react-pdf/pdfjs that we need to compute the pixel size of the PDF's page(s).
export interface IPDFPageProxy {
  userUnit: number; // the default size of units in 1/72nds of an inch
  view: Array<number>; // format: [ top left x coordinate, top left y coordinate, bottom right x, bottom right y]
}

// We assume 96 DPI for display
// TODO: There are more accurate ways to do this, but this is what ScholarPhi does now
const DPI = 96;

// PDF units are in 1/72nds of an inch
const USER_UNIT_DENOMINATOR = 72;

/**
 * Given a PDFPageProxy, calculates the screen pixel size of the PDF page at 100% scale
 * @param page The PDFPageProxy to calculate size for
 * @returns Pixel size of a page at 100% scale assuming 96DPI display
 */
export function computePageDimensions(page: IPDFPageProxy): Dimensions {
  const [leftPx, topPx, rightPx, bottomPx] = page.view;
  const PPI = (page.userUnit / USER_UNIT_DENOMINATOR) * DPI;

  return {
    height: (bottomPx - topPx) * PPI,
    width: (rightPx - leftPx) * PPI,
  };
}
