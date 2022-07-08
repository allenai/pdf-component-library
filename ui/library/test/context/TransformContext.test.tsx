import { expect } from 'chai';
import { mount, ReactWrapper } from 'enzyme';
import * as React from 'react';

import {
  ITransformContext,
  TransformContext,
  useTransformContextProps,
} from '../../src/context/TransformContext';
import { PageRotation } from '../../src/utils/rotate';

describe('<TransformContext/>', () => {
  let wrapper: ReactWrapper;

  function expectTextFromClassName(className: string, value: string | number | boolean | null) {
    const actual = wrapper.find(`.${className}`).text();
    const message = `Expected text for element with class .${className} to be ${value} instead of ${actual}`;
    expect(actual).equals(`${value}`, message);
  }

  function UseContext({ children }: any) {
    const contextProps = useTransformContextProps();
    return <TransformContext.Provider value={contextProps}>{children}</TransformContext.Provider>;
  }

  let _setRotation: (rotation: PageRotation) => void;
  let _setScale: (scale: number) => void;
  let _setZoomMultiplier: (zoom: number) => void;

  beforeEach(() => {
    wrapper = mount(
      <UseContext>
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
      </UseContext>
    );
  });

  afterEach(() => {
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
