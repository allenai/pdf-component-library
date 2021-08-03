export function getPageNumber(pageNumber?: number, pageIndex?: number): number {
  if (typeof pageNumber === 'number') {
    return pageNumber;
  }
  if (typeof pageIndex === 'number') {
    return pageIndex + 1;
  }
  return 1;
}
