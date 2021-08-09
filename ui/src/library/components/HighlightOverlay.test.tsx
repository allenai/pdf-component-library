import { expect } from 'chai';
import { ReactWrapper } from 'enzyme';
import * as React from 'react';

import { PageRotation } from '../rotate';
import { expectHeightWidth, expectLeftTop, mountWithContexts } from '../testHelper';
import { BoundingBox } from './BoundingBox';
import { HighlightOverlay } from './HighlightOverlay';
import { IDocument } from '../context/DocumentContext';
import { ITransform } from '../context/TransformContext';

describe('<HighlightOverlay/>', () => {
  const mockDocumentContext: IDocument = {
    numPages: 2,
    pageSize: {
      height: 1056,
      width: 816,
    },
  };
  const mockTransformContext: ITransform = {
    scale: 1.0,
    rotation: PageRotation.Rotate0,
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
    mountWithContexts(<HighlightOverlay pageNumber={1} />, mockDocumentContext, mockTransformContext);
  });

  it('sets mask ID based on page number', () => {
    const wrapper = mountWithContexts(<HighlightOverlay pageNumber={345} />, mockDocumentContext, mockTransformContext);

    expect(wrapper.getDOMNode().getElementsByTagName('mask')[0].id).equals(
      'highlight-overlay-mask-345'
    );
  });

  describe('pixel size', () => {
    it('matches the pixel size of the page [outer wrapper div]', () => {
      const wrapper = mountWithContexts(<HighlightOverlay pageNumber={1} />, mockDocumentContext, mockTransformContext);

      expectHeightWidth(
        wrapper.getDOMNode(),
        mockDocumentContext.pageSize.height,
        mockDocumentContext.pageSize.width
      );
    });

    it('matches the pixel size of the page [SVG element]', () => {
      const wrapper = mountWithContexts(<HighlightOverlay pageNumber={1} />, mockDocumentContext, mockTransformContext);
      const svg = wrapper.getDOMNode().getElementsByTagName('svg')[0];

      expectHeightWidth(svg, mockDocumentContext.pageSize.height, mockDocumentContext.pageSize.width);
    });

    it('matches the pixel size of the page [masked rect elements]', () => {
      const wrapper = mountWithContexts(<HighlightOverlay pageNumber={1} />, mockDocumentContext, mockTransformContext);
      const maskedRects = getRectsWithFill(wrapper, 'white');

      expect(maskedRects.length).equals(2);
      expectHeightWidth(maskedRects[0], mockDocumentContext.pageSize.height, mockDocumentContext.pageSize.width);
      expectHeightWidth(maskedRects[1], mockDocumentContext.pageSize.height, mockDocumentContext.pageSize.width);
    });
  });

  describe('page scaling', () => {
    const transformContext = {
      ...mockTransformContext,
      scale: 2.0,
    };

    it('responds to page scaling [outer wrapper div]', () => {
      const wrapper = mountWithContexts(<HighlightOverlay pageNumber={1} />, mockDocumentContext, transformContext);

      expectLeftTop(wrapper.getDOMNode(), 0, 0);
      expectHeightWidth(
        wrapper.getDOMNode(),
        mockDocumentContext.pageSize.height * transformContext.scale,
        mockDocumentContext.pageSize.width * transformContext.scale
      );
    });

    it('responds to page scaling [SVG element]', () => {
      const wrapper = mountWithContexts(<HighlightOverlay pageNumber={1} />, mockDocumentContext, transformContext);
      const svg = wrapper.getDOMNode().getElementsByTagName('svg')[0];

      expectLeftTop(svg, 0, 0);
      expectHeightWidth(
        svg,
        mockDocumentContext.pageSize.height * transformContext.scale,
        mockDocumentContext.pageSize.width * transformContext.scale
      );
    });

    it('responds to page scaling [masked rect elements]', () => {
      const wrapper = mountWithContexts(<HighlightOverlay pageNumber={1} />, mockDocumentContext, transformContext);
      const maskedRects = getRectsWithFill(wrapper, 'white');

      expect(maskedRects.length).equals(2);
      expectLeftTop(maskedRects[0], 0, 0);
      expectHeightWidth(
        maskedRects[0],
        mockDocumentContext.pageSize.height * transformContext.scale,
        mockDocumentContext.pageSize.width * transformContext.scale
      );
      expectLeftTop(maskedRects[1], 0, 0);
      expectHeightWidth(
        maskedRects[1],
        mockDocumentContext.pageSize.height * transformContext.scale,
        mockDocumentContext.pageSize.width * transformContext.scale
      );
    });
  });

  describe('page rotation', () => {
    const transformContext = {
      ...mockTransformContext,
      rotation: PageRotation.Rotate90,
    };

    it('responds to page rotation [outer wrapper div]', () => {
      const wrapper = mountWithContexts(<HighlightOverlay pageNumber={1} />, mockDocumentContext, transformContext);

      expectLeftTop(wrapper.getDOMNode(), 0, 0);
      expectHeightWidth(
        wrapper.getDOMNode(),
        mockDocumentContext.pageSize.width,
        mockDocumentContext.pageSize.height
      );
    });

    it('responds to page rotation [SVG element]', () => {
      const wrapper = mountWithContexts(<HighlightOverlay pageNumber={1} />, mockDocumentContext, transformContext);
      const svg = wrapper.getDOMNode().getElementsByTagName('svg')[0];

      expectLeftTop(svg, 0, 0);
      expectHeightWidth(svg, mockDocumentContext.pageSize.width, mockDocumentContext.pageSize.height);
    });

    it('responds to page rotation [masked rect elements]', () => {
      const wrapper = mountWithContexts(<HighlightOverlay pageNumber={1} />, mockDocumentContext, transformContext);
      const maskedRects = getRectsWithFill(wrapper, 'white');

      expect(maskedRects.length).equals(2);
      expectLeftTop(maskedRects[0], 0, 0);
      expectHeightWidth(maskedRects[0], mockDocumentContext.pageSize.width, mockDocumentContext.pageSize.height);
      expectLeftTop(maskedRects[1], 0, 0);
      expectHeightWidth(maskedRects[1], mockDocumentContext.pageSize.width, mockDocumentContext.pageSize.height);
    });
  });

  describe('rendering unmasked content', () => {
    it('renders no unmasked rects when no children are given', () => {
      const wrapper = mountWithContexts(<HighlightOverlay pageNumber={1} />, mockDocumentContext, mockTransformContext);
      const unmaskedRects = getRectsWithFill(wrapper, 'black');

      expect(unmaskedRects.length).equals(0);
    });

    it('renders 1 unmasked rect when 1 child is given', () => {
      const wrapper = mountWithContexts(
        <HighlightOverlay pageNumber={1}>
          <BoundingBox top={12} left={34} height={56} width={78} />
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
        <HighlightOverlay pageNumber={1}>
          <BoundingBox top={12} left={34} height={56} width={78} />
          <BoundingBox top={98} left={76} height={54} width={32} />
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
        <HighlightOverlay pageNumber={1}>
          <BoundingBox top={12} left={34} height={56} width={78} />
          <BoundingBox top={98} left={76} height={54} width={32} />
          <BoundingBox top={101} left={23} height={45} width={67} />
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
