import { Dimensions } from './types';

// Data from react-pdf/pdfjs that we need to compute the pixel size of the PDF's page(s).
export interface IPDFPageProxy {
  userUnit: number; // the default size of units in 1/72nds of an inch
  view: Array<number>; // format: [ top left x coordinate, top left y coordinate, bottom right x, bottomRight y]
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
  const topLeft = { x: page.view[0], y: page.view[1] };
  const bottomRight = { x: page.view[2], y: page.view[3] };
  const PPI = (page.userUnit / USER_UNIT_DENOMINATOR) * DPI;

  return {
    height: (bottomRight.y - topLeft.y) * PPI,
    width: (bottomRight.x - topLeft.x) * PPI,
  };
}
