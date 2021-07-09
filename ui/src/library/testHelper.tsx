/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { mount } from 'enzyme';
import * as React from 'react';
import * as sinon from 'sinon';

import { PageSizeContext, PageSizeContextData } from './components/PageSizeContext';

export function mountWithPageSizeContext(component: React.ReactNode, context: PageSizeContextData) {
  return mount(<PageSizeContext.Provider value={context}>{component}</PageSizeContext.Provider>);
}

export const mochaHooks = {
  afterEach() {
    sinon.restore();
  },
};
