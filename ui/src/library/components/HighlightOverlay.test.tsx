import { expect } from 'chai';
import * as React from 'react';

import { mountWithPageSizeContext } from '../testHelper';
import { BoundingBox } from './BoundingBox';
import { HighlightOverlay } from './HighlightOverlay';
import { PageSizeContextData } from './PageSizeContext';

describe('<HighlightOverlay/>', () => {
  const mockContext: PageSizeContextData = {
    pageSize: {
      height: 1056,
      width: 816,
    },
    scale: 1.0,
  };

  function getRectsWithFill(
    component: React.ReactComponentElement,
    fillColor: string
  ): Array<React.DOMElement> {
    const rects = component.getDOMNode().getElementsByTagName('rect');
    return Object.values(rects).filter((rect: React.DOMElement) => {
      if (rect.getAttribute('fill') == fillColor) {
        return true;
      }
    });
  }

  function expectHeightWidth(element: React.DOMElement, height: number, width: number): void {
    expect(element.getAttribute('style')).to.include(`height: ${height}px;`);
    expect(element.getAttribute('style')).to.include(`width: ${width}px;`);
  }

  function expectXY(element: React.DOMElement, x: number, y: number): void {
    expect(element.style.x).equals(`${x}px`);
    expect(element.style.y).equals(`${y}px`);
  }

  it('renders on its own without issue', () => {
    mountWithPageSizeContext(<HighlightOverlay pageNumber="1" />, mockContext);
  });

  it('sets mask ID based on page number', () => {
    const wrapper = mountWithPageSizeContext(<HighlightOverlay pageNumber="345" />, mockContext);

    expect(wrapper.getDOMNode().getElementsByTagName('mask')[0].id).equals(
      'highlight-overlay-mask-345'
    );
  });

  describe('pixel size', () => {
    it('matches the pixel size of the page [outer wrapper div]', () => {
      const wrapper = mountWithPageSizeContext(<HighlightOverlay pageNumber="1" />, mockContext);

      expectHeightWidth(
        wrapper.getDOMNode(),
        mockContext.pageSize.height,
        mockContext.pageSize.width
      );
    });

    it('matches the pixel size of the page [SVG element]', () => {
      const wrapper = mountWithPageSizeContext(<HighlightOverlay pageNumber="1" />, mockContext);
      const svg = wrapper.getDOMNode().getElementsByTagName('svg')[0];

      expectHeightWidth(svg, mockContext.pageSize.height, mockContext.pageSize.width);
    });

    it('matches the pixel size of the page [masked rect elements]', () => {
      const wrapper = mountWithPageSizeContext(<HighlightOverlay pageNumber="1" />, mockContext);
      const maskedRects = getRectsWithFill(wrapper, 'white');

      expect(maskedRects.length).equals(2);
      expectHeightWidth(maskedRects[0], mockContext.pageSize.height, mockContext.pageSize.width);
      expectHeightWidth(maskedRects[1], mockContext.pageSize.height, mockContext.pageSize.width);
    });
  });

  describe('page scaling', () => {
    it('responds to page scaling [outer wrapper div]', () => {
      const context = {
        ...mockContext,
        scale: 2.0,
      };
      const wrapper = mountWithPageSizeContext(<HighlightOverlay pageNumber="1" />, context);

      expectHeightWidth(
        wrapper.getDOMNode(),
        mockContext.pageSize.height * context.scale,
        mockContext.pageSize.width * context.scale
      );
    });

    it('responds to page scaling [SVG element]', () => {
      const context = {
        ...mockContext,
        scale: 2.0,
      };
      const wrapper = mountWithPageSizeContext(<HighlightOverlay pageNumber="1" />, context);
      const svg = wrapper.getDOMNode().getElementsByTagName('svg')[0];

      expectHeightWidth(
        svg,
        mockContext.pageSize.height * context.scale,
        mockContext.pageSize.width * context.scale
      );
    });

    it('responds to page scaling [masked rect elements]', () => {
      const context = {
        ...mockContext,
        scale: 2.0,
      };
      const wrapper = mountWithPageSizeContext(<HighlightOverlay pageNumber="1" />, context);
      const maskedRects = getRectsWithFill(wrapper, 'white');

      expect(maskedRects.length).equals(2);
      expectHeightWidth(
        maskedRects[0],
        mockContext.pageSize.height * context.scale,
        mockContext.pageSize.width * context.scale
      );
      expectHeightWidth(
        maskedRects[1],
        mockContext.pageSize.height * context.scale,
        mockContext.pageSize.width * context.scale
      );
    });
  });

  describe('rendering unmasked content', () => {
    it('renders no unmasked rects when no children are given', () => {
      const wrapper = mountWithPageSizeContext(<HighlightOverlay pageNumber="1" />, mockContext);
      const unmaskedRects = getRectsWithFill(wrapper, 'black');

      expect(unmaskedRects.length).equals(0);
    });

    it('renders 1 unmasked rect when 1 child is given', () => {
      const wrapper = mountWithPageSizeContext(
        <HighlightOverlay pageNumber="1">
          <BoundingBox top={12} left={34} height={56} width={78} />
        </HighlightOverlay>,
        mockContext
      );

      const unmaskedRects = getRectsWithFill(wrapper, 'black');
      expect(unmaskedRects.length).equals(1);
      expectHeightWidth(unmaskedRects[0], 56, 78);
      expectXY(unmaskedRects[0], 34, 12);
    });

    it('renders 2 unmasked rects when 2 children are given', () => {
      const wrapper = mountWithPageSizeContext(
        <HighlightOverlay pageNumber="1">
          <BoundingBox top={12} left={34} height={56} width={78} />
          <BoundingBox top={98} left={76} height={54} width={32} />
        </HighlightOverlay>,
        mockContext
      );

      const unmaskedRects = getRectsWithFill(wrapper, 'black');
      expect(unmaskedRects.length).equals(2);
      expectHeightWidth(unmaskedRects[0], 56, 78);
      expectXY(unmaskedRects[0], 34, 12);
      expectHeightWidth(unmaskedRects[1], 54, 32);
      expectXY(unmaskedRects[1], 76, 98);
    });

    it('renders no 3 rects when 3 children are given', () => {
      const wrapper = mountWithPageSizeContext(
        <HighlightOverlay pageNumber="1">
          <BoundingBox top={12} left={34} height={56} width={78} />
          <BoundingBox top={98} left={76} height={54} width={32} />
          <BoundingBox top={101} left={23} height={45} width={67} />
        </HighlightOverlay>,
        mockContext
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
