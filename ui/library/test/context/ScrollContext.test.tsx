import { expect } from 'chai';
import { mount, ReactWrapper } from 'enzyme';
import * as React from 'react';

import { Nullable } from '../../../library/src/components/types/utils';
import {
  IScrollContext,
  ScrollContext,
  useScrollContextProps,
} from '../../src/context/ScrollContext';

describe('<ScrollContext/>', () => {
  let wrapper: ReactWrapper;

  function expectTextFromClassName(className: string, value: string | number | boolean | null) {
    const actual = wrapper.find(`.${className}`).text();
    const message = `Expected text for element with class .${className} to be ${value} instead of ${actual}`;
    expect(actual).equals(`${value}`, message);
  }

  function UseContext({ children }: any) {
    const contextProps = useScrollContextProps();
    return <ScrollContext.Provider value={contextProps}>{children}</ScrollContext.Provider>;
  }

  let _setScrollRoot: (root: Nullable<Element>) => any;

  beforeEach(() => {
    wrapper = mount(
      <div>
        <UseContext>
          <ScrollContext.Consumer>
            {(args: IScrollContext) => {
              const { scrollDirection, setScrollRoot } = args;
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              _setScrollRoot = setScrollRoot;
              return (
                <div>
                  <div className="scrollDirection">{scrollDirection}</div>
                </div>
              );
            }}
          </ScrollContext.Consumer>
        </UseContext>
      </div>
    );
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('provides a default scroll direction', () => {
    expectTextFromClassName('scrollDirection', '');
  });
});
