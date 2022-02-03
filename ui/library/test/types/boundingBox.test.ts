import { expect } from 'chai';

import {
  BoundingBox,
  Dimensions,
  RawBoundingBox,
  scaleRawBoundingBox,
} from '../../src/components/types/boundingBox';

describe('scaleRawBoundingBox', () => {
  it('returns a boundingBox with scaled attributes (boundingBox props == 0, pageDimensions > 0)', () => {
    const pageDimensions: Dimensions = { height: 100, width: 200 };
    const rawBoundingBox: RawBoundingBox = {
      page: 0,
      top: 0,
      left: 0,
      height: 0,
      width: 0,
    };

    const expectedResult: BoundingBox = {
      page: 0,
      top: 0,
      left: 0,
      height: 0,
      width: 0,
    };

    const result: BoundingBox = scaleRawBoundingBox(
      rawBoundingBox,
      pageDimensions.height,
      pageDimensions.width
    );

    expect(result).to.deep.equal(expectedResult);
  });

  it('returns a boundingBox with scaled attributes (boundingBox props > 0, pageDimensions == 0)', () => {
    const pageDimensions: Dimensions = { height: 0, width: 0 };
    const rawBoundingBox: RawBoundingBox = {
      page: 3,
      top: 0.1,
      left: 0.2,
      height: 0.01,
      width: 0.02,
    };

    const expectedResult: BoundingBox = {
      page: 3,
      top: 0,
      left: 0,
      height: 0,
      width: 0,
    };

    const result: BoundingBox = scaleRawBoundingBox(
      rawBoundingBox,
      pageDimensions.height,
      pageDimensions.width
    );
    expect(result).to.deep.equal(expectedResult);
  });

  it('returns a boundingBox with scaled attributes (boundingBox props > 0, pageDimensions > 0)', () => {
    const pageDimensions: Dimensions = { height: 100, width: 200 };
    const rawBoundingBox: RawBoundingBox = {
      page: 3,
      top: 0.1,
      left: 0.2,
      height: 0.01,
      width: 0.02,
    };

    const expectedResult: BoundingBox = {
      page: 3,
      top: 10,
      left: 40,
      height: 1,
      width: 4,
    };

    const result: BoundingBox = scaleRawBoundingBox(
      rawBoundingBox,
      pageDimensions.height,
      pageDimensions.width
    );

    expect(result).to.deep.equal(expectedResult);
  });
});
