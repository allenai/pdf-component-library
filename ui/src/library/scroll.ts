// Each page div is ID'd accoreding to page index
// e.g. reader_pg_0, reader_pg_1, etc.
const PAGE_NAV_TARGET_ID_ROOT = 'reader_pg_';

export function generatePageId(pageNum: number | string): string {
  return `${PAGE_NAV_TARGET_ID_ROOT}${pageNum}`;
}

export function scrollToPdfPage(pageNum: number | string): void {
  const pageElement = document.getElementById(generatePageId(pageNum));
  if (pageElement) {
    pageElement.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'center' });
  } else {
    console.error(`Could not find scroll target for page ${pageNum}`);
  }
}
