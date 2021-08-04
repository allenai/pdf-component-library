import { expect } from 'chai';
import * as React from 'react';

import { PageRotation } from '../rotate';
import { PdfPixelSize } from '../scale';
import { mountWithPageSizeContext } from '../testHelper';
import { BoundingBox } from './BoundingBox';
import { Overlay } from './Overlay';
import { PageSizeContextData } from './PageSizeContext';

describe('<Overlay/>', () => {
  const mockContext: PageSizeContextData = {
    pageSize: {
      height: 1056,
      width: 816,
    },
    scale: 1.0,
    rotation: PageRotation.Rotate0,
    setPageSize: (pageSize: PdfPixelSize) => {
      return pageSize;
    },
    setRotation: (rotation: PageRotation) => {
      return rotation;
    },
    setScale: (scale: number) => {
      return scale;
    },
  };

  it('renders on its own without issue', () => {
    mountWithPageSizeContext(<Overlay />, mockContext);
  });

  it('matches the pixel size of the page', () => {
    const wrapper = mountWithPageSizeContext(<Overlay />, mockContext);
    expect(wrapper.getDOMNode().getAttribute('style')).to.include('width: 816px;');
    expect(wrapper.getDOMNode().getAttribute('style')).to.include('height: 1056px;');
  });

  it('responds to page scaling', () => {
    const context = {
      ...mockContext,
      scale: 2.0,
    };
    const wrapper = mountWithPageSizeContext(<Overlay />, context);

    expect(wrapper.getDOMNode().getAttribute('style')).to.include('width: 1632px;');
    expect(wrapper.getDOMNode().getAttribute('style')).to.include('height: 2112px;');
  });

  it('responds to page rotation', () => {
    const context = {
      ...mockContext,
      rotation: PageRotation.Rotate90,
    };
    const wrapper = mountWithPageSizeContext(<Overlay />, context);

    expect(wrapper.getDOMNode().getAttribute('style')).to.include('width: 1056px;');
    expect(wrapper.getDOMNode().getAttribute('style')).to.include('height: 816px;');
  });

  it('renders a BoundingBox', () => {
    const wrapper = mountWithPageSizeContext(
      <Overlay>
        <BoundingBox top={192} left={192} height={96} width={96} />
      </Overlay>,
      mockContext
    );

    const bbox = wrapper.find(BoundingBox);
    expect(bbox).to.have.lengthOf(1);
  });
});
