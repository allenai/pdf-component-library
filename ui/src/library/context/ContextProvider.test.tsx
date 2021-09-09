import { expect } from 'chai';
import { mount, ReactWrapper } from 'enzyme';
import * as React from 'react';

import { PageRotation } from '../rotate';
import { Size } from '../scale';
import { Nullable } from '../types';
import { ContextProvider } from './ContextProvider';
import { DocumentContext, IDocumentContext } from './DocumentContext';
import { ITransformContext, TransformContext } from './TransformContext';
import { IUiContext, UiContext } from './UiContext';

describe('<ContextProvider/>', () => {
  let wrapper: ReactWrapper;

  function expectTextFromClassName(className: string, value: string | number | boolean | null) {
    const actual = wrapper.find(`.${className}`).text();
    const message = `Expected text for element with class .${className} to be ${value} instead of ${actual}`;
    expect(actual).equals(`${value}`, message);
  }

  describe('<DocumentContext.Provider/>', () => {
    let _setNumPages: (numPages: number) => void;
    let _setPageSize: (pageSize: Size) => void;

    before(() => {
      wrapper = mount(
        <ContextProvider>
          <DocumentContext.Consumer>
            {(args: IDocumentContext) => {
              const { numPages, pageSize, setNumPages, setPageSize } = args;
              _setNumPages = setNumPages;
              _setPageSize = setPageSize;
              return (
                <div>
                  <div className="numPages">{numPages}</div>
                  <div className="pageHeight">{pageSize.height}</div>
                  <div className="pageWidth">{pageSize.width}</div>
                </div>
              );
            }}
          </DocumentContext.Consumer>
        </ContextProvider>
      );
    });

    after(() => {
      wrapper.unmount();
    });

    it('provides a default numPages', () => {
      expectTextFromClassName('numPages', 0);
    });

    it('provides a default pageSize with height and width', () => {
      expectTextFromClassName('pageHeight', 0);
      expectTextFromClassName('pageWidth', 0);
    });

    it('provides a function to set pageSize', () => {
      expectTextFromClassName('pageHeight', 0);
      expectTextFromClassName('pageWidth', 0);

      _setPageSize({ height: 10, width: 20 });

      expectTextFromClassName('pageHeight', 10);
      expectTextFromClassName('pageWidth', 20);
    });

    it('provides a function to set numPages', () => {
      expectTextFromClassName('numPages', 0);

      _setNumPages(15);

      expectTextFromClassName('numPages', 15);
    });
  });

  describe('<TransformContext.Provider/>', () => {
    let _setRotation: (rotation: PageRotation) => void;
    let _setScale: (scale: number) => void;

    before(() => {
      wrapper = mount(
        <ContextProvider>
          <TransformContext.Consumer>
            {(args: ITransformContext) => {
              const { rotation, scale, setRotation, setScale } = args;
              _setRotation = setRotation;
              _setScale = setScale;
              return (
                <div>
                  <div className="scale">{scale}</div>
                  <div className="rotation">{rotation}</div>
                </div>
              );
            }}
          </TransformContext.Consumer>
        </ContextProvider>
      );
    });

    after(() => {
      wrapper.unmount();
    });

    it('provides a default rotation', () => {
      expectTextFromClassName('rotation', 0);
    });

    it('provides a default scale', () => {
      expectTextFromClassName('scale', 1);
    });

    it('provides a function to set rotation', () => {
      expectTextFromClassName('rotation', 0);

      _setRotation(PageRotation.Rotate90);

      expectTextFromClassName('rotation', 90);
    });

    it('provides a function to set scale', () => {
      expectTextFromClassName('scale', 1);

      _setScale(1.2);

      expectTextFromClassName('scale', 1.2);
    });
  });

  describe('<UIContext.Provider/>', () => {
    let _setErrorMessage: (errorMessage: Nullable<string>) => void;
    let _setIsShowingOutline: (isShowingOutline: boolean) => void;
    let _setIsLoading: (isLoading: boolean) => void;
    let _setIsShowingHighlightOverlay: (isShowingHighlightOverlay: boolean) => void;
    let _setIsShowingTextHighlight: (isShowingTextHighlight: boolean) => void;

    before(() => {
      wrapper = mount(
        <ContextProvider>
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
                  <div className="errorMessage">
                    {errorMessage === null ? 'null' : errorMessage}
                  </div>
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
        </ContextProvider>
      );
    });

    after(() => {
      wrapper.unmount();
    });

    it('provides a default errorMessage === null', () => {
      expectTextFromClassName('errorMessage', null);
    });

    it('provides a default isShowingOutline', () => {
      expectTextFromClassName('isShowingOutline', false);
    });

    it('provides a default isLoading', () => {
      expectTextFromClassName('isLoading', false);
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
      expectTextFromClassName('isLoading', false);

      _setIsLoading(true);

      expectTextFromClassName('isLoading', true);
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
});
