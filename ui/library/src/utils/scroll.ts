import { PageProperties } from '../components/types/pagee';
import { PageRotation } from '../utils/rotate';

// Each page div is ID'd according to page index
// e.g. reader_pg_0, reader_pg_1, etc.
export const PAGE_NAV_TARGET_ID_ROOT = 'reader_pg_';
export const SCROLLABLE_TARGET_DIV_CLASSNAME = 'reader__page-list';

const PDF_HEIGHT_POINTS = 792;
const PDF_WIDTH_POINTS = 612;

export function generatePageIdFromIndex(pageIndex: number | string): string {
  return `${PAGE_NAV_TARGET_ID_ROOT}${pageIndex}`;
}

export function scrollToId(id: string): void {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'center' });
  } else {
    console.error(`Could not find scroll target with ID #${id}`);
  }
}

export function scrollToPdfPageIndex(pageIndex: number | string): void {
  scrollToId(generatePageIdFromIndex(pageIndex));
}

/**
 * Scroll PDF document to a specific position.
 * @param pageIndex The index of the page where the position locates at
 * @param leftPoints The horizontal distance between the origin and the position (in PDF coordinates)
 * @param bottomPoints The vertical distance between the origin and the position (in PDF coordinates)
 */
export function scrollToPosition(
  pageIndex: number,
  leftPoints: number,
  bottomPoints: number,
  rotation: PageRotation = PageRotation.Rotate0
): void {
  const targetDiv: Element | null = document
    .getElementsByClassName(SCROLLABLE_TARGET_DIV_CLASSNAME)
    .item(0);
  if (!targetDiv) {
    console.error(`Cannot find scroll target with classname ${SCROLLABLE_TARGET_DIV_CLASSNAME}`);
    return;
  }

  /*
    Vertical scroll distance is calculated as
    = total number of previous pages * page height including top/down margins
    + the margin top of current page
    + the distance from the page top to the specified position

    Notice that the scroll distance is measured in pixels,
    so leftPoints/bottomPoints has to be transformed from points to pixels first.
  */

  const { width, height, marginTop, marginBottom, marginLeft, marginRight } =
    getPagePropertiesInPixels();
  const heightWithMargins = height + marginTop + marginBottom;
  // When a paper is rotated, its height and width would be switched automatically. However, leftPoints and bottomPoints remain the same.
  let marginTopPixels = marginTop;
  let bottomPixels = (height * bottomPoints) / PDF_HEIGHT_POINTS;
  let leftPixels = (width * leftPoints) / PDF_WIDTH_POINTS;

  if (rotation == PageRotation.Rotate90) {
    marginTopPixels = marginLeft;
    bottomPixels = (height * (PDF_WIDTH_POINTS - leftPoints)) / PDF_WIDTH_POINTS;
    leftPixels = (width * bottomPoints) / PDF_HEIGHT_POINTS;
  } else if (rotation == PageRotation.Rotate180) {
    marginTopPixels = marginBottom;
    bottomPixels = (height * (PDF_HEIGHT_POINTS - bottomPoints)) / PDF_HEIGHT_POINTS;
    leftPixels = (width * (PDF_WIDTH_POINTS - leftPoints)) / PDF_WIDTH_POINTS;
  } else if (rotation == PageRotation.Rotate270) {
    marginTopPixels = marginRight;
    bottomPixels = (height * leftPoints) / PDF_WIDTH_POINTS;
    leftPixels = (width * (PDF_HEIGHT_POINTS - bottomPoints)) / PDF_HEIGHT_POINTS;
  }

  targetDiv.scrollTo({
    top: Math.floor(heightWithMargins * pageIndex + marginTopPixels + (height - bottomPixels)),
    left: Math.floor(leftPixels),
    behavior: 'smooth',
  });
}

/**
 * Get lengths, widths, and margins of a page.
 * @returns a PageProperties object
 */
export function getPagePropertiesInPixels(): PageProperties {
  const firstPage = document.getElementById(generatePageIdFromIndex(0));
  if (!firstPage) {
    console.error(`Cannot get the first page of this document.`);
    const emptyPageProperties: PageProperties = {
      width: 0,
      height: 0,
      marginTop: 0,
      marginBottom: 0,
      marginLeft: 0,
      marginRight: 0,
    };
    return emptyPageProperties;
  }

  const style = getComputedStyle(firstPage as Element);
  const pageProperties: PageProperties = {
    width: parseInt(style.width),
    height: parseInt(style.height),
    marginTop: parseInt(style.marginTop),
    marginBottom: parseInt(style.marginBottom),
    marginLeft: parseInt(style.marginLeft),
    marginRight: parseInt(style.marginRight),
  };

  return pageProperties;
}
