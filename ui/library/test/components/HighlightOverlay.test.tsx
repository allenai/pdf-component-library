import { expect } from 'chai';
import { ReactWrapper } from 'enzyme';
import * as React from 'react';

import { BoundingBox } from '../../src/components/BoundingBox';
import { HighlightOverlay } from '../../src/components/HighlightOverlay';
import { IDocumentContext } from '../../src/context/DocumentContext';
import { ITransformContext } from '../../src/context/TransformContext';
import { Dimensions } from '../../src/types';
import { PageRotation } from '../../src/utils/rotate';
import { expectHeightWidth, expectLeftTop, mountWithContexts } from '../testHelper';

describe('<HighlightOverlay/>', () => {
  const mockDocumentContext: IDocumentContext = {
    numPages: 2,
    pageDimensions: {
      height: 1056,
      width: 816,
    },
    setNumPages: (numPages: number) => {
      return numPages;
    },
    setPageDimensions: (pageDimensions: Dimensions) => {
      return pageDimensions;
    },
  };
  const mockTransformContext: ITransformContext = {
    rotation: PageRotation.Rotate0,
    scale: 1.0,
    setRotation: (rotation: PageRotation) => {
      return rotation;
    },
    setScale: (scale: number) => {
      return scale;
    },
  };

  function getRectsWithFill(component: ReactWrapper, fillColor: string): Array<SVGElement> {
    const rects = component.getDOMNode().getElementsByTagName('rect');
    return Object.values(rects).filter((rect: SVGElement) => {
      if (rect.getAttribute('fill') == fillColor) {
        return true;
      }
    });
  }

  function expectXY(element: SVGElement, x: number, y: number): void {
    expect(element.getAttribute('x')).equals(`${x}`);
    expect(element.getAttribute('y')).equals(`${y}`);
  }

  it('renders on its own without issue', () => {
    mountWithContexts(
      <HighlightOverlay pageIndex={0} />,
      mockDocumentContext,
      mockTransformContext
    );
  });

  it('sets mask ID based on page number', () => {
    const wrapper = mountWithContexts(
      <HighlightOverlay pageIndex={345} />,
      mockDocumentContext,
      mockTransformContext
    );

    expect(wrapper.getDOMNode().getElementsByTagName('mask')[0].id).equals(
      'highlight-overlay-mask-345'
    );
  });

  describe('pixel size', () => {
    it('matches the pixel size of the page [outer wrapper div]', () => {
      const wrapper = mountWithContexts(
        <HighlightOverlay pageIndex={0} />,
        mockDocumentContext,
        mockTransformContext
      );

      expectHeightWidth(
        wrapper.getDOMNode(),
        mockDocumentContext.pageDimensions.height,
        mockDocumentContext.pageDimensions.width
      );
    });

    it('matches the pixel size of the page [SVG element]', () => {
      const wrapper = mountWithContexts(
        <HighlightOverlay pageIndex={0} />,
        mockDocumentContext,
        mockTransformContext
      );
      const svg = wrapper.getDOMNode().getElementsByTagName('svg')[0];

      expectHeightWidth(
        svg,
        mockDocumentContext.pageDimensions.height,
        mockDocumentContext.pageDimensions.width
      );
    });

    it('matches the pixel size of the page [masked rect elements]', () => {
      const wrapper = mountWithContexts(
        <HighlightOverlay pageIndex={0} />,
        mockDocumentContext,
        mockTransformContext
      );
      const maskedRects = getRectsWithFill(wrapper, 'white');

      expect(maskedRects.length).equals(2);
      expectHeightWidth(
        maskedRects[0],
        mockDocumentContext.pageDimensions.height,
        mockDocumentContext.pageDimensions.width
      );
      expectHeightWidth(
        maskedRects[1],
        mockDocumentContext.pageDimensions.height,
        mockDocumentContext.pageDimensions.width
      );
    });
  });

  describe('page scaling', () => {
    const transformContext = {
      ...mockTransformContext,
      scale: 2.0,
    };

    it('responds to page scaling [outer wrapper div]', () => {
      const wrapper = mountWithContexts(
        <HighlightOverlay pageIndex={0} />,
        mockDocumentContext,
        transformContext
      );

      expectLeftTop(wrapper.getDOMNode(), 0, 0);
      expectHeightWidth(
        wrapper.getDOMNode(),
        mockDocumentContext.pageDimensions.height * transformContext.scale,
        mockDocumentContext.pageDimensions.width * transformContext.scale
      );
    });

    it('responds to page scaling [SVG element]', () => {
      const wrapper = mountWithContexts(
        <HighlightOverlay pageIndex={0} />,
        mockDocumentContext,
        transformContext
      );
      const svg = wrapper.getDOMNode().getElementsByTagName('svg')[0];

      expectLeftTop(svg, 0, 0);
      expectHeightWidth(
        svg,
        mockDocumentContext.pageDimensions.height * transformContext.scale,
        mockDocumentContext.pageDimensions.width * transformContext.scale
      );
    });

    it('responds to page scaling [masked rect elements]', () => {
      const wrapper = mountWithContexts(
        <HighlightOverlay pageIndex={0} />,
        mockDocumentContext,
        transformContext
      );
      const maskedRects = getRectsWithFill(wrapper, 'white');

      expect(maskedRects.length).equals(2);
      expectLeftTop(maskedRects[0], 0, 0);
      expectHeightWidth(
        maskedRects[0],
        mockDocumentContext.pageDimensions.height * transformContext.scale,
        mockDocumentContext.pageDimensions.width * transformContext.scale
      );
      expectLeftTop(maskedRects[1], 0, 0);
      expectHeightWidth(
        maskedRects[1],
        mockDocumentContext.pageDimensions.height * transformContext.scale,
        mockDocumentContext.pageDimensions.width * transformContext.scale
      );
    });
  });

  describe('page rotation', () => {
    const transformContext = {
      ...mockTransformContext,
      rotation: PageRotation.Rotate90,
    };

    it('responds to page rotation [outer wrapper div]', () => {
      const wrapper = mountWithContexts(
        <HighlightOverlay pageIndex={0} />,
        mockDocumentContext,
        transformContext
      );

      expectLeftTop(wrapper.getDOMNode(), 0, 0);
      expectHeightWidth(
        wrapper.getDOMNode(),
        mockDocumentContext.pageDimensions.width,
        mockDocumentContext.pageDimensions.height
      );
    });

    it('responds to page rotation [SVG element]', () => {
      const wrapper = mountWithContexts(
        <HighlightOverlay pageIndex={0} />,
        mockDocumentContext,
        transformContext
      );
      const svg = wrapper.getDOMNode().getElementsByTagName('svg')[0];

      expectLeftTop(svg, 0, 0);
      expectHeightWidth(
        svg,
        mockDocumentContext.pageDimensions.width,
        mockDocumentContext.pageDimensions.height
      );
    });

    it('responds to page rotation [masked rect elements]', () => {
      const wrapper = mountWithContexts(
        <HighlightOverlay pageIndex={0} />,
        mockDocumentContext,
        transformContext
      );
      const maskedRects = getRectsWithFill(wrapper, 'white');

      expect(maskedRects.length).equals(2);
      expectLeftTop(maskedRects[0], 0, 0);
      expectHeightWidth(
        maskedRects[0],
        mockDocumentContext.pageDimensions.width,
        mockDocumentContext.pageDimensions.height
      );
      expectLeftTop(maskedRects[1], 0, 0);
      expectHeightWidth(
        maskedRects[1],
        mockDocumentContext.pageDimensions.width,
        mockDocumentContext.pageDimensions.height
      );
    });
  });

  describe('rendering unmasked content', () => {
    it('renders no unmasked rects when no children are given', () => {
      const wrapper = mountWithContexts(
        <HighlightOverlay pageIndex={0} />,
        mockDocumentContext,
        mockTransformContext
      );
      const unmaskedRects = getRectsWithFill(wrapper, 'black');

      expect(unmaskedRects.length).equals(0);
    });

    it('renders 1 unmasked rect when 1 child is given', () => {
      const wrapper = mountWithContexts(
        <HighlightOverlay pageIndex={0}>
          <BoundingBox page={0} top={12} left={34} height={56} width={78} />
        </HighlightOverlay>,
        mockDocumentContext,
        mockTransformContext
      );

      const unmaskedRects = getRectsWithFill(wrapper, 'black');
      expect(unmaskedRects.length).equals(1);
      expectHeightWidth(unmaskedRects[0], 56, 78);
      expectXY(unmaskedRects[0], 34, 12);
    });

    it('renders 2 unmasked rects when 2 children are given', () => {
      const wrapper = mountWithContexts(
        <HighlightOverlay pageIndex={0}>
          <BoundingBox page={0} top={12} left={34} height={56} width={78} />
          <BoundingBox page={0} top={98} left={76} height={54} width={32} />
        </HighlightOverlay>,
        mockDocumentContext,
        mockTransformContext
      );

      const unmaskedRects = getRectsWithFill(wrapper, 'black');
      expect(unmaskedRects.length).equals(2);
      expectHeightWidth(unmaskedRects[0], 56, 78);
      expectXY(unmaskedRects[0], 34, 12);
      expectHeightWidth(unmaskedRects[1], 54, 32);
      expectXY(unmaskedRects[1], 76, 98);
    });

    it('renders no 3 rects when 3 children are given', () => {
      const wrapper = mountWithContexts(
        <HighlightOverlay pageIndex={0}>
          <BoundingBox page={0} top={12} left={34} height={56} width={78} />
          <BoundingBox page={0} top={98} left={76} height={54} width={32} />
          <BoundingBox page={0} top={101} left={23} height={45} width={67} />
        </HighlightOverlay>,
        mockDocumentContext,
        mockTransformContext
      );

      const unmaskedRects = getRectsWithFill(wrapper, 'black');
      expect(unmaskedRects.length).equals(3);
      expectHeightWidth(unmaskedRects[0], 56, 78);
      expectXY(unmaskedRects[0], 34, 12);
      expectHeightWidth(unmaskedRects[1], 54, 32);
      expectXY(unmaskedRects[1], 76, 98);
      expectHeightWidth(unmaskedRects[2], 45, 67);
      expectXY(unmaskedRects[2], 23, 101);
    });
  });
});
