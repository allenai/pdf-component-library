import { expect } from 'chai';
import * as React from 'react';
import * as sinon from 'sinon';

import { IDocumentContext } from '../context/DocumentContext';
import { ITransformContext } from '../context/TransformContext';
import { PageRotation } from '../rotate';
import { Size } from '../scale';
import { mountWithContexts } from '../testHelper';
import { BoundingBox } from './BoundingBox';

describe('<BoundingBox/>', () => {
  const mockDocumentContext: IDocumentContext = {
    numPages: 2,
    pageSize: {
      height: 1056,
      width: 816,
    },
    setNumPages: (numPages: number) => {
      return numPages;
    },
    setPageSize: (pageSize: Size) => {
      return pageSize;
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

  it('renders at the right spot when rotated at 0 degrees', () => {
    const wrapper = mountWithContexts(
      <BoundingBox top={192} left={192} height={96} width={96} />,
      mockDocumentContext,
      mockTransformContext
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
    const wrapper = mountWithContexts(
      <BoundingBox top={192} left={96} height={96} width={192} />,
      mockDocumentContext,
      {
        ...mockTransformContext,
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
    const wrapper = mountWithContexts(
      <BoundingBox top={192} left={96} height={96} width={192} />,
      mockDocumentContext,
      {
        ...mockTransformContext,
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
    const wrapper = mountWithContexts(
      <BoundingBox top={192} left={96} height={96} width={192} />,
      mockDocumentContext,
      {
        ...mockTransformContext,
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
    const transformContext = {
      ...mockTransformContext,
      scale: 2.0,
    };
    const wrapper = mountWithContexts(
      <BoundingBox top={192} left={192} height={96} width={96} />,
      mockDocumentContext,
      transformContext
    );

    expect(wrapper.getDOMNode().getAttribute('style')).to.include('top: 384px;');
    expect(wrapper.getDOMNode().getAttribute('style')).to.include('left: 384px;');
    expect(wrapper.getDOMNode().getAttribute('style')).to.include('height: 192px;');
    expect(wrapper.getDOMNode().getAttribute('style')).to.include('width: 192px;');
  });

  it('can do something when clicked', () => {
    const spy = sinon.spy();
    const wrapper = mountWithContexts(
      <BoundingBox top={192} left={192} height={96} width={96} onClick={spy} />,
      mockDocumentContext,
      mockTransformContext
    );

    wrapper.simulate('click');
    expect(spy.called).to.equal(true);
  });
});
