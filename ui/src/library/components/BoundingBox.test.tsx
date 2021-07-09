import { expect } from 'chai';
import * as React from 'react';
import * as sinon from 'sinon';

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
  };

  it('renders at the right spot', () => {
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
