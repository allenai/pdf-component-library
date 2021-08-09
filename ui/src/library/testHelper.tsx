/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { expect } from 'chai';
import { mount } from 'enzyme';
import * as React from 'react';
import * as sinon from 'sinon';

import { PageSizeContext, PageSizeContextData } from './context/PageSizeContext';
import { ITransform, TransformContext } from './context/TransformContext';

export function expectHeightWidth(element: Element, height: number, width: number): void {
  expect(element.getAttribute('style')).to.include(`height: ${height}px;`);
  expect(element.getAttribute('style')).to.include(`width: ${width}px;`);
}

export function expectLeftTop(element: Element, left: number, top: number): void {
  expect(element.getAttribute('style')).to.include(`left: ${left}px;`);
  expect(element.getAttribute('style')).to.include(`top: ${top}px;`);
}

export function mountWithContexts(component: React.ReactNode, pageSizeContext: PageSizeContextData, transformContext: ITransform) {
  return mount(<PageSizeContext.Provider value={pageSizeContext}>
    <TransformContext.Provider value={transformContext}>
      {component}
    </TransformContext.Provider>
  </PageSizeContext.Provider>);
}

export const mochaHooks = {
  afterEach() {
    sinon.restore();
  },
};
