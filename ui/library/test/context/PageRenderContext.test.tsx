import { expect } from 'chai';
import { mount, ReactWrapper } from 'enzyme';
import * as React from 'react';

import { Nullable } from '../../src/components/types/utils';
import {
  IPageRenderContext,
  PageRenderContext,
  usePageRenderContextProps,
} from '../../src/context/PageRenderContext';
import { PageNumber } from '../../src/context/ScrollContext';
import { PageRotation } from '../../src/utils/rotate';
import { VisibleEntryDetailType } from '../../src/utils/VisibleEntriesDetector';

describe('<PageRenderContext/>', () => {
  let wrapper: ReactWrapper;
  const pdfDocProxy = undefined;
  const scale = 0;
  const rotation: PageRotation = PageRotation.Rotate0;
  const zoomMultiplier = 0;
  const visiblePageRatios: Map<number, VisibleEntryDetailType> = new Map();

  function expectTextFromClassName(className: string, value: string | number | boolean | null) {
    const actual = wrapper.find(`.${className}`).text();
    const message = `Expected text for element with class .${className} to be ${value} instead of ${actual}`;
    expect(actual).equals(`${value}`, message);
  }

  function UseContext({ children }: any) {
    const contextProps = usePageRenderContextProps({
      pdfDocProxy: pdfDocProxy,
      scale: scale,
      rotation: rotation,
      zoomMultiplier: zoomMultiplier,
      visiblePageRatios: visiblePageRatios,
    });
    return <PageRenderContext.Provider value={contextProps}>{children}</PageRenderContext.Provider>;
  }

  let _getObjectURLForPage: (args: PageNumber) => Nullable<string>;
  let _isBuildingObjectURLForPage: (args: PageNumber) => boolean;
  let _buildObjectURLForPage: (args: PageNumber) => Promise<string>;

  beforeEach(() => {
    wrapper = mount(
      <div>
        <UseContext>
          <PageRenderContext.Consumer>
            {(args: IPageRenderContext) => {
              const {
                pageRenderStates,
                getObjectURLForPage,
                isBuildingObjectURLForPage,
                buildObjectURLForPage,
              } = args;
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              _getObjectURLForPage = getObjectURLForPage;
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              _isBuildingObjectURLForPage = isBuildingObjectURLForPage;
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              _buildObjectURLForPage = buildObjectURLForPage;
              return (
                <div>
                  <div className="pageRenderStates">{pageRenderStates}</div>
                </div>
              );
            }}
          </PageRenderContext.Consumer>
        </UseContext>
      </div>
    );
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('provides a default pageRenderStates', () => {
    expectTextFromClassName('pageRenderStates', '');
  });
});
