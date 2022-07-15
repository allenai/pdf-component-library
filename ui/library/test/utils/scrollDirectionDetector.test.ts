import { expect } from 'chai';

import { Nullable } from '../../src/components/types/utils';
import ScrollDetector, { ScrollDirection } from '../../src/utils/ScrollDirectionDetector';

describe('scrollDirectionDetector', () => {
  it('should get a default null value for Direction', () => {
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

    let scrollDirection: Nullable<ScrollDirection> = null;
    function setScrollDirection(direction: ScrollDirection) {
      scrollDirection = direction;
    }

    const scrollDirectionDetector = new ScrollDetector(mockScroll as any, setScrollDirection);
    scrollDirectionDetector._onScroll();

    expect(scrollDirection).to.equal(null);
  });

  it('detects scroll down', () => {
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

    let scrollDirection: Nullable<ScrollDirection> = null;
    function setScrollDirection(direction: ScrollDirection) {
      scrollDirection = direction;
    }

    const scrollDirectionDetector = new ScrollDetector(mockScroll as any, setScrollDirection);
    mockScroll.scrollTop = 110;
    scrollDirectionDetector._onScroll();

    expect(scrollDirection).to.equal(ScrollDirection.DOWN);
  });

  it('detects scroll up', () => {
    const mockScroll = {
      scrollTop: 110,
      addEventListener: (eventName, callback) => {
        if (eventName === 'scroll') {
          callback();
        }
      },
      removeEventListener: () => undefined,
      querySelectorAll: () => [],
    };

    let scrollDirection: Nullable<ScrollDirection> = null;
    function setScrollDirection(direction: ScrollDirection) {
      scrollDirection = direction;
    }

    const scrollDirectionDetector = new ScrollDetector(mockScroll as any, setScrollDirection);
    mockScroll.scrollTop = 100;
    scrollDirectionDetector._onScroll();

    expect(scrollDirection).to.equal(ScrollDirection.UP);
  });

  it('detects scroll up if user scroll down and then up', () => {
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

    let scrollDirection: Nullable<ScrollDirection> = null;
    function setScrollDirection(direction: ScrollDirection) {
      scrollDirection = direction;
    }

    const scrollDirectionDetector = new ScrollDetector(mockScroll as any, setScrollDirection);
    mockScroll.scrollTop = 110;
    scrollDirectionDetector._onScroll();

    expect(scrollDirection, 'first scroll down').to.equal(ScrollDirection.DOWN);

    mockScroll.scrollTop = 90;
    scrollDirectionDetector._onScroll();

    expect(scrollDirection, 'then finally scroll up').to.equal(ScrollDirection.UP);
  });

  it('detects scroll down if user scroll up and then down', () => {
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

    let scrollDirection: Nullable<ScrollDirection> = null;
    function setScrollDirection(direction: ScrollDirection) {
      scrollDirection = direction;
    }

    const scrollDirectionDetector = new ScrollDetector(mockScroll as any, setScrollDirection);
    mockScroll.scrollTop = 90;
    scrollDirectionDetector._onScroll();

    expect(scrollDirection, 'first scroll up').to.equal(ScrollDirection.UP);

    mockScroll.scrollTop = 110;
    scrollDirectionDetector._onScroll();

    expect(scrollDirection, 'then finally scroll down').to.equal(ScrollDirection.DOWN);
  });

  it('continues to detect scroll down while scrolling down further', () => {
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

    let scrollDirection: Nullable<ScrollDirection> = null;
    function setScrollDirection(direction: ScrollDirection) {
      scrollDirection = direction;
    }

    const scrollDirectionDetector = new ScrollDetector(mockScroll as any, setScrollDirection);
    mockScroll.scrollTop = 110;
    scrollDirectionDetector._onScroll();

    expect(scrollDirection, 'first scroll down').to.equal(ScrollDirection.DOWN);

    mockScroll.scrollTop = 120;
    scrollDirectionDetector._onScroll();

    expect(scrollDirection, 'then continue to scroll down').to.equal(ScrollDirection.DOWN);
  });

  it('continues to detect scroll up while scrolling up further', () => {
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

    let scrollDirection: Nullable<ScrollDirection> = null;
    function setScrollDirection(direction: ScrollDirection) {
      scrollDirection = direction;
    }

    const scrollDirectionDetector = new ScrollDetector(mockScroll as any, setScrollDirection);
    mockScroll.scrollTop = 90;
    scrollDirectionDetector._onScroll();

    expect(scrollDirection, 'first scroll up').to.equal(ScrollDirection.UP);

    mockScroll.scrollTop = 80;
    scrollDirectionDetector._onScroll();

    expect(scrollDirection, 'then continue to scroll up').to.equal(ScrollDirection.UP);
  });
});
