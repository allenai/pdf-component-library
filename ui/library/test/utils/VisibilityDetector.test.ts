import { expect } from 'chai';

import { NodeDestination } from '../../src/components/types/outline';
import { Nullable } from '../../src/components/types/utils';
import VisibilityDetector from '../../src/utils/VisibilityDetector';

describe('VisibilityDetector', () => {
  before(() => {
    (global as any).IntersectionObserver = class IntersectionObserver {
      constructor() {}
      observe() {
        return null;
      }
      disconnect() {
        return null;
      }
      unobserve() {
        return null;
      }
    };
  });

  it.only('should get a default null value for VisibleOutlineTargets', () => {
    const mockScroll = {
      scrollTop: 100,
      addEventListener: (eventName, callback) => {
        if (eventName === 'scroll') {
          callback();
        }
      },
      removeEventListener: () => undefined,
      querySelectorAll: () => [],
    };

    let visibleOutlineTargets: Nullable<Set<NodeDestination>> = null;
    function setVisibleOutlineNodes(visibleElements: Set<NodeDestination>) {
      visibleOutlineTargets = visibleElements;
    }

    const visibilityDetector = new VisibilityDetector({
      root: mockScroll as any,
      setEntries: setVisibleOutlineNodes,
      onVisibilityChange: ({ visibleElements, hiddenElements, lastEntries }) => {
        const newEntries = new Set(lastEntries);
        for (const el of hiddenElements) {
          const dest = el.getAttribute('data-outline-target-dest');
          newEntries.delete(dest);
        }
        for (const el of visibleElements) {
          const dest = el.getAttribute('data-outline-target-dest');
          newEntries.add(dest);
        }
        return newEntries;
      },
    });
    visibilityDetector.observer('.reader__page__outline-target');
    expect(visibleOutlineTargets).to.equal(null);
  });
});
