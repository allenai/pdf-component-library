import * as React from 'react';
import { Outline as PdfOutline } from 'react-pdf/dist/esm/entry.webpack';

import { scrollToPdfPageIndex } from '../utils/scroll';

export const Outline: React.FunctionComponent = () => {
  // Click events from the Outline only give a pageNumber, not a pageIndex
  const handleOutlineClick = React.useCallback(({ pageNumber }: { pageNumber: string }) => {
    // Page IDs are based on index, so convert pageNumber to pageIndex before scrolling
    const pageIndex = convertPageNumberToPageIndex(Number.parseInt(pageNumber));
    scrollToPdfPageIndex(pageIndex);
  }, []);

  // Convert from pageNumber to pageIndex
  // pageNumber is 1-indexed, pageIndex is 0-indexed
  // Returns -1 if if given a pageNumber <= 0
  function convertPageNumberToPageIndex(pageNumber: number): number {
    return Math.max(-1, pageNumber - 1);
  }

  return <PdfOutline onItemClick={handleOutlineClick} />;
};
