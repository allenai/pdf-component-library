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

  constructor(el: Element, setScrollDirection: (scrollDirection: ScrollDirection) => any) {
    this._el = el;
    this._lastScrollTop = this._el.scrollTop;
    this._lastScrollDirection = null;
    this._setScrollDirection = setScrollDirection;
  }

  attachScrollListener(): void {
    this._el.addEventListener('scroll', this._onScroll, false);
  }

  detachScrollListener(): void {
    this._el.removeEventListener('scroll', this._onScroll, false);
  }

  _onScroll = (): void => {
    const currScrollTop = this._el.scrollTop;
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
    }
  };
}