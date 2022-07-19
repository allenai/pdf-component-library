import * as React from 'react';

import { NodeDestination } from '../components/types/outline';
import { Nullable } from '../components/types/utils';
import { logProviderWarning } from '../utils/provider';
import ScrollDetector, { ScrollDirection } from '../utils/ScrollDirectionDetector';
import VisibilityDetector from '../utils/VisibilityDetector';

export interface IScrollContext {
  scrollDirection: Nullable<ScrollDirection>;
  visibleOutlineTargets: Set<NodeDestination>;
  resetScrollObservers: () => void;
  setScrollRoot: (root: Nullable<Element>) => any;
}

const DEFAULT_CONTEXT: IScrollContext = {
  scrollDirection: null,
  visibleOutlineTargets: new Set(),
  resetScrollObservers: () => {
    logProviderWarning(`resetScrollObservers()`, 'ScrollContext');
  },
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

  // Causes the IntersectionObservers to disconnect and be recreated (useful when DOM changes)
  const [observerIndex, setObserverIndex] = React.useState(0);
  const resetScrollObservers = React.useCallback(() => {
    setObserverIndex(observerIndex + 1);
  }, [observerIndex]);

  const [visibleOutlineTargets, setVisibleOutlineNodes] = React.useState<Set<NodeDestination>>(
    () => {
      const set = new Set<NodeDestination>();
      Object.freeze(set);
      return set;
    }
  );

  // Watch outline nodes
  React.useEffect(() => {
    const root = scrollRoot || document.documentElement;
    const detector = new VisibilityDetector<NodeDestination>({
      root: root,
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
    detector.observer('.reader__page__outline-target');
    return () => {
      detector.disconnect();
    };
  }, [scrollRoot, observerIndex]);

  // TODO: DO NOT COMMIT
  console.log({
    visibleOutlineTargets: [...visibleOutlineTargets].join(', '),
    observerIndex,
    scrollDirection,
  });

  return {
    scrollDirection,
    visibleOutlineTargets,
    resetScrollObservers,
    setScrollRoot,
  };
}
