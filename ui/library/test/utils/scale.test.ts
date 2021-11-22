import { expect } from 'chai';

import { computePageDimensions, IPDFPageProxy } from '../../src/utils/scale';

describe('computePageDimensionsPx', () => {
  it('computes pixel height and width of the PDF with standard page size', () => {
    const mockPageProxy: IPDFPageProxy = {
      userUnit: 1,
      view: [0, 0, 612, 792],
    };

    const output = computePageDimensions(mockPageProxy);

    expect(output.height).to.equal(1056);
    expect(output.width).to.equal(816);
  });

  it('computes pixel height and width of the PDF with nonstandard page size', () => {
    const mockPageProxy: IPDFPageProxy = {
      userUnit: 5,
      view: [2, 7, 119, 1123],
    };

    const output = computePageDimensions(mockPageProxy);

    expect(output.height).to.equal(7440);
    expect(output.width).to.equal(780);
  });
});
