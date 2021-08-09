import { expect } from 'chai';
import * as React from 'react';

import { PageRotation } from '../rotate';
import { mountWithContexts } from '../testHelper';
import { BoundingBox } from './BoundingBox';
import { Overlay } from './Overlay';
import { IPageSize } from '../context/PageSizeContext';
import { ITransform } from '../context/TransformContext';

describe('<Overlay/>', () => {
  const mockPageSizeContext: IPageSize = {
    pageSize: {
      height: 1056,
      width: 816,
    },
  };

  const mockTransformContext: ITransform = {
    rotation: PageRotation.Rotate0,
    scale: 1.0,
  }

  it('renders on its own without issue', () => {
    mountWithContexts(<Overlay />, mockPageSizeContext, mockTransformContext);
  });

  it('matches the pixel size of the page', () => {
    const wrapper = mountWithContexts(<Overlay />, mockPageSizeContext, mockTransformContext);
    expect(wrapper.getDOMNode().getAttribute('style')).to.include('width: 816px;');
    expect(wrapper.getDOMNode().getAttribute('style')).to.include('height: 1056px;');
  });

  it('responds to page scaling', () => {
    const transformContext = {
      ...mockTransformContext,
      scale: 2.0,
    };
    const wrapper = mountWithContexts(<Overlay />, mockPageSizeContext, transformContext);

    expect(wrapper.getDOMNode().getAttribute('style')).to.include('width: 1632px;');
    expect(wrapper.getDOMNode().getAttribute('style')).to.include('height: 2112px;');
  });

  it('responds to page rotation', () => {
    const transformContext = {
      ...mockTransformContext,
      rotation: PageRotation.Rotate90,
    };
    const wrapper = mountWithContexts(<Overlay />, mockPageSizeContext, transformContext);

    expect(wrapper.getDOMNode().getAttribute('style')).to.include('width: 1056px;');
    expect(wrapper.getDOMNode().getAttribute('style')).to.include('height: 816px;');
  });

  it('renders a BoundingBox', () => {
    const wrapper = mountWithContexts(
      <Overlay>
        <BoundingBox top={192} left={192} height={96} width={96} />
      </Overlay>,
      mockPageSizeContext,
      mockTransformContext
    );

    const bbox = wrapper.find(BoundingBox);
    expect(bbox).to.have.lengthOf(1);
  });
});
