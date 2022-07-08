import { expect } from 'chai';
import { mount, ReactWrapper } from 'enzyme';
import * as React from 'react';
import { pdfjs } from 'react-pdf';

import { Dimensions } from '../../src/components/types/boundingBox';
import { OutlineNode } from '../../src/components/types/outline';
import { Nullable } from '../../src/components/types/utils';
import {
  DocumentContext,
  IDocumentContext,
  useDocumentContextProps,
} from '../../src/context/DocumentContext';

describe('<DocumentContext/>', () => {
  let wrapper: ReactWrapper;

  function expectTextFromClassName(className: string, value: string | number | boolean | null) {
    const actual = wrapper.find(`.${className}`).text();
    const message = `Expected text for element with class .${className} to be ${value} instead of ${actual}`;
    expect(actual).equals(`${value}`, message);
  }

  function UseContext({ children }: any) {
    const contextProps = useDocumentContextProps();
    return <DocumentContext.Provider value={contextProps}>{children}</DocumentContext.Provider>;
  }

  let _setNumPages: (numPages: number) => void;
  let _setOutline: (outline: Nullable<Array<OutlineNode>>) => void;
  let _setPageDimensions: (pageDimensions: Dimensions) => void;
  let _setPdfDocProxy: (pdfDocProxy: pdfjs.PDFDocumentProxy) => void;

  beforeEach(() => {
    wrapper = mount(
      <UseContext>
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
      </UseContext>
    );
  });

  afterEach(() => {
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

    _setPdfDocProxy({} as pdfjs.PDFDocumentProxy);

    expectTextFromClassName('pdfDocProxy', 'true');
  });
});
