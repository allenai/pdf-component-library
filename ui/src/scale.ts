import { PdfPageSizeData, PdfPixelSize, USER_UNIT_DENOMINATOR } from "./types";

// We assume 96 DPI for display
// TODO: There are more accurate ways to do this, but this is what ScholarPhi does now
const DPI = 96;

/**
 * Given data from the PDFPageProxy, calculates the pixel width of the PDF page at 100% scale
 * @param userUnit the default size of units in 1/72nds of an inch
 * @param view an array of numbers defining the corners of the page as [x1, y1, x2, y2]
 * @returns Pixel width of a page at 100% scale assuming 96DPI display
 */
export function computePageSizePx({ userUnit, topLeft, bottomRight }: PdfPageSizeData): PdfPixelSize {
  return {
    height: (bottomRight.y - topLeft.y) * (userUnit / USER_UNIT_DENOMINATOR) * DPI,
    width: (bottomRight.x - topLeft.x) * (userUnit / USER_UNIT_DENOMINATOR) * DPI
  };
}
