import { expect } from 'chai';
import * as React from 'react';
import * as sinon from 'sinon';

import { BoundingBox } from '../../src/components/BoundingBox';
import { IDocumentContext } from '../../src/context/DocumentContext';
import { ITransformContext } from '../../src/context/TransformContext';
import { Dimensions } from '../../src/types';
import { PageRotation } from '../../src/utils/rotate';
import { mountWithContexts } from '../testHelper';

describe('<BoundingBox/>', () => {
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

  it('renders at the right spot when rotated at 0 degrees', () => {
    const wrapper = mountWithContexts(
      <BoundingBox page={0} top={192} left={192} height={96} width={96} />,
      mockDocumentContext,
      mockTransformContext
    );

    const boundingBox = wrapper.getDOMNode();

    const boxUnderline = boundingBox[0];

    const box = boundingBox[1];

    expect(boxUnderline).to.have.property(
      'className',
      'reader__page-overlay__bounding-box-underline rotate0'
    );

    expect(boxUnderline.getAttribute('style')).to.include('top: 192px;');
    expect(boxUnderline.getAttribute('style')).to.include('left: 192px;');
    expect(boxUnderline.getAttribute('style')).to.include('height: 96px;');
    expect(boxUnderline.getAttribute('style')).to.include('width: 96px;');

    expect(box).to.have.property('className', 'reader__page-overlay__bounding-box rotate0');

    expect(box.getAttribute('style')).to.include('top: 192px;');
    expect(box.getAttribute('style')).to.include('left: 192px;');
    expect(box.getAttribute('style')).to.include('height: 96px;');
    expect(box.getAttribute('style')).to.include('width: 96px;');
  });

  it('renders at the right spot when rotated 90 degrees', () => {
    const wrapper = mountWithContexts(
      <BoundingBox page={0} top={192} left={96} height={96} width={192} />,
      mockDocumentContext,
      {
        ...mockTransformContext,
        rotation: PageRotation.Rotate90,
      }
    );

    const boundingBox = wrapper.getDOMNode();

    const boxUnderline = boundingBox[0];

    const box = boundingBox[1];

    expect(boxUnderline).to.have.property(
      'className',
      'reader__page-overlay__bounding-box-underline rotate90'
    );

    expect(boxUnderline.getAttribute('style')).to.include('top: 96px;');
    expect(boxUnderline.getAttribute('style')).to.include('left: 768px;');
    expect(boxUnderline.getAttribute('style')).to.include('height: 192px;');
    expect(boxUnderline.getAttribute('style')).to.include('width: 96px;');

    expect(box).to.have.property('className', 'reader__page-overlay__bounding-box rotate90');

    expect(box.getAttribute('style')).to.include('top: 96px;');
    expect(box.getAttribute('style')).to.include('left: 768px;');
    expect(box.getAttribute('style')).to.include('height: 192px;');
    expect(box.getAttribute('style')).to.include('width: 96px;');
  });

  it('renders at the right spot when rotated 180 degrees', () => {
    const wrapper = mountWithContexts(
      <BoundingBox page={0} top={192} left={96} height={96} width={192} />,
      mockDocumentContext,
      {
        ...mockTransformContext,
        rotation: PageRotation.Rotate180,
      }
    );

    const boundingBox = wrapper.getDOMNode();

    const boxUnderline = boundingBox[0];

    const box = boundingBox[1];

    expect(boxUnderline).to.have.property(
      'className',
      'reader__page-overlay__bounding-box-underline rotate180'
    );

    expect(boxUnderline.getAttribute('style')).to.include('top: 768px;');
    expect(boxUnderline.getAttribute('style')).to.include('left: 528px;');
    expect(boxUnderline.getAttribute('style')).to.include('height: 96px;');
    expect(boxUnderline.getAttribute('style')).to.include('width: 192px;');

    expect(box).to.have.property('className', 'reader__page-overlay__bounding-box rotate180');

    expect(box.getAttribute('style')).to.include('top: 768px;');
    expect(box.getAttribute('style')).to.include('left: 528px;');
    expect(box.getAttribute('style')).to.include('height: 96px;');
    expect(box.getAttribute('style')).to.include('width: 192px;');
  });

  it('renders at the right spot when rotated 270 degrees', () => {
    const wrapper = mountWithContexts(
      <BoundingBox page={0} top={192} left={96} height={96} width={192} />,
      mockDocumentContext,
      {
        ...mockTransformContext,
        rotation: PageRotation.Rotate270,
      }
    );

    const boundingBox = wrapper.getDOMNode();

    const boxUnderline = boundingBox[0];

    const box = boundingBox[1];

    expect(boxUnderline).to.have.property(
      'className',
      'reader__page-overlay__bounding-box-underline rotate270'
    );

    expect(boxUnderline.getAttribute('style')).to.include('top: 528px;');
    expect(boxUnderline.getAttribute('style')).to.include('left: 192px;');
    expect(boxUnderline.getAttribute('style')).to.include('height: 192px;');
    expect(boxUnderline.getAttribute('style')).to.include('width: 96px;');

    expect(box).to.have.property('className', 'reader__page-overlay__bounding-box rotate270');

    expect(box.getAttribute('style')).to.include('top: 528px;');
    expect(box.getAttribute('style')).to.include('left: 192px;');
    expect(box.getAttribute('style')).to.include('height: 192px;');
    expect(box.getAttribute('style')).to.include('width: 96px;');
  });

  it('responds to page scaling', () => {
    const transformContext = {
      ...mockTransformContext,
      scale: 2.0,
    };
    const wrapper = mountWithContexts(
      <BoundingBox page={0} top={192} left={192} height={96} width={96} />,
      mockDocumentContext,
      transformContext
    );

    const boundingBox = wrapper.getDOMNode();

    const box = boundingBox[1];

    expect(box.getAttribute('style')).to.include('top: 384px;');
    expect(box.getAttribute('style')).to.include('left: 384px;');
    expect(box.getAttribute('style')).to.include('height: 192px;');
    expect(box.getAttribute('style')).to.include('width: 192px;');
  });

  it('can do something when clicked', () => {
    const spy = sinon.spy();
    const wrapper = mountWithContexts(
      <BoundingBox page={0} top={192} left={192} height={96} width={96} onClick={spy} />,
      mockDocumentContext,
      mockTransformContext
    );

    wrapper.find('.reader__page-overlay__bounding-box').simulate('click');
    expect(spy.called).to.equal(true);
  });
});
