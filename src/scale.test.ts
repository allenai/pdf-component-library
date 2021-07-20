import { expect } from 'chai';

import { computePageSize, PdfPageSizeData } from './scale';

describe('computePageSizePx', () => {
  const mockData: PdfPageSizeData = {
    userUnit: 1,
    topLeft: { x: 0, y: 0 },
    bottomRight: { x: 612, y: 792 },
  };
  it('computes pixel height and width of the PDF', () => {
    const output = computePageSize(mockData);
    expect(output.height).to.equal(1056);
    expect(output.width).to.equal(816);
  });
});
