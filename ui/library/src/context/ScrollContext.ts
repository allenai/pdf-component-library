import * as React from 'react';

import { NodeDestination } from '../components/types/outline';
import { Nullable } from '../components/types/utils';
import { logProviderWarning } from '../utils/provider';
import ScrollDetector, { ScrollDirection } from '../utils/ScrollDirectionDetector';
import VisibleEntriesDetector from '../utils/VisibleEntriesDetector';

/**
 * pageNumber: number starts from 1
 * pageIndex: number starts from 0
 */
export type PageNumber = {
  pageNumber?: number;
  pageIndex?: number;
};

const OUTLINE_ATTRIBUTE = 'data-outline-target-dest';

const OUTLINE_SELECTOR = '.reader__page__outline-target';

const PAGE_NUMBER_ATTRIBUTE = 'data-page-number';

const PAGE_NUMBER_SELECTOR = `.reader__page[${PAGE_NUMBER_ATTRIBUTE}]`;

export interface IScrollContext {
  isOutlineTargetVisible: (dest: NodeDestination) => boolean;
  isPageVisible: (pageNumber: PageNumber) => boolean;
  scrollDirection: Nullable<ScrollDirection>;
  visibleOutlineTargets: Map<NodeDestination, number>;
  visiblePageNumbers: Map<number, number>;
  resetScrollObservers: () => void;
  setScrollRoot: (root: Nullable<Element>) => any;
  scrollToOutlineTarget: (dest: NodeDestination) => void;
  setScrollThreshold: (scrollThreshold: Nullable<number>) => any;
  scrollThresholdReachedInDirection: Nullable<ScrollDirection>;
  isAtTop: Nullable<boolean>;
}

const DEFAULT_CONTEXT: IScrollContext = {
  scrollDirection: null,
  visibleOutlineTargets: new Map(),
  visiblePageNumbers: new Map(),
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
  scrollToOutlineTarget: dest => {
    logProviderWarning(`scrollToOutlineTarget(${dest})`, 'ScrollContext');
  },
  setScrollThreshold: (scrollThreshold: Nullable<number>) => {
    logProviderWarning(`setScrollThreshold(${scrollThreshold})`, 'ScrollContext');
  },
  scrollThresholdReachedInDirection: null,
  isAtTop: null,
};

export const ScrollContext = React.createContext<IScrollContext>(DEFAULT_CONTEXT);

export function useScrollContextProps(): IScrollContext {
  // Node used for observing the scroll position
  const [scrollRoot, setScrollRoot] = React.useState<Nullable<Element>>(null);

  // Determine scroll direction
  const [scrollDirection, setScrollDirection] = React.useState<Nullable<ScrollDirection>>(null);
  const [scrollThreshold, setScrollThreshold] = React.useState<Nullable<number>>(null);
  const [scrollThresholdReachedInDirection, setScrollThresholdReachedInDirection] =
    React.useState<Nullable<ScrollDirection>>(null);
  const [isAtTop, setIsAtTop] = React.useState<Nullable<boolean>>(null);

  React.useEffect(() => {
    const scrollElem = scrollRoot || document.documentElement;
    if (!scrollElem) {
      return;
    }

    let scrollDirectionDetector: ScrollDetector;
    if (!scrollThreshold) {
      // scroll threshold is optional
      scrollDirectionDetector = new ScrollDetector(scrollElem, setScrollDirection, setIsAtTop);
    } else {
      scrollDirectionDetector = new ScrollDetector(
        scrollElem,
        setScrollDirection,
        setIsAtTop,
        setScrollThresholdReachedInDirection,
        scrollThreshold
      );
    }

    scrollDirectionDetector.attachScrollListener();
    return () => {
      scrollDirectionDetector.detachScrollListener();
    };
  }, [scrollRoot, scrollThreshold]);

  // Causes the IntersectionObservers to disconnect and be recreated (useful when DOM changes)
  const [observerIndex, setObserverIndex] = React.useState(0);
  const resetScrollObservers = React.useCallback(() => {
    setObserverIndex(observerIndex + 1);
  }, [observerIndex]);

  const [visibleOutlineTargets, setVisibleOutlineNodes] = React.useState<
    Map<NodeDestination, number>
  >(() => {
    const map = new Map<NodeDestination, number>();
    Object.freeze(map);
    return map;
  });

  const [visiblePageNumbers, setVisiblePageNumbers] = React.useState<Map<number, number>>(() => {
    const map = new Map<number, number>();
    Object.freeze(map);
    return map;
  });

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

  const isPageVisible = React.useCallback(
    ({ pageNumber, pageIndex }: PageNumber): boolean => {
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

  // Watch outline nodes
  React.useEffect(() => {
    const root = scrollRoot || document.documentElement;
    const detector = new VisibleEntriesDetector<NodeDestination>({
      root: root,
      setVisibleEntries: setVisibleOutlineNodes,
      onVisibleEntriesChange: ({ visibleEntries, hiddenEntries, lastEntries }) => {
        const newEntries = new Map(lastEntries);
        for (const el of hiddenEntries) {
          const dest = el.target.getAttribute(OUTLINE_ATTRIBUTE);
          newEntries.delete(dest);
        }
        for (const el of visibleEntries) {
          const dest = el.target.getAttribute(OUTLINE_ATTRIBUTE);
          newEntries.set(dest, el.intersectionRatio);
        }
        return newEntries;
      },
    });
    detector.observeNodes(OUTLINE_SELECTOR);
    return () => {
      detector.destroy();
    };
  }, [scrollRoot, observerIndex]);

  // Watch pages
  React.useEffect(() => {
    const root = scrollRoot || document.documentElement;
    const detector = new VisibleEntriesDetector<number>({
      root: root,
      setVisibleEntries: setVisiblePageNumbers,
      onVisibleEntriesChange: ({ visibleEntries, hiddenEntries, lastEntries }) => {
        const newEntries = (() => {
          if (hiddenEntries.length === 0) {
            return new Map();
          }
          return new Map(lastEntries);
        })();

        for (const el of hiddenEntries) {
          const elPage = el.target;
          const pageNumber = parseInt(elPage?.getAttribute(PAGE_NUMBER_ATTRIBUTE) || '', 10);
          newEntries.delete(pageNumber);
        }

        for (const el of visibleEntries) {
          const elPage = el.target;
          const pageNumber = parseInt(elPage?.getAttribute(PAGE_NUMBER_ATTRIBUTE) || '', 10);
          newEntries.set(pageNumber, el.intersectionRatio);
        }
        return newEntries;
      },
    });
    detector.observeNodes(PAGE_NUMBER_SELECTOR);
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
    scrollToOutlineTarget,
    setScrollThreshold,
    scrollThresholdReachedInDirection,
    isAtTop,
  };
}
