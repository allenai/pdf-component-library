// Each page div is ID'd according to page index
// e.g. reader_pg_0, reader_pg_1, etc.
const PAGE_NAV_TARGET_ID_ROOT = 'reader_pg_';

export function generatePageIdfromIndex(pageIndex: number | string): string {
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
  scrollToId(generatePageIdfromIndex(pageIndex));
}
