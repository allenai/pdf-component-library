import { expect } from 'chai';
import * as sinon from 'sinon';

import VisibilityDetector from '../../src/utils/VisibilityDetector';

class MockIntersectionObserver {
  constructor(onChange) {
    this.__onChange = onChange;
  }
  observe() {
    return null;
  }
  disconnect() {
    return null;
  }
  unobserve() {
    return null;
  }
}

describe('VisibilityDetector', () => {
  const sandbox = sinon.createSandbox();
  let mockObserver = null;
  beforeEach(() => {
    (global as any).IntersectionObserver = function (...args) {
      const inst = new MockIntersectionObserver(...args);
      mockObserver = inst;
      return inst;
    };
    sandbox.reset();
  });

  afterEach(() => {
    (global as any).IntersectionObserver = undefined;
  });

  it('should pass the value return when calling OnVisibilityChange to setEntries', () => {
    const expectedEntries = new Set([1, 2, 3]);
    const mockRoot = {};
    const mockSetEntries = sandbox.mock();
    const mockOnVisibilityChange = sandbox.mock().returns(expectedEntries);

    const detector = new VisibilityDetector({
      root: mockRoot,
      setEntries: mockSetEntries,
      onVisibilityChange: mockOnVisibilityChange,
    });

    const mockEntries = [];
    mockObserver.__onChange(mockEntries);

    expect(Array.from(detector._lastEntries)).to.deep.equal(Array.from(expectedEntries));
  });

  it('should receive correct visibleElements, hiddenElements when calling OnVisibilityChange', () => {
    const expectedEntries = new Set([1, 2, 3]);
    const mockRoot = {};
    const mockSetEntries = sandbox.mock();
    const mockOnVisibilityChange = sandbox.mock().returns(expectedEntries);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const detector = new VisibilityDetector({
      root: mockRoot,
      setEntries: mockSetEntries,
      onVisibilityChange: mockOnVisibilityChange,
    });

    const mockEntries = [
      { isIntersecting: false, target: 'hidden.1' },
      { isIntersecting: true, target: 'visible.2' },
      { isIntersecting: true, target: 'visible.3' },
      { isIntersecting: false, target: 'hidden.4' },
    ];
    mockObserver.__onChange(mockEntries);

    const args = mockOnVisibilityChange.args[0][0];
    expect(args?.visibleElements).to.deep.equal(['visible.2', 'visible.3']);
    expect(args?.hiddenElements).to.deep.equal(['hidden.1', 'hidden.4']);
    expect(Array.from(args?.lastEntries)).to.deep.equal([]);
  });

  it('should pass the last return of visibility change as last entry', () => {
    const expectedEntries = new Set([1, 2, 3]);
    const mockRoot = {};
    const mockSetEntries = sandbox.mock();
    const mockOnVisibilityChange = sandbox.mock().returns(expectedEntries);

    const detector = new VisibilityDetector({
      root: mockRoot,
      setEntries: mockSetEntries,
      onVisibilityChange: mockOnVisibilityChange,
    });

    const mockEntries = [];
    mockObserver.__onChange(mockEntries);

    expect(Array.from(detector._lastEntries)).to.deep.equal(Array.from(expectedEntries));
  });

  it('should find node to observe based on the pass selector', () => {
    const expectedEntries = new Set([1, 2, 3]);
    const mockRoot = {
      querySelectorAll: () => ['.test', '.test1'],
    };
    const mockSetEntries = sandbox.mock();
    const mockOnVisibilityChange = sandbox.mock().returns(expectedEntries);

    const detector = new VisibilityDetector({
      root: mockRoot,
      setEntries: mockSetEntries,
      onVisibilityChange: mockOnVisibilityChange,
    });

    const mockEntries = [];
    mockObserver.__onChange(mockEntries);

    const observeSpy = sandbox.spy(mockObserver, 'observe');

    detector.observeNodes('.test');
    expect(observeSpy.called).to.equal(true);
  });

  it('should disconnect the observe', () => {
    const expectedEntries = new Set([1, 2, 3]);
    const mockRoot = {
      querySelectorAll: () => Array.from(['.test', '.test1']),
    };
    const mockSetEntries = sandbox.mock();
    const mockOnVisibilityChange = sandbox.mock().returns(expectedEntries);

    const detector = new VisibilityDetector({
      root: mockRoot,
      setEntries: mockSetEntries,
      onVisibilityChange: mockOnVisibilityChange,
    });

    const mockEntries = [];
    mockObserver.__onChange(mockEntries);

    const disconnectSpy = sandbox.spy(mockObserver, 'disconnect');
    detector.destroy();

    expect(disconnectSpy.called).to.equal(true);
  });
});
