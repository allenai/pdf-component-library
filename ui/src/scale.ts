// We assume 96 DPI for display
const DPI = 96;

/**
 * Given data from the PDFPageProxy, calculates the pixel width of the PDF page at 100% scale
 * @param userUnit the default size of units in 1/72nds of an inch
 * @param view an array of numbers defining the corners of the page as [x1, y1, x2, y2]
 * @returns Pixel width of a page at 100% scale assuming 96DPI display
 */
export function computePageWidthPx(userUnit: number, view: [number, number, number, number]): number {
  const x1 = view[0];
  const x2 = view[2];
  return (x2 - x1) * (userUnit / 72) * DPI;
}
