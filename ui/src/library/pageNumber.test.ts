import { expect } from 'chai';

import { getPageNumber } from './pageNumber';

describe('getPageNumber()', () => {
  it('returns the given pageNumber if it is a number', () => {
    const pageNumber = 4;
    expect(getPageNumber(pageNumber)).equals(pageNumber);
    expect(getPageNumber(pageNumber, 2)).equals(pageNumber);
  });

  it('returns the given pageIndex + 1 if it is a number and pageNumber is undefined', () => {
    const pageIndex = 8;
    expect(getPageNumber(undefined, pageIndex)).equals(pageIndex + 1);
  });

  it('returns 1 if neither parameter is defined', () => {
    expect(getPageNumber()).equals(1);
    expect(getPageNumber(undefined, undefined)).equals(1);
  });
});
