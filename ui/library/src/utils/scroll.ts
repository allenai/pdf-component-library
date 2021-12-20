// Each page div is ID'd according to page index
// e.g. reader_pg_0, reader_pg_1, etc.
const PAGE_NAV_TARGET_ID_ROOT = 'reader_pg_';
const READER_HEADER_CLASSNAME = 'reader__header';
const SCROLLABLE_TARGET_DIV_CLASSNAME = 'reader__page-list';

const HEIGHT_POINTS = 792;
const WIDTH_POINTS = 612;

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

export function scrollToPosition(pageIndex: number, leftPoints: number, bottomPoints: number) {
  const targetDiv = document.getElementsByClassName(SCROLLABLE_TARGET_DIV_CLASSNAME).item(0);
  if (!targetDiv) {
    console.error(`Could not find scroll target with classname ${SCROLLABLE_TARGET_DIV_CLASSNAME}`);
    return;
  }

  const [unitHeight, unitWidth, unitHeightWithMargins, unitWidthWithMargins, marginTop, marginLeft] = getUnitsOfAPage();
  const bottomPixels = unitHeight * bottomPoints / HEIGHT_POINTS;
  const leftPixels = unitWidth * leftPoints / WIDTH_POINTS;
  
  targetDiv.scrollTo({
    top: unitHeightWithMargins * pageIndex + marginTop + (unitHeight - bottomPixels),
    left: leftPixels,
    behavior: 'smooth'
  })
}

export function scrollToPdfPageIndex(pageIndex: number | string): void {
  scrollToId(generatePageIdFromIndex(pageIndex));
}

/**
 * Fetch unit length and unit width of a page
 * @returns [paperHeight, paperWidth, paperHeightIncludingMargins, paperWidthIncludingMargins, topMargin, leftMargin]
 */
function getUnitsOfAPage(): number[] {
  const unitPageElement = document.getElementById(generatePageIdFromIndex(0));
  const headerElement = document.getElementsByClassName(READER_HEADER_CLASSNAME).item(0);
  
  if (unitPageElement && headerElement) {
    const style = getComputedStyle(unitPageElement as Element)
    return [
      unitPageElement.clientHeight,
      unitPageElement.clientWidth,
      unitPageElement.offsetHeight + parseInt(style.marginTop) + parseInt(style.marginBottom),
      unitPageElement.offsetWidth + parseInt(style.marginLeft) + parseInt(style.marginRight),
      parseInt(style.marginTop),
      parseInt(style.marginLeft)
    ];
  }
  return [0, 0, 0, 0, 0, 0];
}
