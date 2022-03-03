import { expect } from 'chai';
import { mount, ReactWrapper } from 'enzyme';
import { PDFDocumentProxy } from 'pdfjs-dist/types/display/api';
import * as React from 'react';

import { OutlineNode } from '../../src/components/types/outline';
import { ContextProvider } from '../../src/context/ContextProvider';
import { DocumentContext, IDocumentContext } from '../../src/context/DocumentContext';
import { ITransformContext, TransformContext } from '../../src/context/TransformContext';
import { IUiContext, UiContext } from '../../src/context/UiContext';
import { Dimensions, Nullable } from '../../src/types';
import { PageRotation } from '../../src/utils/rotate';

describe('<ContextProvider/>', () => {
  let wrapper: ReactWrapper;

  function expectTextFromClassName(className: string, value: string | number | boolean | null) {
    const actual = wrapper.find(`.${className}`).text();
    const message = `Expected text for element with class .${className} to be ${value} instead of ${actual}`;
    expect(actual).equals(`${value}`, message);
  }

  describe('<DocumentContext.Provider/>', () => {
    let _setNumPages: (numPages: number) => void;
    let _setOutline: (outline: Nullable<Array<OutlineNode>>) => void;
    let _setPageDimensions: (pageDimensions: Dimensions) => void;
    let _setPdfDocProxy: (pdfDocProxy: PDFDocumentProxy) => void;

    before(() => {
      wrapper = mount(
        <ContextProvider>
          <DocumentContext.Consumer>
            {(args: IDocumentContext) => {
              const {
                numPages,
                outline,
                pageDimensions,
                pdfDocProxy,
                setNumPages,
                setOutline,
                setPageDimensions,
                setPdfDocProxy,
              } = args;
              _setNumPages = setNumPages;
              _setOutline = setOutline;
              _setPageDimensions = setPageDimensions;
              _setPdfDocProxy = setPdfDocProxy;
              return (
                <div>
                  <div className="numPages">{numPages}</div>
                  <div className="outline">{outline === null ? 'null' : outline.length}</div>
                  <div className="pageHeight">{pageDimensions.height}</div>
                  <div className="pageWidth">{pageDimensions.width}</div>
                  <div className="pdfDocProxy">{pdfDocProxy ? 'true' : 'false'}</div>
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

    it('provides a default outline', () => {
      expectTextFromClassName('outline', 'null');
    });

    it('provides a default pageDimensions with height and width', () => {
      expectTextFromClassName('pageHeight', 0);
      expectTextFromClassName('pageWidth', 0);
    });

    it('provides a default pdfDocProxy', () => {
      expectTextFromClassName('pdfDocProxy', 'false');
    });

    it('provides a function to set numPages', () => {
      expectTextFromClassName('numPages', 0);

      _setNumPages(15);

      expectTextFromClassName('numPages', 15);
    });

    it('provides a function to set outline', () => {
      const outlineNode = {
        title: 'Title',
        bold: true,
        italic: false,
        color: [],
        dest: {},
        url: null,
        unsafeUrl: 'test.com',
        newWindow: true,
        count: 5,
        items: null,
      };

      expectTextFromClassName('outline', 'null');

      _setOutline([outlineNode]);

      expectTextFromClassName('outline', 1);
    });

    it('provides a function to set pageDimensions', () => {
      expectTextFromClassName('pageHeight', 0);
      expectTextFromClassName('pageWidth', 0);

      _setPageDimensions({ height: 10, width: 20 });

      expectTextFromClassName('pageHeight', 10);
      expectTextFromClassName('pageWidth', 20);
    });

    it('provides a function to setPdfDocProxy', () => {
      expectTextFromClassName('pdfDocProxy', 'false');

      _setPdfDocProxy({} as PDFDocumentProxy);

      expectTextFromClassName('pdfDocProxy', 'true');
    });
  });

  describe('<TransformContext.Provider/>', () => {
    let _setRotation: (rotation: PageRotation) => void;
    let _setScale: (scale: number) => void;
    let _setZoomMultiplier: (zoom: number) => void;

    before(() => {
      wrapper = mount(
        <ContextProvider>
          <TransformContext.Consumer>
            {(args: ITransformContext) => {
              const { rotation, scale, zoomMultiplier, setRotation, setScale, setZoomMultiplier } =
                args;
              _setRotation = setRotation;
              _setScale = setScale;
              _setZoomMultiplier = setZoomMultiplier;
              return (
                <div>
                  <div className="scale">{scale}</div>
                  <div className="rotation">{rotation}</div>
                  <div className="zoom">{zoomMultiplier}</div>
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

    it('provides a default zoom multiplier', () => {
      expectTextFromClassName('zoom', 1.2);
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

    it('provides a function to set zoom multiplier', () => {
      expectTextFromClassName('zoom', 1.2);

      _setZoomMultiplier(2.5);

      expectTextFromClassName('zoom', 2.5);
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
});
