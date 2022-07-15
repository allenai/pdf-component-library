import * as React from 'react';

import { Nullable } from '../components/types/utils';
import { logProviderWarning } from '../utils/provider';
import ScrollDetector from '../utils/ScrollDirectionDetector';

export enum ScrollDirection {
  UP = 'UP',
  DOWN = 'DOWN',
}

export interface IScrollContext {
  scrollDirection: Nullable<ScrollDirection>;
  setScrollRoot: (root: Nullable<Element>) => any;
}

const DEFAULT_CONTEXT: IScrollContext = {
  scrollDirection: null,
  setScrollRoot: (_el: Nullable<Element>) => {
    logProviderWarning(`setScrollRoot(...)`, 'ScrollContext');
  },
};

export const ScrollContext = React.createContext<IScrollContext>(DEFAULT_CONTEXT);

export function useScrollContextProps(): IScrollContext {
  // Node used for observing the scroll position
  const [scrollRoot, setScrollRoot] = React.useState<Nullable<Element>>(null);

  // Determine scroll direction
  const [scrollDirection, setScrollDirection] = React.useState<Nullable<ScrollDirection>>(null);

  React.useEffect(() => {
    const scrollElem = scrollRoot || document.documentElement;
    if (!scrollElem) {
      return;
    }

    const scrollDirectionDetector = new ScrollDetector(scrollElem, setScrollDirection);

    scrollDirectionDetector.attachScrollListener();
    return () => {
      scrollDirectionDetector.detachScrollListener();
    };
  }, [scrollRoot]);

  return {
    scrollDirection,
    setScrollRoot,
  };
}
