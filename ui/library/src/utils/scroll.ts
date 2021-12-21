// Each page div is ID'd according to page index
// e.g. reader_pg_0, reader_pg_1, etc.
const PAGE_NAV_TARGET_ID_ROOT = 'reader_pg_';
const SCROLLABLE_TARGET_DIV_CLASSNAME = 'reader__page-list';

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
 * Scroll PDF document to a specific position
 * @param pageIndex The index of the page where the position locates at
 * @param leftPoints The horizontal distance between the origin and the position (measured in PDF coordinate systems)
 * @param bottomPoints The vertical distance between the origin and the position (measured in PDF coordinate systems)
 * @returns
 */
export function scrollToPosition(
  pageIndex: number,
  leftPoints: number,
  bottomPoints: number
): void {
  const targetDiv: Element | null = document
    .getElementsByClassName(SCROLLABLE_TARGET_DIV_CLASSNAME)
    .item(0);
  if (!targetDiv) {
    console.error(`Cannot find scroll target with classname ${SCROLLABLE_TARGET_DIV_CLASSNAME}`);
    return;
  }

  const [height, width, heightWithMargins, , marginTop] = getPageUnitsInPixels();
  const bottomPixels = (height * bottomPoints) / PDF_HEIGHT_POINTS;
  const leftPixels = (width * leftPoints) / PDF_WIDTH_POINTS;

  targetDiv.scrollTo({
    top: heightWithMargins * pageIndex + marginTop + (height - bottomPixels),
    left: leftPixels,
    behavior: 'smooth',
  });
}

/**
 * Get lengths, widths, and margins of a page
 * @returns [height, width, heightWithMargins, widthWithMargins, topMargin, leftMargin]
 */
function getPageUnitsInPixels(): number[] {
  const firstPage = document.getElementById(generatePageIdFromIndex(0));
  if (!firstPage) {
    console.error(`Cannot get the first page of this document.`);
    return [0, 0, 0, 0, 0, 0];
  }

  const style = getComputedStyle(firstPage as Element);
  return [
    firstPage.clientHeight,
    firstPage.clientWidth,
    firstPage.offsetHeight + parseInt(style.marginTop) + parseInt(style.marginBottom),
    firstPage.offsetWidth + parseInt(style.marginLeft) + parseInt(style.marginRight),
    parseInt(style.marginTop),
    parseInt(style.marginLeft),
  ];
}
