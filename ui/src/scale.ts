import { PDFPageProxy } from "pdfjs-dist/types/display/api";

// We assume 96 DPI for display
const DPI = 96;

/**
 * Given a PDFPageProxy from the PDF Document, calculates the approximate pixel width of the document.
 * "userUnit" is "the default size of units in 1/72nds of an inch," and we assume a 96DPI display.
 * @param page
 * @returns Pixel width of a page at 100% scale assuming 96DPI display
 */
export function computePageWidthPx(page: PDFPageProxy): number {
  const userUnit = page.userUnit;
  const x1 = page.view[0];
  const x2 = page.view[2];
  return (x2 - x1) * (userUnit / 72) * DPI;
}
