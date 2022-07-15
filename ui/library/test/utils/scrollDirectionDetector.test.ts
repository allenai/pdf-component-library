import { expect } from 'chai';

import ScrollDetector from '../../../library/src/utils/ScrollDirectionDetector';
import { Nullable } from '../../src/components/types/utils';
import { ScrollDirection } from '../../src/context/ScrollContext';

describe('scrollDirectionDetector', () => {
  it.only('should get a default null value for Direction', () => {
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

  it.only('detects scroll down', () => {
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

  it.only('detects scroll up', () => {
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

  it.only('detects scroll up if user scroll down and then up', () => {
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

    mockScroll.scrollTop = 90;
    scrollDirectionDetector._onScroll();

    expect(scrollDirection).to.equal(ScrollDirection.UP);
  });

  it.only('detects scroll down if user scroll up and then down', () => {
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

    expect(scrollDirection).to.equal(ScrollDirection.UP);

    mockScroll.scrollTop = 110;
    scrollDirectionDetector._onScroll();

    expect(scrollDirection).to.equal(ScrollDirection.DOWN);
  });

  it.only('detects scroll down if user scroll down two times', () => {
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

    mockScroll.scrollTop = 120;
    scrollDirectionDetector._onScroll();

    expect(scrollDirection).to.equal(ScrollDirection.DOWN);
  });

  it.only('detects scroll up if user scroll up two times', () => {
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

    expect(scrollDirection).to.equal(ScrollDirection.UP);

    mockScroll.scrollTop = 80;
    scrollDirectionDetector._onScroll();

    expect(scrollDirection).to.equal(ScrollDirection.UP);
  });
});
