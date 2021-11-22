import { expect } from 'chai';
import * as React from 'react';

import { BoundingBox } from '../../src/components/BoundingBox';
import { Overlay } from '../../src/components/Overlay';
import { IDocumentContext } from '../../src/context/DocumentContext';
import { ITransformContext } from '../../src/context/TransformContext';
import { Dimensions } from '../../src/types';
import { PageRotation } from '../../src/utils/rotate';
import { mountWithContexts } from '../testHelper';

describe('<Overlay/>', () => {
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
        <BoundingBox page={0} top={192} left={192} height={96} width={96} />
      </Overlay>,
      mockDocumentContext,
      mockTransformContext
    );

    const bbox = wrapper.find(BoundingBox);
    expect(bbox).to.have.lengthOf(1);
  });
});
