import { Dimensions, Point } from './types';

// TODO: augh this name is terrible, it's the data from react-pdf/pdfjs that
//       we need to compute the pixel size of the PDF's page(s).
export type PdfPageSizeData = {
  userUnit: number; // the default size of units in 1/72nds of an inch
  topLeft: Point;
  bottomRight: Point;
};

// We assume 96 DPI for display
// TODO: There are more accurate ways to do this, but this is what ScholarPhi does now
const DPI = 96;

// PDF units are in 1/72nds of an inch
const USER_UNIT_DENOMINATOR = 72;

/**
 * Given data from the PDFPageProxy, calculates the screen pixel size of the PDF page at 100% scale
 * @param userUnit the default size of units in 1/72nds of an inch
 * @param view an array of numbers defining the corners of the page as [x1, y1, x2, y2]
 * @returns Pixel size of a page at 100% scale assuming 96DPI display
 */
export function computePageDimensions({
  userUnit,
  topLeft,
  bottomRight,
}: PdfPageSizeData): Dimensions {
  return {
    height: (bottomRight.y - topLeft.y) * (userUnit / USER_UNIT_DENOMINATOR) * DPI,
    width: (bottomRight.x - topLeft.x) * (userUnit / USER_UNIT_DENOMINATOR) * DPI,
  };
}
