import { expect } from 'chai';
import { ReactWrapper } from 'enzyme';
import { mount } from 'enzyme';
import * as React from 'react';

import { Nullable } from '../../types';
import { PageRotation } from '../rotate';
import { PdfPixelSize } from '../scale';
import { ContextProvider } from './ContextProvider';
import { PageSizeContext, PageSizeContextData } from './PageSizeContext';
import { UIContext, UIContextData } from './UIContext';

describe('<ContextProvider/>', () => {
  let wrapper: ReactWrapper;

  function expectTextFromClassName(className: string, value: string | number | boolean | null) {
    expect(wrapper.find(`.${className}`).text()).equals(`${value}`);
  }

  describe('<PageSizeContext.Provider/>', () => {
    let _setPageSize: (pageSize: PdfPixelSize) => void;
    let _setRotation: (rotation: PageRotation) => void;
    let _setScale: (scale: number) => void;

    before(() => {
      wrapper = mount(
        <ContextProvider>
          <PageSizeContext.Consumer>
            {(args: PageSizeContextData) => {
              const { pageSize, rotation, scale, setPageSize, setRotation, setScale } = args;
              _setPageSize = setPageSize;
              _setRotation = setRotation;
              _setScale = setScale;
              return (
                <div>
                  <div className="scale">{scale}</div>
                  <div className="rotation">{rotation}</div>
                  <div className="pageHeight">{pageSize.height}</div>
                  <div className="pageWidth">{pageSize.width}</div>
                </div>
              );
            }}
          </PageSizeContext.Consumer>
        </ContextProvider>
      );
    });

    it('provides a default pageSize with height and width', () => {
      expectTextFromClassName('pageHeight', 0);
      expectTextFromClassName('pageWidth', 0);
    });

    it('provides a default rotation', () => {
      expectTextFromClassName('rotation', 0);
    });

    it('provides a default scale', () => {
      expectTextFromClassName('scale', 1);
    });

    it('provides a function to set pageSize', () => {
      expectTextFromClassName('pageHeight', 0);
      expectTextFromClassName('pageWidth', 0);

      _setPageSize({ height: 10, width: 20 });

      expectTextFromClassName('pageHeight', 10);
      expectTextFromClassName('pageWidth', 20);
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
    let _setIsDrawerOpen: (isDrawerOpen: boolean) => void;
    let _setIsLoading: (isLoading: boolean) => void;
    let _setIsShowingHighlightOverlay: (isShowingHighlightOverlay: boolean) => void;
    let _setNumPages: (numPages: number) => void;

    before(() => {
      wrapper = mount(
        <ContextProvider>
          <UIContext.Consumer>
            {(args: UIContextData) => {
              const {
                drawerContainerClass,
                errorMessage,
                isDrawerOpen,
                isLoading,
                isShowingHighlightOverlay,
                numPages,
                setErrorMessage,
                setIsDrawerOpen,
                setIsLoading,
                setIsShowingHighlightOverlay,
                setNumPages,
              } = args;
              _setErrorMessage = setErrorMessage;
              _setIsDrawerOpen = setIsDrawerOpen;
              _setIsLoading = setIsLoading;
              _setIsShowingHighlightOverlay = setIsShowingHighlightOverlay;
              _setNumPages = setNumPages;
              return (
                <div>
                  <div className="drawerContainerClass">{drawerContainerClass}</div>
                  <div className="errorMessage">
                    {errorMessage === null ? 'null' : errorMessage}
                  </div>
                  <div className="isDrawerOpen">{isDrawerOpen.toString()}</div>
                  <div className="isLoading">{isLoading.toString()}</div>
                  <div className="isShowingHighlightOverlay">
                    {isShowingHighlightOverlay.toString()}
                  </div>
                  <div className="numPages">{numPages}</div>
                </div>
              );
            }}
          </UIContext.Consumer>
        </ContextProvider>
      );
    });

    it('provides a drawerContainerClass', () => {
      expectTextFromClassName('drawerContainerClass', 'reader__main');
    });

    it('provides a default errorMessage === null', () => {
      expectTextFromClassName('errorMessage', null);
    });

    it('provides a default isDrawerOpen', () => {
      expectTextFromClassName('isDrawerOpen', false);
    });

    it('provides a default isLoading', () => {
      expectTextFromClassName('isLoading', false);
    });

    it('provides a default isShowingHighlightOverlay', () => {
      expectTextFromClassName('isShowingHighlightOverlay', false);
    });

    it('provides a default numPages', () => {
      expectTextFromClassName('numPages', 0);
    });

    it('provides a function to set errorMessage', () => {
      expectTextFromClassName('errorMessage', null);

      _setErrorMessage('Test message');

      expectTextFromClassName('errorMessage', 'Test message');
    });

    it('provides a function to set isDrawerOpen', () => {
      expectTextFromClassName('isDrawerOpen', false);

      _setIsDrawerOpen(true);

      expectTextFromClassName('isDrawerOpen', true);
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

    it('provides a function to set numPages', () => {
      expectTextFromClassName('numPages', 0);

      _setNumPages(25);

      expectTextFromClassName('numPages', 25);
    });
  });
});
