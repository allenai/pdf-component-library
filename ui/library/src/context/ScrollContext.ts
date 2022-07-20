import * as React from 'react';

import { NodeDestination } from '../components/types/outline';
import { Nullable } from '../components/types/utils';
import { logProviderWarning } from '../utils/provider';
import { generatePageIdFromIndex } from '../utils/scroll';
import ScrollDetector, { ScrollDirection } from '../utils/ScrollDirectionDetector';
import VisibilityDetector from '../utils/VisibilityDetector';

export interface IScrollContext {
  isOutlineTargetVisible: (dest: NodeDestination) => boolean;
  isPageVisible: (opts: { pageNumber?: number; pageIndex?: number }) => boolean;
  scrollDirection: Nullable<ScrollDirection>;
  visibleOutlineTargets: Set<NodeDestination>;
  visiblePageNumbers: Set<number>;
  resetScrollObservers: () => void;
  setScrollRoot: (root: Nullable<Element>) => any;
  scrollToPage: (opts: { pageNumber?: number; pageIndex?: number }) => void;
}

const DEFAULT_CONTEXT: IScrollContext = {
  scrollDirection: null,
  visibleOutlineTargets: new Set(),
  visiblePageNumbers: new Set(),
  isOutlineTargetVisible: opts => {
    logProviderWarning(`isOutlineTargetVisible(${JSON.stringify(opts)})`, 'ScrollContext');
    return false;
  },
  isPageVisible: opts => {
    logProviderWarning(`isPageVisible(${JSON.stringify(opts)})`, 'ScrollContext');
    return false;
  },
  resetScrollObservers: () => {
    logProviderWarning(`resetScrollObservers()`, 'ScrollContext');
  },
  setScrollRoot: (_el: Nullable<Element>) => {
    logProviderWarning(`setScrollRoot(...)`, 'ScrollContext');
  },
  scrollToPage: opts => {
    logProviderWarning(`scrollToPage(${JSON.stringify(opts)})`, 'ScrollContext');
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

  const [visiblePageNumbers, setVisiblePageNumbers] = React.useState<Set<number>>(() => {
    const set = new Set<number>();
    Object.freeze(set);
    return set;
  });

  const isOutlineTargetVisible = React.useCallback(
    (dest: NodeDestination): boolean => {
      return visibleOutlineTargets.has(dest);
    },
    [visibleOutlineTargets]
  );

  const isPageVisible = React.useCallback(
    ({ pageNumber, pageIndex }: { pageNumber?: number; pageIndex?: number }): boolean => {
      if (typeof pageIndex === 'number') {
        pageNumber = pageIndex + 1;
      }
      if (typeof pageNumber !== 'number') {
        return false;
      }
      return visiblePageNumbers.has(pageNumber);
    },
    [visiblePageNumbers]
  );

  const scrollToPage = React.useCallback(
    ({ pageNumber, pageIndex }: { pageNumber?: number; pageIndex?: number }): void => {
      if (typeof pageNumber === 'number') {
        pageIndex = pageNumber - 1;
      }
      if (typeof pageIndex !== 'number') {
        return;
      }
      document
        .getElementById(generatePageIdFromIndex(pageIndex))
        ?.scrollIntoView({ behavior: 'smooth' });
    },
    []
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
    detector.observeNodes('.reader__page__outline-target');
    return () => {
      detector.destroy();
    };
  }, [scrollRoot, observerIndex]);

  // Watch pages
  React.useEffect(() => {
    const root = scrollRoot || document.documentElement;
    const detector = new VisibilityDetector<number>({
      root: root,
      setEntries: setVisiblePageNumbers,
      onVisibilityChange: ({ visibleElements, hiddenElements, lastEntries }) => {
        const newEntries = new Set(lastEntries);
        for (const el of hiddenElements) {
          const elPage = el.querySelector('data-page-number');
          const pageNumber = parseInt(elPage?.getAttribute('data-page-number') || '', 10);
          newEntries.delete(pageNumber);
        }
        for (const el of visibleElements) {
          const elPage = el.querySelector('data-page-number');
          const pageNumber = parseInt(elPage?.getAttribute('data-page-number') || '', 10);
          newEntries.add(pageNumber);
        }
        return newEntries;
      },
    });
    detector.observeNodes('.reader__page');
    return () => {
      detector.destroy();
    };
  }, [scrollRoot, observerIndex]);

  return {
    isOutlineTargetVisible,
    isPageVisible,
    scrollDirection,
    visibleOutlineTargets,
    visiblePageNumbers,
    resetScrollObservers,
    setScrollRoot,
    scrollToPage,
  };
}
