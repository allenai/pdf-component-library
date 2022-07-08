import { expect } from 'chai';
import { mount, ReactWrapper } from 'enzyme';
import * as React from 'react';

import { Nullable } from '../../src/components/types/utils';
import { ContextProvider } from '../../src/context/ContextProvider';
import { DocumentContext, IDocumentContext } from '../../src/context/DocumentContext';
import { ITransformContext, TransformContext } from '../../src/context/TransformContext';
import { IUiContext, UiContext } from '../../src/context/UiContext';

describe('<ContextProvider/>', () => {
  let wrapper: ReactWrapper;
  let documentContextProps: Nullable<IDocumentContext> = null;
  let transformContextProps: Nullable<ITransformContext> = null;
  let uiContextProps: Nullable<IUiContext> = null;

  beforeEach(() => {
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
      </ContextProvider>
    );
  });

  afterEach(() => {
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
});
