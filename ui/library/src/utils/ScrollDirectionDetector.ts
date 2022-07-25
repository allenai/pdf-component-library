import { Nullable } from '../components/types/utils';

export enum ScrollDirection {
  UP = 'UP',
  DOWN = 'DOWN',
}
export default class ScrollDetector {
  _lastScrollTop: number;
  _lastScrollDirection: Nullable<ScrollDirection>;
  _el: Element;
  _setScrollDirection: (scrollDirection: ScrollDirection) => any;
  _lastScrollTopBeforeDirectionChange: number;
  _scrollThreshold?: number;
  _isScrollThresholdReachedInDirection: Nullable<ScrollDirection>;
  _setScrollThresholdReachedInDirection?: (scrollDirection: Nullable<ScrollDirection>) => any;
  _isAtTop: Nullable<boolean>;
  _setIsAtTop: (isAtTop: boolean) => any;

  constructor(
    el: Element,
    setScrollDirection: (scrollDirection: ScrollDirection) => any,
    setIsAtTop: (isAtTop: boolean) => any,
    setScrollThresholdReachedInDirection?: (scrollDirection: Nullable<ScrollDirection>) => any,
    scrollThreshold?: number
  ) {
    this._el = el;
    this._lastScrollTop = this._el.scrollTop;
    this._lastScrollDirection = null;
    this._setScrollDirection = setScrollDirection;
    this._isAtTop = null;
    this._setIsAtTop = setIsAtTop;
    this._lastScrollTopBeforeDirectionChange = this._el.scrollTop;
    this._scrollThreshold = scrollThreshold;

    this._isScrollThresholdReachedInDirection = null;
    this._setScrollThresholdReachedInDirection = setScrollThresholdReachedInDirection;
  }

  attachScrollListener(): void {
    if (this._el?.tagName?.toLowerCase() === 'html') {
      window.addEventListener('scroll', this._onScroll, false);
      return;
    }
    this._el.addEventListener('scroll', this._onScroll, false);
  }

  detachScrollListener(): void {
    if (this._el?.tagName?.toLowerCase() === 'html') {
      window.removeEventListener('scroll', this._onScroll, false);
      return;
    }
    this._el.removeEventListener('scroll', this._onScroll, false);
  }

  _onScroll = (): void => {
    const currScrollTop = this._el.scrollTop;
    if (this._isAtTop !== (currScrollTop === 0)) {
      this._isAtTop = currScrollTop === 0;
      this._setIsAtTop(currScrollTop === 0);
    }
    if (this._lastScrollTop === currScrollTop) {
      return;
    }

    // Determine direction
    const currScrollDirection = (() => {
      if (currScrollTop <= 0) {
        return ScrollDirection.DOWN;
      }
      return this._lastScrollTop < currScrollTop ? ScrollDirection.DOWN : ScrollDirection.UP;
    })();

    // Update state, if changed
    this._lastScrollTop = currScrollTop;
    if (this._lastScrollDirection !== currScrollDirection) {
      this._lastScrollDirection = currScrollDirection;
      this._setScrollDirection(currScrollDirection);

      this._lastScrollTopBeforeDirectionChange = currScrollTop;
      this._isScrollThresholdReachedInDirection = null;
      if (this._setScrollThresholdReachedInDirection && !this._isAtTop) {
        this._setScrollThresholdReachedInDirection(null);
      }
    } else {
      if (this._scrollThreshold && this._setScrollThresholdReachedInDirection) {
        const scrolledAmount = Math.abs(this._lastScrollTopBeforeDirectionChange - currScrollTop);
        if (scrolledAmount >= this._scrollThreshold) {
          this._isScrollThresholdReachedInDirection = this._lastScrollDirection;
          this._setScrollThresholdReachedInDirection(this._lastScrollDirection);
        }
      }
    }
  };
}
