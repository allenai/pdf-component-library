import { expect } from 'chai';

import { PageRotation } from '../rotate';
import { PdfPixelSize } from '../scale';
import { getStyleFromContext, PageSizeContextData, StyleSizeProps } from './PageSizeContext';

describe('PageStyleContext', () => {
  describe('getStyleFromContext', () => {
    const setPageSize = (pageSize: PdfPixelSize) => {
      return pageSize;
    };
    const setRotation = (rotation: PageRotation) => {
      return rotation;
    };
    const setScale = (scale: number) => {
      return scale;
    };
    const mockProps: StyleSizeProps = {
      top: 10,
      left: 20,
      height: 30,
      width: 40,
    };

    function expectStyleSizeProps(style: StyleSizeProps, expected: StyleSizeProps) {
      expect(style.top).equals(expected.top);
      expect(style.left).equals(expected.left);
      expect(style.height).equals(expected.height);
      expect(style.width).equals(expected.width);
    }

    it('scale: 1, rotation: 0', () => {
      const mockContext: PageSizeContextData = {
        pageSize: {
          height: 1056,
          width: 816,
        },
        scale: 1.0,
        rotation: PageRotation.Rotate0,
        setPageSize,
        setRotation,
        setScale,
      };

      const mockProps: StyleSizeProps = {
        top: 10,
        left: 20,
        height: 30,
        width: 40,
      };
      const style = getStyleFromContext(mockProps, mockContext);
      expectStyleSizeProps(style, mockProps);
    });

    it('scale: 1.2, rotation: 0', () => {
      const mockContext: PageSizeContextData = {
        pageSize: {
          height: 1056,
          width: 816,
        },
        scale: 1.2,
        rotation: PageRotation.Rotate0,
        setPageSize,
        setRotation,
        setScale,
      };

      const expected: StyleSizeProps = {
        top: 12,
        left: 24,
        height: 36,
        width: 48,
      };
      const style = getStyleFromContext(mockProps, mockContext);
      expectStyleSizeProps(style, expected);
    });

    it('scale: 0.8, rotation: 0', () => {
      const mockContext: PageSizeContextData = {
        pageSize: {
          height: 1056,
          width: 816,
        },
        scale: 0.8,
        rotation: PageRotation.Rotate0,
        setPageSize,
        setRotation,
        setScale,
      };

      const expected: StyleSizeProps = {
        top: 8,
        left: 16,
        height: 24,
        width: 32,
      };
      const style = getStyleFromContext(mockProps, mockContext);
      expectStyleSizeProps(style, expected);
    });

    it('scale: 1, rotation: 90', () => {
      const mockContext: PageSizeContextData = {
        pageSize: {
          height: 1056,
          width: 816,
        },
        scale: 1.0,
        rotation: PageRotation.Rotate90,
        setPageSize,
        setRotation,
        setScale,
      };

      const expected: StyleSizeProps = {
        top: 20,
        left: 1016,
        height: 40,
        width: 30,
      };
      const style = getStyleFromContext(mockProps, mockContext);
      expectStyleSizeProps(style, expected);
    });

    it('scale: 1, rotation: 180', () => {
      const mockContext: PageSizeContextData = {
        pageSize: {
          height: 1056,
          width: 816,
        },
        scale: 1.0,
        rotation: PageRotation.Rotate180,
        setPageSize,
        setRotation,
        setScale,
      };

      const expected: StyleSizeProps = {
        top: 1016,
        left: 756,
        height: 30,
        width: 40,
      };
      const style = getStyleFromContext(mockProps, mockContext);
      expectStyleSizeProps(style, expected);
    });

    it('scale: 1, rotation: 270', () => {
      const mockContext: PageSizeContextData = {
        pageSize: {
          height: 1056,
          width: 816,
        },
        scale: 1.0,
        rotation: PageRotation.Rotate270,
        setPageSize,
        setRotation,
        setScale,
      };

      const expected: StyleSizeProps = {
        top: 756,
        left: 10,
        height: 40,
        width: 30,
      };
      const style = getStyleFromContext(mockProps, mockContext);
      expectStyleSizeProps(style, expected);
    });

    it('scale: 2, rotation: 90', () => {
      const mockContext: PageSizeContextData = {
        pageSize: {
          height: 1056,
          width: 816,
        },
        scale: 2.0,
        rotation: PageRotation.Rotate90,
        setPageSize,
        setRotation,
        setScale,
      };

      const expected: StyleSizeProps = {
        top: 40,
        left: 2032,
        height: 80,
        width: 60,
      };
      const style = getStyleFromContext(mockProps, mockContext);
      expectStyleSizeProps(style, expected);
    });

    it('scale: .6, rotation: 180', () => {
      const mockContext: PageSizeContextData = {
        pageSize: {
          height: 1056,
          width: 816,
        },
        scale: 0.6,
        rotation: PageRotation.Rotate180,
        setPageSize,
        setRotation,
        setScale,
      };

      const expected: StyleSizeProps = {
        top: 609.6,
        left: 453.59999999999997,
        height: 18,
        width: 24,
      };
      const style = getStyleFromContext(mockProps, mockContext);
      expectStyleSizeProps(style, expected);
    });

    it('scale: 1.4, rotation: 270', () => {
      const mockContext: PageSizeContextData = {
        pageSize: {
          height: 1056,
          width: 816,
        },
        scale: 1.0,
        rotation: PageRotation.Rotate270,
        setPageSize,
        setRotation,
        setScale,
      };

      const expected: StyleSizeProps = {
        top: 756,
        left: 10,
        height: 40,
        width: 30,
      };
      const style = getStyleFromContext(mockProps, mockContext);
      expectStyleSizeProps(style, expected);
    });
  });
});
