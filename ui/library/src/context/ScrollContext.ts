import * as React from 'react';

import { NodeDestination } from '../components/types/outline';
import { Nullable } from '../components/types/utils';
import { logProviderWarning } from '../utils/provider';
import { generatePageIdFromIndex } from '../utils/scroll';
import ScrollDirectionDetector from '../utils/ScrollDirectionDetector';

export enum ScrollDirection {
  UP = 'UP',
  DOWN = 'DOWN',
}

export interface IScrollContext {
  scrollDirection: Nullable<ScrollDirection>;
  visibleOutlineTargets: Set<NodeDestination>;
  isOutlineTargetVisible: (dest: NodeDestination) => boolean;
  scrollToOutlineTarget: (dest: NodeDestination) => void;
  visiblePageNumbers: Set<number>;
  isPageVisible: (opts: { pageNumber?: number; pageIndex?: number }) => boolean;
  scrollToPage: (opts: { pageNumber?: number; pageIndex?: number }) => void;
  setScrollRoot: (root: Nullable<Element>) => any;
  resetScrollObservers: () => void;
}

const DEFAULT_CONTEXT: IScrollContext = {
  scrollDirection: null,
  visibleOutlineTargets: new Set(),
  isOutlineTargetVisible: opts => {
    logProviderWarning(`isOutlineTargetVisible(${JSON.stringify(opts)})`, 'ScrollContext');
    return false;
  },
  scrollToOutlineTarget: dest => {
    logProviderWarning(`scrollToOutlineTarget(${dest})`, 'ScrollContext');
  },
  visiblePageNumbers: new Set(),
  isPageVisible: opts => {
    logProviderWarning(`isPageVisible(${JSON.stringify(opts)})`, 'ScrollContext');
    return false;
  },
  scrollToPage: opts => {
    logProviderWarning(`scrollToPage(${JSON.stringify(opts)})`, 'ScrollContext');
  },
  setScrollRoot: (_el: Nullable<Element>) => {
    logProviderWarning(`setScrollRoot(...)`, 'ScrollContext');
  },
  resetScrollObservers: () => {
    logProviderWarning(`resetScrollObservers()`, 'ScrollContext');
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

    const scrollDirectionDetector = new ScrollDirectionDetector(scrollElem, setScrollDirection);

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

  const isOutlineTargetVisible = React.useCallback(
    (dest: NodeDestination): boolean => {
      return visibleOutlineTargets.has(dest);
    },
    [visibleOutlineTargets]
  );

  const scrollToOutlineTarget = React.useCallback((dest: NodeDestination): void => {
    document
      .querySelector(`[data-outline-target-dest="${dest}"]`)
      ?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const [visiblePageNumbers, setVisiblePageNumbers] = React.useState<Set<number>>(() => {
    const set = new Set<number>();
    Object.freeze(set);
    return set;
  });

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

    // Listen for visibility changes
    const visibleOutlineTargets = new Set<NodeDestination>();
    const observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          const dest = entry.target.getAttribute('data-outline-target-dest');
          visibleOutlineTargets[entry.isIntersecting ? 'add' : 'delete'](dest);
        }
        const newVisibleOutlineNodes = new Set(visibleOutlineTargets);
        Object.freeze(newVisibleOutlineNodes);
        setVisibleOutlineNodes(newVisibleOutlineNodes);
      },
      {
        root,
        rootMargin: '50px',
        threshold: 0.00001,
      }
    );

    // Find elements to listen to
    for (const node of root.querySelectorAll('.reader__page__outline-target')) {
      observer.observe(node);
    }

    // Unsubscribe everything
    return () => {
      observer.disconnect();
    };
  }, [scrollRoot, observerIndex]);

  // Watch pages
  React.useEffect(() => {
    const root = scrollRoot || document.documentElement;

    // Listen for visibility changes
    const visiblePageNumbers = new Set<number>();
    const observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          const elPage = entry.target.querySelector('[data-page-number]');
          const pageNumber = parseInt(elPage?.getAttribute('data-page-number') || '', 10);
          visiblePageNumbers[entry.isIntersecting ? 'add' : 'delete'](pageNumber);
        }
        const newVisiblePageNumbers = new Set(visiblePageNumbers);
        Object.freeze(newVisiblePageNumbers);
        setVisiblePageNumbers(newVisiblePageNumbers);
      },
      {
        root,
        rootMargin: '50px',
        threshold: 0.00001,
      }
    );

    // Find elements to listen to
    for (const node of root.querySelectorAll('.reader__page')) {
      observer.observe(node);
    }

    // Unsubscribe everything
    return () => {
      observer.disconnect();
    };
  }, [scrollRoot, observerIndex]);

  // TODO: DO NOT COMMIT
  console.log({
    visiblePageNumbers: [...visiblePageNumbers].join(', '),
    visibleOutlineTargets: [...visibleOutlineTargets].join(', '),
    observerIndex,
    scrollDirection,
  });

  return {
    scrollDirection,
    visibleOutlineTargets,
    isOutlineTargetVisible,
    scrollToOutlineTarget,
    visiblePageNumbers,
    isPageVisible,
    scrollToPage,
    setScrollRoot,
    resetScrollObservers,
  };
}
