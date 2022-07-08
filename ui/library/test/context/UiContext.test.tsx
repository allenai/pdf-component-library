import { expect } from 'chai';
import { mount, ReactWrapper } from 'enzyme';
import * as React from 'react';

import { Nullable } from '../../src/components/types/utils';
import { IUiContext, UiContext, useUiContextProps } from '../../src/context/UiContext';

describe('<UiContext/>', () => {
  let wrapper: ReactWrapper;

  function expectTextFromClassName(className: string, value: string | number | boolean | null) {
    const actual = wrapper.find(`.${className}`).text();
    const message = `Expected text for element with class .${className} to be ${value} instead of ${actual}`;
    expect(actual).equals(`${value}`, message);
  }

  function UseContext({ children }: any) {
    const contextProps = useUiContextProps();
    return <UiContext.Provider value={contextProps}>{children}</UiContext.Provider>;
  }

  let _setErrorMessage: (errorMessage: Nullable<string>) => void;
  let _setIsShowingOutline: (isShowingOutline: boolean) => void;
  let _setIsLoading: (isLoading: boolean) => void;
  let _setIsShowingHighlightOverlay: (isShowingHighlightOverlay: boolean) => void;
  let _setIsShowingTextHighlight: (isShowingTextHighlight: boolean) => void;

  beforeEach(() => {
    wrapper = mount(
      <UseContext>
        <UiContext.Consumer>
          {(args: IUiContext) => {
            const {
              errorMessage,
              isShowingOutline,
              isLoading,
              isShowingHighlightOverlay,
              isShowingTextHighlight,
              setErrorMessage,
              setIsShowingOutline,
              setIsLoading,
              setIsShowingHighlightOverlay,
              setIsShowingTextHighlight,
            } = args;
            _setErrorMessage = setErrorMessage;
            _setIsShowingOutline = setIsShowingOutline;
            _setIsLoading = setIsLoading;
            _setIsShowingHighlightOverlay = setIsShowingHighlightOverlay;
            _setIsShowingTextHighlight = setIsShowingTextHighlight;
            return (
              <div>
                <div className="errorMessage">{errorMessage === null ? 'null' : errorMessage}</div>
                <div className="isLoading">{isLoading.toString()}</div>
                <div className="isShowingHighlightOverlay">
                  {isShowingHighlightOverlay.toString()}
                </div>
                <div className="isShowingOutline">{isShowingOutline.toString()}</div>
                <div className="isShowingTextHighlight">{isShowingTextHighlight.toString()}</div>
              </div>
            );
          }}
        </UiContext.Consumer>
      </UseContext>
    );
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('provides a default errorMessage === null', () => {
    expectTextFromClassName('errorMessage', null);
  });

  it('provides a default isShowingOutline', () => {
    expectTextFromClassName('isShowingOutline', false);
  });

  it('provides a default isLoading', () => {
    expectTextFromClassName('isLoading', true);
  });

  it('provides a default isShowingHighlightOverlay', () => {
    expectTextFromClassName('isShowingHighlightOverlay', false);
  });

  it('provides a default isShowingTextHighlight', () => {
    expectTextFromClassName('isShowingTextHighlight', false);
  });

  it('provides a function to set errorMessage', () => {
    expectTextFromClassName('errorMessage', null);

    _setErrorMessage('Test message');

    expectTextFromClassName('errorMessage', 'Test message');
  });

  it('provides a function to set isShowingOutline', () => {
    expectTextFromClassName('isShowingOutline', false);

    _setIsShowingOutline(true);

    expectTextFromClassName('isShowingOutline', true);
  });

  it('provides a function to set isLoading', () => {
    expectTextFromClassName('isLoading', true);

    _setIsLoading(false);

    expectTextFromClassName('isLoading', false);
  });

  it('provides a function to set isShowingHighlightOverlay', () => {
    expectTextFromClassName('isShowingHighlightOverlay', false);

    _setIsShowingHighlightOverlay(true);

    expectTextFromClassName('isShowingHighlightOverlay', true);
  });

  it('provides a function to set isShowingTextHighlight', () => {
    expectTextFromClassName('isShowingTextHighlight', false);

    _setIsShowingTextHighlight(true);

    expectTextFromClassName('isShowingTextHighlight', true);
  });
});
