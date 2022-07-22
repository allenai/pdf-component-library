import { expect } from 'chai';
import { mount, ReactWrapper } from 'enzyme';
import * as React from 'react';

import { Nullable } from '../../src/components/types/utils';
import { ContextProvider } from '../../src/context/ContextProvider';
import { DocumentContext, IDocumentContext } from '../../src/context/DocumentContext';
import { IScrollContext, ScrollContext } from '../../src/context/ScrollContext';
import { ITransformContext, TransformContext } from '../../src/context/TransformContext';
import { IUiContext, UiContext } from '../../src/context/UiContext';
import MockIntersectionObserver from '../mock/MockIntersectionObserver';

describe('<ContextProvider/>', () => {
  let wrapper: ReactWrapper;
  let documentContextProps: Nullable<IDocumentContext> = null;
  let transformContextProps: Nullable<ITransformContext> = null;
  let uiContextProps: Nullable<IUiContext> = null;
  let scrollContextProps: Nullable<IScrollContext> = null;

  before(() => {
    (global as any).IntersectionObserver = function (...args) {
      const inst = new MockIntersectionObserver(...args);
      return inst;
    };
    wrapper = mount(
      <ContextProvider>
        <DocumentContext.Consumer>
          {(args: IDocumentContext) => {
            documentContextProps = args;
            return null;
          }}
        </DocumentContext.Consumer>
        <TransformContext.Consumer>
          {(args: ITransformContext) => {
            transformContextProps = args;
            return null;
          }}
        </TransformContext.Consumer>
        <UiContext.Consumer>
          {(args: IUiContext) => {
            uiContextProps = args;
            return null;
          }}
        </UiContext.Consumer>
        <ScrollContext.Consumer>
          {(args: IScrollContext) => {
            scrollContextProps = args;
            return null;
          }}
        </ScrollContext.Consumer>
      </ContextProvider>
    );
  });

  after(() => {
    (global as any).IntersectionObserver = undefined;
    wrapper.unmount();
  });

  it('should create a DocumentContext', () => {
    expect(documentContextProps).to.be.ok;
  });

  it('should create a TransformContext', () => {
    expect(transformContextProps).to.be.ok;
  });

  it('should create a UiContext', () => {
    expect(uiContextProps).to.be.ok;
  });

  it('should create a ScrollContext', () => {
    expect(scrollContextProps).to.be.ok;
  });
});
