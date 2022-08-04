import * as React from 'react';

import { NodeDestination } from '../components/types/outline';
import { Nullable } from '../components/types/utils';
import { getMaxVisibleElement } from '../utils/MaxVisibleElement';
import { logProviderWarning } from '../utils/provider';
import { generatePageIdFromIndex } from '../utils/scroll';
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
  visibleOutlineTargets: Map<NodeDestination, number>; // mapping node destination with their intersection ratio
  visiblePageRatios: Map<number, number>; // mapping page number with their intersection ratio
  resetScrollObservers: () => void;
  setScrollRoot: (root: Nullable<Element>) => void;
  scrollToOutlineTarget: (dest: NodeDestination) => void;
  setScrollThreshold: (scrollThreshold: Nullable<number>) => void;
  scrollToPage: (pageNumber: PageNumber) => void;
  resetScrollToTopOfPage: () => void;
  scrollThresholdReachedInDirection: Nullable<ScrollDirection>;
  isAtTop: Nullable<boolean>;
}

const DEFAULT_CONTEXT: IScrollContext = {
  scrollDirection: null,
  visibleOutlineTargets: new Map(),
  visiblePageRatios: new Map(),
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
  scrollToPage: opts => {
    logProviderWarning(`scrollToPage(${JSON.stringify(opts)})`, 'ScrollContext');
  },
  resetScrollToTopOfPage: () => {
    logProviderWarning(`resetScrollToTopOfPage()`, 'ScrollContext');
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

  const [visiblePageRatios, setVisiblePageRatios] = React.useState<Map<number, number>>(() => {
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
      return visiblePageRatios.has(pageNumber);
    },
    [visiblePageRatios]
  );

  const scrollToPage = React.useCallback(
    ({ pageNumber, pageIndex }: PageNumber, smoothScroll = true): void => {
      if (typeof pageNumber === 'number') {
        pageIndex = pageNumber - 1;
      }
      if (typeof pageIndex !== 'number') {
        return;
      }
      document
        .getElementById(generatePageIdFromIndex(pageIndex))
        ?.scrollIntoView({ behavior: smoothScroll ? 'smooth' : 'auto' });
    },
    []
  );

  const resetScrollToTopOfPage = React.useCallback(() => {
    if (visiblePageRatios.size !== 0) {
      const maxVisiblePageNumber = getMaxVisibleElement(visiblePageRatios);
      if (maxVisiblePageNumber) {
        scrollToPage({ pageNumber: Number(maxVisiblePageNumber) }, false);
      }
    }
  }, [visiblePageRatios]);

  // Watch outline nodes
  React.useEffect(() => {
    const root = scrollRoot || document.documentElement;
    const detector = new VisibleEntriesDetector<NodeDestination>({
      root: root,
      setVisibleEntries: setVisibleOutlineNodes,
      onVisibleEntriesChange: ({ visibleEntries, hiddenEntries, lastEntries }) => {
        hiddenEntries.map(entry =>
          lastEntries.delete(entry.target.getAttribute(OUTLINE_ATTRIBUTE))
        );
        const newEntries = new Map(lastEntries);
        visibleEntries.map(entry =>
          newEntries.set(entry.target.getAttribute(OUTLINE_ATTRIBUTE), entry.intersectionRatio)
        );
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
      setVisibleEntries: setVisiblePageRatios,
      onVisibleEntriesChange: ({ visibleEntries, hiddenEntries, lastEntries }) => {
        hiddenEntries.map(entry =>
          lastEntries.delete(parseInt(entry.target?.getAttribute(PAGE_NUMBER_ATTRIBUTE) || '', 10))
        );
        const newEntries = new Map(lastEntries);
        visibleEntries.map(entry =>
          newEntries.set(
            parseInt(entry.target?.getAttribute(PAGE_NUMBER_ATTRIBUTE) || '', 10),
            entry.intersectionRatio
          )
        );
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
    visiblePageRatios,
    resetScrollObservers,
    setScrollRoot,
    scrollToOutlineTarget,
    setScrollThreshold,
    scrollToPage,
    resetScrollToTopOfPage,
    scrollThresholdReachedInDirection,
    isAtTop,
  };
}
