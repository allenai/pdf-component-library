import { expect } from 'chai';

import { BoundingBox, Dimensions, RawBoundingBox, scaleRawBoundingBox } from '../../src/components/types/boundingBox';

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

        const result: BoundingBox = scaleRawBoundingBox(rawBoundingBox, pageDimensions.height, pageDimensions.width);

        expect(result.page).equals(0);
        expect(result.top).equals(0);
        expect(result.left).equals(0);
        expect(result.height).equals(0);
        expect(result.width).equals(0);
    });

    it('returns a boundingBox with scaled attributes (boundingBox props > 0, pageDimensions == 0)', () => {
        const pageDimensions: Dimensions = { height: 0, width: 0 };
        const rawBoundingBox: RawBoundingBox = {
            page: 3,
            top: .1,
            left: .2,
            height: .01,
            width: .02,
        };

        const result: BoundingBox = scaleRawBoundingBox(rawBoundingBox, pageDimensions.height, pageDimensions.width);

        expect(result.page).equals(3);
        expect(result.top).equals(0);
        expect(result.left).equals(0);
        expect(result.height).equals(0);
        expect(result.width).equals(0);
    });

    it('returns a boundingBox with scaled attributes (boundingBox props > 0, pageDimensions > 0)', () => {
        const pageDimensions: Dimensions = { height: 100, width: 200 };
        const rawBoundingBox: RawBoundingBox = {
            page: 3,
            top: .1,
            left: .2,
            height: .01,
            width: .02,
        };

        const result: BoundingBox = scaleRawBoundingBox(rawBoundingBox, pageDimensions.height, pageDimensions.width);

        expect(result.page).equals(3);
        expect(result.top).equals(10);
        expect(result.left).equals(40);
        expect(result.height).equals(1);
        expect(result.width).equals(4);
    });
});
