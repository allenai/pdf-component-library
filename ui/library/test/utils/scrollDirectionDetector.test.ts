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

    const scrollDirectionDetector = new ScrollDetector(
      mockScroll as any,
      setScrollDirection,
      () => undefined
    );
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

    const scrollDirectionDetector = new ScrollDetector(
      mockScroll as any,
      setScrollDirection,
      () => undefined
    );
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

    const scrollDirectionDetector = new ScrollDetector(
      mockScroll as any,
      setScrollDirection,
      () => undefined
    );
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

    const scrollDirectionDetector = new ScrollDetector(
      mockScroll as any,
      setScrollDirection,
      () => undefined
    );
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

    const scrollDirectionDetector = new ScrollDetector(
      mockScroll as any,
      setScrollDirection,
      () => undefined
    );
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

    const scrollDirectionDetector = new ScrollDetector(
      mockScroll as any,
      setScrollDirection,
      () => undefined
    );
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

    const scrollDirectionDetector = new ScrollDetector(
      mockScroll as any,
      setScrollDirection,
      () => undefined
    );
    mockScroll.scrollTop = 90;
    scrollDirectionDetector._onScroll();

    expect(scrollDirection, 'first scroll up').to.equal(ScrollDirection.UP);

    mockScroll.scrollTop = 80;
    scrollDirectionDetector._onScroll();

    expect(scrollDirection, 'then continue to scroll up').to.equal(ScrollDirection.UP);
  });

  it('isAtTop defaults to true if page starts at top', () => {
    const mockScroll = {
      scrollTop: 0,
      addEventListener: (eventName, callback) => {
        if (eventName === 'scroll') {
          callback();
        }
      },
      removeEventListener: () => undefined,
      querySelectorAll: () => [],
    };

    let isAtTop: Nullable<boolean> = null;
    function setIsAtTop(top: boolean) {
      isAtTop = top;
    }

    const scrollDirectionDetector = new ScrollDetector(
      mockScroll as any,
      () => undefined,
      setIsAtTop
    );
    scrollDirectionDetector._onScroll();

    expect(isAtTop).to.equal(true);
  });

  it('isAtTop defaults to false if page starts in middle', () => {
    const mockScroll = {
      scrollTop: 50,
      addEventListener: (eventName, callback) => {
        if (eventName === 'scroll') {
          callback();
        }
      },
      removeEventListener: () => undefined,
      querySelectorAll: () => [],
    };

    let isAtTop: Nullable<boolean> = null;
    function setIsAtTop(top: boolean) {
      isAtTop = top;
    }

    const scrollDirectionDetector = new ScrollDetector(
      mockScroll as any,
      () => undefined,
      setIsAtTop
    );
    scrollDirectionDetector._onScroll();

    expect(isAtTop).to.equal(false);
  });

  it('isAtTop is true after scrolling down then all the way up', () => {
    const mockScroll = {
      scrollTop: 0,
      addEventListener: (eventName, callback) => {
        if (eventName === 'scroll') {
          callback();
        }
      },
      removeEventListener: () => undefined,
      querySelectorAll: () => [],
    };

    let isAtTop: Nullable<boolean> = null;
    function setIsAtTop(top: boolean) {
      isAtTop = top;
    }

    const scrollDirectionDetector = new ScrollDetector(
      mockScroll as any,
      () => undefined,
      setIsAtTop
    );

    scrollDirectionDetector._onScroll();
    expect(isAtTop, 'isAtTop defaults to true at top of page').to.equal(true);

    mockScroll.scrollTop = 100;
    scrollDirectionDetector._onScroll();
    expect(isAtTop, 'isAtTop is false since we scrolled down').to.equal(false);

    mockScroll.scrollTop = 0;
    scrollDirectionDetector._onScroll();
    expect(isAtTop, 'isAtTop is true again since we scrolled all the way up').to.equal(true);
  });

  // test threshold

  it('scrollThresholdReachedInDirection defaults to null on start', () => {
    const mockScroll = {
      scrollTop: 0,
      addEventListener: (eventName, callback) => {
        if (eventName === 'scroll') {
          callback();
        }
      },
      removeEventListener: () => undefined,
      querySelectorAll: () => [],
    };

    const scrollThreshold = 50;
    let scrollThresholdReachedInDirection: Nullable<ScrollDirection> = null;
    function setScrollThresholdReachedInDirection(dir: Nullable<ScrollDirection>) {
      scrollThresholdReachedInDirection = dir;
    }

    const scrollDirectionDetector = new ScrollDetector(
      mockScroll as any,
      () => undefined,
      () => undefined,
      setScrollThresholdReachedInDirection,
      scrollThreshold
    );
    scrollDirectionDetector._onScroll();

    expect(scrollThresholdReachedInDirection).to.equal(null);
  });

  it('scrollThresholdReachedInDirection is null until reaching threshold and returns correct direction in both directions', () => {
    const mockScroll = {
      scrollTop: 0,
      addEventListener: (eventName, callback) => {
        if (eventName === 'scroll') {
          callback();
        }
      },
      removeEventListener: () => undefined,
      querySelectorAll: () => [],
    };

    const scrollThreshold = 50;
    let scrollThresholdReachedInDirection: Nullable<ScrollDirection> = null;
    function setScrollThresholdReachedInDirection(dir: Nullable<ScrollDirection>) {
      scrollThresholdReachedInDirection = dir;
    }

    const scrollDirectionDetector = new ScrollDetector(
      mockScroll as any,
      () => undefined,
      () => undefined,
      setScrollThresholdReachedInDirection,
      scrollThreshold
    );
    scrollDirectionDetector._onScroll();
    expect(
      scrollThresholdReachedInDirection,
      'scrollThresholdReachedInDirection defults to null'
    ).to.equal(null);

    mockScroll.scrollTop = 1; // have to do this with mockscroll
    scrollDirectionDetector._onScroll();

    mockScroll.scrollTop = 25;
    scrollDirectionDetector._onScroll();
    expect(
      scrollThresholdReachedInDirection,
      'scrolled down but not enough to hit threshold so is still null'
    ).to.equal(null);

    mockScroll.scrollTop = 51;
    scrollDirectionDetector._onScroll();
    expect(
      scrollThresholdReachedInDirection,
      'scrolled down enough to hit threshold and return DOWN'
    ).to.equal(ScrollDirection.DOWN);

    mockScroll.scrollTop = 60; // make some room
    scrollDirectionDetector._onScroll();

    mockScroll.scrollTop = 59; // have to do this with mockscroll
    scrollDirectionDetector._onScroll();

    mockScroll.scrollTop = 9;
    scrollDirectionDetector._onScroll();
    expect(
      scrollThresholdReachedInDirection,
      'scrolled up enough to hit threshold and return UP'
    ).to.equal(ScrollDirection.UP);
  });
});
