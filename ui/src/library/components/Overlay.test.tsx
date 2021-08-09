import { expect } from 'chai';
import * as React from 'react';

import { PageRotation } from '../rotate';
import { mountWithContexts } from '../testHelper';
import { BoundingBox } from './BoundingBox';
import { Overlay } from './Overlay';
import { IDocumentContext } from '../context/DocumentContext';
import { ITransformContext } from '../context/TransformContext';
import { Size } from '../scale';

describe('<Overlay/>', () => {
  const mockDocumentContext: IDocumentContext = {
    numPages: 2,
    pageSize: {
      height: 1056,
      width: 816,
    },
    setNumPages: (numPages: number) => { },
    setPageSize: (pageSize: Size) => { },
  };

  const mockTransformContext: ITransformContext = {
    rotation: PageRotation.Rotate0,
    scale: 1.0,
    setRotation: (rotation: PageRotation) => { },
    setScale: (scale: number) => { },
  }

  it('renders on its own without issue', () => {
    mountWithContexts(<Overlay />, mockDocumentContext, mockTransformContext);
  });

  it('matches the pixel size of the page', () => {
    const wrapper = mountWithContexts(<Overlay />, mockDocumentContext, mockTransformContext);
    expect(wrapper.getDOMNode().getAttribute('style')).to.include('width: 816px;');
    expect(wrapper.getDOMNode().getAttribute('style')).to.include('height: 1056px;');
  });

  it('responds to page scaling', () => {
    const transformContext = {
      ...mockTransformContext,
      scale: 2.0,
    };
    const wrapper = mountWithContexts(<Overlay />, mockDocumentContext, transformContext);

    expect(wrapper.getDOMNode().getAttribute('style')).to.include('width: 1632px;');
    expect(wrapper.getDOMNode().getAttribute('style')).to.include('height: 2112px;');
  });

  it('responds to page rotation', () => {
    const transformContext = {
      ...mockTransformContext,
      rotation: PageRotation.Rotate90,
    };
    const wrapper = mountWithContexts(<Overlay />, mockDocumentContext, transformContext);

    expect(wrapper.getDOMNode().getAttribute('style')).to.include('width: 1056px;');
    expect(wrapper.getDOMNode().getAttribute('style')).to.include('height: 816px;');
  });

  it('renders a BoundingBox', () => {
    const wrapper = mountWithContexts(
      <Overlay>
        <BoundingBox top={192} left={192} height={96} width={96} />
      </Overlay>,
      mockDocumentContext,
      mockTransformContext
    );

    const bbox = wrapper.find(BoundingBox);
    expect(bbox).to.have.lengthOf(1);
  });
});
