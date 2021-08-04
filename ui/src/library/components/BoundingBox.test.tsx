import { expect } from 'chai';
import * as React from 'react';
import * as sinon from 'sinon';

import { PageRotation } from '../rotate';
import { PdfPixelSize } from '../scale';
import { mountWithPageSizeContext } from '../testHelper';
import { BoundingBox } from './BoundingBox';
import { PageSizeContextData } from './PageSizeContext';

describe('<BoundingBox/>', () => {
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

  it('renders at the right spot when rotated at 0 degrees', () => {
    const wrapper = mountWithPageSizeContext(
      <BoundingBox top={192} left={192} height={96} width={96} />,
      mockContext
    );

    expect(wrapper.getDOMNode()).to.have.property(
      'className',
      'reader__page-overlay__bounding-box'
    );
    expect(wrapper.getDOMNode().getAttribute('style')).to.include('top: 192px;');
    expect(wrapper.getDOMNode().getAttribute('style')).to.include('left: 192px;');
    expect(wrapper.getDOMNode().getAttribute('style')).to.include('height: 96px;');
    expect(wrapper.getDOMNode().getAttribute('style')).to.include('width: 96px;');
  });

  it('renders at the right spot when rotated 90 degrees', () => {
    const wrapper = mountWithPageSizeContext(
      <BoundingBox top={192} left={96} height={96} width={192} />,
      {
        ...mockContext,
        rotation: PageRotation.Rotate90,
      }
    );

    expect(wrapper.getDOMNode()).to.have.property(
      'className',
      'reader__page-overlay__bounding-box'
    );
    expect(wrapper.getDOMNode().getAttribute('style')).to.include('top: 96px;');
    expect(wrapper.getDOMNode().getAttribute('style')).to.include('left: 768px;');
    expect(wrapper.getDOMNode().getAttribute('style')).to.include('height: 192px;');
    expect(wrapper.getDOMNode().getAttribute('style')).to.include('width: 96px;');
  });

  it('renders at the right spot when rotated 180 degrees', () => {
    const wrapper = mountWithPageSizeContext(
      <BoundingBox top={192} left={96} height={96} width={192} />,
      {
        ...mockContext,
        rotation: PageRotation.Rotate180,
      }
    );

    expect(wrapper.getDOMNode()).to.have.property(
      'className',
      'reader__page-overlay__bounding-box'
    );
    expect(wrapper.getDOMNode().getAttribute('style')).to.include('top: 768px;');
    expect(wrapper.getDOMNode().getAttribute('style')).to.include('left: 528px;');
    expect(wrapper.getDOMNode().getAttribute('style')).to.include('height: 96px;');
    expect(wrapper.getDOMNode().getAttribute('style')).to.include('width: 192px;');
  });

  it('renders at the right spot when rotated 270 degrees', () => {
    const wrapper = mountWithPageSizeContext(
      <BoundingBox top={192} left={96} height={96} width={192} />,
      {
        ...mockContext,
        rotation: PageRotation.Rotate270,
      }
    );

    expect(wrapper.getDOMNode()).to.have.property(
      'className',
      'reader__page-overlay__bounding-box'
    );
    expect(wrapper.getDOMNode().getAttribute('style')).to.include('top: 528px;');
    expect(wrapper.getDOMNode().getAttribute('style')).to.include('left: 192px;');
    expect(wrapper.getDOMNode().getAttribute('style')).to.include('height: 192px;');
    expect(wrapper.getDOMNode().getAttribute('style')).to.include('width: 96px;');
  });

  it('responds to page scaling', () => {
    const context = {
      ...mockContext,
      scale: 2.0,
    };
    const wrapper = mountWithPageSizeContext(
      <BoundingBox top={192} left={192} height={96} width={96} />,
      context
    );

    expect(wrapper.getDOMNode().getAttribute('style')).to.include('top: 384px;');
    expect(wrapper.getDOMNode().getAttribute('style')).to.include('left: 384px;');
    expect(wrapper.getDOMNode().getAttribute('style')).to.include('height: 192px;');
    expect(wrapper.getDOMNode().getAttribute('style')).to.include('width: 192px;');
  });

  it('can do something when clicked', () => {
    const spy = sinon.spy();
    const wrapper = mountWithPageSizeContext(
      <BoundingBox top={192} left={192} height={96} width={96} onClick={spy} />,
      mockContext
    );

    wrapper.simulate('click');
    expect(spy.called).to.equal(true);
  });
});
