import { expect } from 'chai';
import * as sinon from 'sinon';

import VisibleEntriesDetector from '../../src/utils/VisibleEntriesDetector';
import MockIntersectionObserver from '../mock/MockIntersectionObserver';

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
    const expectedEntries = new Map();
    expectedEntries.set(1, 0.00123);
    expectedEntries.set(2, 0.012567);
    expectedEntries.set(3, 0.2);
    const mockRoot = {};
    const mockSetVisibleEntries = sandbox.mock();
    const mockOnVisibilityChange = sandbox.mock().returns(expectedEntries);

    const detector = new VisibleEntriesDetector({
      root: mockRoot,
      setVisibleEntries: mockSetVisibleEntries,
      onVisibleEntriesChange: mockOnVisibilityChange,
    });

    const mockEntries = [];
    mockObserver.__onChange(mockEntries);

    expect(Array.from(detector._lastVisibleEntries)).to.deep.equal(Array.from(expectedEntries));
  });

  it('should receive correct visibleEntries, hiddenEntries when calling OnVisibilityChange', () => {
    const expectedEntries = new Map();
    expectedEntries.set(1, 0.00123);
    expectedEntries.set(2, 0.012567);
    expectedEntries.set(3, 0.2);
    const mockRoot = {};
    const mockSetVisibleEntries = sandbox.mock();
    const mockOnVisibilityChange = sandbox.mock().returns(expectedEntries);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const detector = new VisibleEntriesDetector({
      root: mockRoot,
      setVisibleEntries: mockSetVisibleEntries,
      onVisibleEntriesChange: mockOnVisibilityChange,
    });

    const mockEntries = [
      { isIntersecting: false, target: 'hidden.1', intersectionRatio: 0.002345 },
      { isIntersecting: true, target: 'visible.2', intersectionRatio: 0.0543 },
      { isIntersecting: true, target: 'visible.3', intersectionRatio: 0.123456 },
      { isIntersecting: false, target: 'hidden.4', intersectionRatio: 0.000456 },
    ];
    mockObserver.__onChange(mockEntries);

    const args = mockOnVisibilityChange.args[0][0];
    const visibleEntries = args?.visibleEntries.map(entry => entry.target);
    const hidddenEntries = args?.hiddenEntries.map(entry => entry.target);

    expect(Array.from(visibleEntries)).to.deep.equal(['visible.2', 'visible.3']);
    expect(Array.from(hidddenEntries)).to.deep.equal(['hidden.1', 'hidden.4']);
    expect(Array.from(args?.lastEntries)).to.deep.equal([]);
  });

  it('should pass the last return of visibility change as last entry', () => {
    const expectedEntries = new Map();
    expectedEntries.set(1, 0.00123);
    expectedEntries.set(2, 0.012567);
    expectedEntries.set(3, 0.2);
    const mockRoot = {};
    const mockSetVisibleEntries = sandbox.mock();
    const mockOnVisibilityChange = sandbox.mock().returns(expectedEntries);

    const detector = new VisibleEntriesDetector({
      root: mockRoot,
      setVisibleEntries: mockSetVisibleEntries,
      onVisibleEntriesChange: mockOnVisibilityChange,
    });

    const mockEntries = [];
    mockObserver.__onChange(mockEntries);

    expect(Array.from(detector._lastVisibleEntries)).to.deep.equal(Array.from(expectedEntries));
  });

  it('should find node to observe based on the pass selector', () => {
    const expectedEntries = new Map();
    expectedEntries.set(1, 0.00123);
    expectedEntries.set(2, 0.012567);
    expectedEntries.set(3, 0.2);
    const mockRoot = {
      querySelectorAll: () => ['.test', '.test1'],
    };
    const mockSetVisibleEntries = sandbox.mock();
    const mockOnVisibilityChange = sandbox.mock().returns(expectedEntries);

    const detector = new VisibleEntriesDetector({
      root: mockRoot,
      setVisibleEntries: mockSetVisibleEntries,
      onVisibleEntriesChange: mockOnVisibilityChange,
    });

    const mockEntries = [];
    mockObserver.__onChange(mockEntries);

    const observeSpy = sandbox.spy(mockObserver, 'observe');

    detector.observeNodes('.test');
    expect(observeSpy.called).to.equal(true);
  });

  it('should disconnect the observe', () => {
    const expectedEntries = new Map();
    expectedEntries.set(1, 0.00123);
    expectedEntries.set(2, 0.012567);
    expectedEntries.set(3, 0.2);
    const mockRoot = {
      querySelectorAll: () => Array.from(['.test', '.test1']),
    };
    const mockSetVisibleEntries = sandbox.mock();
    const mockOnVisibilityChange = sandbox.mock().returns(expectedEntries);

    const detector = new VisibleEntriesDetector({
      root: mockRoot,
      setVisibleEntries: mockSetVisibleEntries,
      onVisibleEntriesChange: mockOnVisibilityChange,
    });

    const mockEntries = [];
    mockObserver.__onChange(mockEntries);

    const disconnectSpy = sandbox.spy(mockObserver, 'disconnect');
    detector.destroy();

    expect(disconnectSpy.called).to.equal(true);
  });
});
