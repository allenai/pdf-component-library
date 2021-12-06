import { expect } from 'chai';

import { Size } from '../../src/types';
import { PageRotation } from '../../src/utils/rotate';
import {
  computeBoundingBoxStyle,
  computePageStyle,
  getPageHeight,
  getPageWidth,
} from '../../src/utils/style';

describe('styleUtil functions', () => {
  const pageDimensions = {
    height: 816,
    width: 1056,
  };

  describe('getPageHeight', () => {
    it('returns pageDimensions.height when rotation = 0deg', () => {
      const result = getPageHeight(pageDimensions, PageRotation.Rotate0);
      expect(result).equals(pageDimensions.height);
    });

    it('returns pageDimensions.height when rotation = 180deg', () => {
      const result = getPageHeight(pageDimensions, PageRotation.Rotate180);
      expect(result).equals(pageDimensions.height);
    });

    it('returns pageDimensions.width when rotation = 90deg', () => {
      const result = getPageHeight(pageDimensions, PageRotation.Rotate90);
      expect(result).equals(pageDimensions.width);
    });

    it('returns pageDimensions.width when rotation = 270deg', () => {
      const result = getPageHeight(pageDimensions, PageRotation.Rotate270);
      expect(result).equals(pageDimensions.width);
    });
  });

  describe('getPageWidth', () => {
    it('returns pageDimensions.width when rotation = 0deg', () => {
      const result = getPageWidth(pageDimensions, PageRotation.Rotate0);
      expect(result).equals(pageDimensions.width);
    });

    it('returns pageDimensions.width when rotation = 180deg', () => {
      const result = getPageWidth(pageDimensions, PageRotation.Rotate180);
      expect(result).equals(pageDimensions.width);
    });

    it('returns pageDimensions.height when rotation = 90deg', () => {
      const result = getPageWidth(pageDimensions, PageRotation.Rotate90);
      expect(result).equals(pageDimensions.height);
    });

    it('returns pageDimensions.height when rotation = 270deg', () => {
      const result = getPageWidth(pageDimensions, PageRotation.Rotate270);
      expect(result).equals(pageDimensions.height);
    });
  });

  describe('computeBoundingBoxStyle', () => {
    const boundingBoxSize = {
      top: 600,
      left: 700,
      height: 10,
      width: 5,
    };

    function expectBoxSize(actualSize: Size, expectedSize: Size) {
      expect(actualSize.top).equals(expectedSize.top);
      expect(actualSize.left).equals(expectedSize.left);
      expect(actualSize.height).equals(expectedSize.height);
      expect(actualSize.width).equals(expectedSize.width);
    }

    it('returns correct size for rotation = 0deg and scale = 0.8', () => {
      const rotation = PageRotation.Rotate0;
      const scale = 0.8;
      const expected = {
        top: 480,
        left: 560,
        height: 8,
        width: 4,
      };

      const result = computeBoundingBoxStyle(boundingBoxSize, pageDimensions, rotation, scale);
      expectBoxSize(result, expected);
    });

    it('returns correct size for rotation = 0deg and scale = 1', () => {
      const rotation = PageRotation.Rotate0;
      const scale = 1.0;
      const expected = boundingBoxSize;

      const result = computeBoundingBoxStyle(boundingBoxSize, pageDimensions, rotation, scale);
      expectBoxSize(result, expected);
    });

    it('returns correct size for rotation = 0deg and scale = 1.2', () => {
      const rotation = PageRotation.Rotate0;
      const scale = 1.2;
      const expected = {
        top: 720,
        left: 840,
        height: 12,
        width: 6,
      };

      const result = computeBoundingBoxStyle(boundingBoxSize, pageDimensions, rotation, scale);
      expectBoxSize(result, expected);
    });

    it('returns correct size for rotation = 90deg and scale = 0.8', () => {
      const rotation = PageRotation.Rotate90;
      const scale = 0.8;
      const expected = {
        top: 560,
        left: 164.8,
        height: 4,
        width: 8,
      };

      const result = computeBoundingBoxStyle(boundingBoxSize, pageDimensions, rotation, scale);
      expectBoxSize(result, expected);
    });

    it('returns correct size for rotation = 90deg and scale = 1', () => {
      const rotation = PageRotation.Rotate90;
      const scale = 1.0;
      const expected = {
        top: 700,
        left: 206,
        height: 5,
        width: 10,
      };

      const result = computeBoundingBoxStyle(boundingBoxSize, pageDimensions, rotation, scale);
      expectBoxSize(result, expected);
    });

    it('returns correct size for rotation = 90deg and scale = 1.2', () => {
      const rotation = PageRotation.Rotate90;
      const scale = 1.2;
      const expected = {
        top: 840,
        left: 247.2,
        height: 6,
        width: 12,
      };

      const result = computeBoundingBoxStyle(boundingBoxSize, pageDimensions, rotation, scale);
      expectBoxSize(result, expected);
    });

    it('returns correct size for rotation = 180deg and scale = 0.8', () => {
      const rotation = PageRotation.Rotate180;
      const scale = 0.8;
      const expected = {
        top: 164.8,
        left: 280.8,
        height: 8,
        width: 4,
      };

      const result = computeBoundingBoxStyle(boundingBoxSize, pageDimensions, rotation, scale);
      expectBoxSize(result, expected);
    });

    it('returns correct size for rotation = 180deg and scale = 1', () => {
      const rotation = PageRotation.Rotate180;
      const scale = 1.0;
      const expected = {
        top: 206,
        left: 351,
        height: 10,
        width: 5,
      };

      const result = computeBoundingBoxStyle(boundingBoxSize, pageDimensions, rotation, scale);
      expectBoxSize(result, expected);
    });

    it('returns correct size for rotation = 180deg and scale = 1.2', () => {
      const rotation = PageRotation.Rotate180;
      const scale = 1.2;
      const expected = {
        top: 247.2,
        left: 421.2,
        height: 12,
        width: 6,
      };

      const result = computeBoundingBoxStyle(boundingBoxSize, pageDimensions, rotation, scale);
      expectBoxSize(result, expected);
    });

    it('returns correct size for rotation = 270deg and scale = 0.8', () => {
      const rotation = PageRotation.Rotate270;
      const scale = 0.8;
      const expected = {
        top: 280.8,
        left: 480,
        height: 4,
        width: 8,
      };

      const result = computeBoundingBoxStyle(boundingBoxSize, pageDimensions, rotation, scale);
      expectBoxSize(result, expected);
    });

    it('returns correct size for rotation = 270deg and scale = 1', () => {
      const rotation = PageRotation.Rotate270;
      const scale = 1.0;
      const expected = {
        top: 351,
        left: 600,
        height: 5,
        width: 10,
      };

      const result = computeBoundingBoxStyle(boundingBoxSize, pageDimensions, rotation, scale);
      expectBoxSize(result, expected);
    });

    it('returns correct size for rotation = 270deg and scale = 1.2', () => {
      const rotation = PageRotation.Rotate270;
      const scale = 1.2;
      const expected = {
        top: 421.2,
        left: 720,
        height: 6,
        width: 12,
      };

      const result = computeBoundingBoxStyle(boundingBoxSize, pageDimensions, rotation, scale);
      expectBoxSize(result, expected);
    });
  });

  describe('computePageStyle', () => {
    function expectPageSize(actualSize: Size, expectedSize: Size) {
      expect(actualSize.top).equals(expectedSize.top);
      expect(actualSize.left).equals(expectedSize.left);
      expect(actualSize.height).equals(expectedSize.height);
      expect(actualSize.width).equals(expectedSize.width);
    }

    it('returns correct size for rotation = 0deg and scale = 0.8', () => {
      const rotation = PageRotation.Rotate0;
      const scale = 0.8;
      const expected = {
        top: 0,
        left: 0,
        height: 652.8000000000001,
        width: 844.8000000000001,
      };

      const result = computePageStyle(pageDimensions, rotation, scale);
      expectPageSize(result, expected);
    });

    it('returns correct size for rotation = 0deg and scale = 1', () => {
      const rotation = PageRotation.Rotate0;
      const scale = 1.0;
      const expected = {
        top: 0,
        left: 0,
        height: 816,
        width: 1056,
      };

      const result = computePageStyle(pageDimensions, rotation, scale);
      expectPageSize(result, expected);
    });

    it('returns correct size for rotation = 0deg and scale = 1.2', () => {
      const rotation = PageRotation.Rotate0;
      const scale = 1.2;
      const expected = {
        top: 0,
        left: 0,
        height: 979.1999999999999,
        width: 1267.2,
      };

      const result = computePageStyle(pageDimensions, rotation, scale);
      expectPageSize(result, expected);
    });

    it('returns correct size for rotation = 90deg and scale = 0.8', () => {
      const rotation = PageRotation.Rotate90;
      const scale = 0.8;
      const expected = {
        top: 0,
        left: 0,
        height: 844.8000000000001,
        width: 652.8000000000001,
      };

      const result = computePageStyle(pageDimensions, rotation, scale);
      expectPageSize(result, expected);
    });

    it('returns correct size for rotation = 90deg and scale = 1', () => {
      const rotation = PageRotation.Rotate90;
      const scale = 1.0;
      const expected = {
        top: 0,
        left: 0,
        height: 1056,
        width: 816,
      };

      const result = computePageStyle(pageDimensions, rotation, scale);
      expectPageSize(result, expected);
    });

    it('returns correct size for rotation = 90deg and scale = 1.2', () => {
      const rotation = PageRotation.Rotate90;
      const scale = 1.2;
      const expected = {
        top: 0,
        left: 0,
        height: 1267.2,
        width: 979.1999999999999,
      };

      const result = computePageStyle(pageDimensions, rotation, scale);
      expectPageSize(result, expected);
    });

    it('returns correct size for rotation = 180deg and scale = 0.8', () => {
      const rotation = PageRotation.Rotate180;
      const scale = 0.8;
      const expected = {
        top: 0,
        left: 0,
        height: 652.8000000000001,
        width: 844.8000000000001,
      };

      const result = computePageStyle(pageDimensions, rotation, scale);
      expectPageSize(result, expected);
    });

    it('returns correct size for rotation = 180deg and scale = 1', () => {
      const rotation = PageRotation.Rotate180;
      const scale = 1.0;
      const expected = {
        top: 0,
        left: 0,
        height: 816,
        width: 1056,
      };

      const result = computePageStyle(pageDimensions, rotation, scale);
      expectPageSize(result, expected);
    });

    it('returns correct size for rotation = 180deg and scale = 1.2', () => {
      const rotation = PageRotation.Rotate180;
      const scale = 1.2;
      const expected = {
        top: 0,
        left: 0,
        height: 979.1999999999999,
        width: 1267.2,
      };

      const result = computePageStyle(pageDimensions, rotation, scale);
      expectPageSize(result, expected);
    });

    it('returns correct size for rotation = 270deg and scale = 0.8', () => {
      const rotation = PageRotation.Rotate270;
      const scale = 0.8;
      const expected = {
        top: 0,
        left: 0,
        height: 844.8000000000001,
        width: 652.8000000000001,
      };

      const result = computePageStyle(pageDimensions, rotation, scale);
      expectPageSize(result, expected);
    });

    it('returns correct size for rotation = 270deg and scale = 1', () => {
      const rotation = PageRotation.Rotate270;
      const scale = 1.0;
      const expected = {
        top: 0,
        left: 0,
        height: 1056,
        width: 816,
      };

      const result = computePageStyle(pageDimensions, rotation, scale);
      expectPageSize(result, expected);
    });

    it('returns correct size for rotation = 270deg and scale = 1.2', () => {
      const rotation = PageRotation.Rotate270;
      const scale = 1.2;
      const expected = {
        top: 0,
        left: 0,
        height: 1267.2,
        width: 979.1999999999999,
      };

      const result = computePageStyle(pageDimensions, rotation, scale);
      expectPageSize(result, expected);
    });
  });
});
