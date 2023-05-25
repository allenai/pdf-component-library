import * as React from 'react';

import { NodeDestination } from '../components/types/outline';
import { PageNumber } from '../components/types/page';
import { Nullable } from '../components/types/utils';
import { logProviderWarning } from '../utils/provider';
import { generatePageIdFromIndex } from '../utils/scroll';
import ScrollDetector, { ScrollDirection } from '../utils/ScrollDirectionDetector';
import VisibleEntriesDetector, { VisibleEntryDetailType } from '../utils/VisibleEntriesDetector';

const OUTLINE_ATTRIBUTE = 'data-outline-target-dest';

const OUTLINE_SELECTOR = '.pdf-reader__page__outline-target';

const PAGE_NUMBER_ATTRIBUTE = 'data-page-number';

const PAGE_NUMBER_SELECTOR = `.pdf-reader__page[${PAGE_NUMBER_ATTRIBUTE}]`;

const DEFAULT_PAGE_SCROLLED_INTO_VIEW_THRESHOLD = 0.1;

const EMPTY_NUMBER_TO_VISIBLE_ENTRY_DETAIL_MAP = Object.freeze(
  new Map<number, VisibleEntryDetailType>()
);

export interface IScrollContext {
  isOutlineTargetVisible: (dest: NodeDestination) => boolean;
  isPageVisible: (pageNumber: PageNumber) => boolean;
  scrollDirection: Nullable<ScrollDirection>;
  visibleOutlineTargets: Map<NodeDestination, VisibleEntryDetailType>; // mapping node destination with their intersection ratio
  visiblePageRatios: Map<number, VisibleEntryDetailType>; // mapping page number with their intersection ratio
  resetScrollObservers: () => void;
  scrollRoot: Nullable<HTMLElement>;
  setScrollRoot: (root: Nullable<HTMLElement>) => void;
  scrollToOutlineTarget: (dest: NodeDestination) => void;
  setScrollThreshold: (scrollThreshold: Nullable<number>) => void;
  scrollToPage: (pageNumber: PageNumber) => void;
  updateScrollPosition: (zoomMultiplier: number) => void;
  setIsOutlineClicked: (isOutlineGetClicked: boolean) => void;
  scrollThresholdReachedInDirection: Nullable<ScrollDirection>;
  isAtTop: Nullable<boolean>;
  isOutlineClicked: Nullable<boolean>;
  pagesScrolledIntoView: Map<number, VisibleEntryDetailType>; // mapping page number with their intersection ratio
  setPageScrolledIntoViewThreshold: (threshold: number) => void;
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
  scrollRoot: <HTMLElement>{},
  setScrollRoot: (_el: Nullable<HTMLElement>) => {
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
  updateScrollPosition: zoomMultiplier => {
    logProviderWarning(`updateScrollPosition(${JSON.stringify(zoomMultiplier)})`, 'ScrollContext');
  },
  setIsOutlineClicked: opts => {
    logProviderWarning(`setIsOutlineGetClicked(${JSON.stringify(opts)})`, 'ScrollContext');
  },
  scrollThresholdReachedInDirection: null,
  isAtTop: null,
  isOutlineClicked: null,
  pagesScrolledIntoView: new Map(),
  setPageScrolledIntoViewThreshold: (threshold: number) => {
    logProviderWarning(`pagesScrolledIntoView(${threshold})`, 'ScrollContext');
  },
};

export const ScrollContext = React.createContext<IScrollContext>(DEFAULT_CONTEXT);

export function useScrollContextProps(): IScrollContext {
  // Node used for observing the scroll position
  const [scrollRoot, setScrollRoot] = React.useState<Nullable<HTMLElement>>(null);

  // Determine scroll direction
  const [scrollDirection, setScrollDirection] = React.useState<Nullable<ScrollDirection>>(null);
  const [scrollThreshold, setScrollThreshold] = React.useState<Nullable<number>>(null);
  const [scrollThresholdReachedInDirection, setScrollThresholdReachedInDirection] =
    React.useState<Nullable<ScrollDirection>>(null);
  const [isAtTop, setIsAtTop] = React.useState<Nullable<boolean>>(null);
  const [isOutlineClicked, setIsOutlineClicked] = React.useState<Nullable<boolean>>(null);

  const [pageScrolledIntoViewThreshold, setPageScrolledIntoViewThreshold] = React.useState(
    DEFAULT_PAGE_SCROLLED_INTO_VIEW_THRESHOLD
  );

  const [pagesScrolledIntoView, setPagesScrolledIntoView] = React.useState<
    Map<number, VisibleEntryDetailType>
  >(() => EMPTY_NUMBER_TO_VISIBLE_ENTRY_DETAIL_MAP);

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
    Map<NodeDestination, VisibleEntryDetailType>
  >(() => {
    const map = new Map<NodeDestination, VisibleEntryDetailType>();
    Object.freeze(map);
    return map;
  });

  const [visiblePageRatios, setVisiblePageRatios] = React.useState<
    Map<number, VisibleEntryDetailType>
  >(() => EMPTY_NUMBER_TO_VISIBLE_ENTRY_DETAIL_MAP);

  const isOutlineTargetVisible = React.useCallback(
    (dest: NodeDestination): boolean => {
      return visibleOutlineTargets.has(dest);
    },
    [visibleOutlineTargets]
  );

  const scrollToOutlineTarget = React.useCallback((dest: NodeDestination): void => {
    setIsOutlineClicked(true);
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

  const scrollToPage = React.useCallback(({ pageNumber, pageIndex }: PageNumber): void => {
    if (typeof pageNumber === 'number') {
      pageIndex = pageNumber - 1;
    }
    if (typeof pageIndex !== 'number') {
      return;
    }
    document
      .getElementById(generatePageIdFromIndex(pageIndex))
      ?.scrollIntoView({ behavior: 'smooth' });
  }, []);

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
          newEntries.set(entry.target.getAttribute(OUTLINE_ATTRIBUTE), {
            ratio: entry.intersectionRatio,
            timestamp: entry.time,
          })
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
        if (hiddenEntries.length) {
          const maxTime = Math.max(...hiddenEntries.map(e => e.time));
          const hiddenPageNums = hiddenEntries.map(
            e => e.target?.getAttribute(PAGE_NUMBER_ATTRIBUTE) || ''
          );

          // due to upper limit on how fast the Intersection Observer API can sample and how fast browsers can render (happens when users scroll fast)
          // sometimes entries will not be signaled as hidden, meaning they should be removed from lastEntries but weren't
          // so if an entry has a timestamp thats older then an entry we are currently removing, we can assume its "stale" and delete
          // more details about this issue here: https://stackoverflow.com/questions/61951380/intersection-observer-fails-sometimes-when-i-scroll-fast

          for (const [key, value] of lastEntries.entries()) {
            if (value.timestamp <= maxTime || hiddenPageNums.includes(String(key))) {
              lastEntries.delete(key);
            }
          }
        }
        const newEntries = new Map(lastEntries);
        visibleEntries.map(entry => {
          newEntries.set(parseInt(entry.target?.getAttribute(PAGE_NUMBER_ATTRIBUTE) || '', 10), {
            ratio: entry.intersectionRatio,
            timestamp: entry.time,
          });
        });
        return newEntries;
      },
    });
    detector.observeNodes(PAGE_NUMBER_SELECTOR);
    return () => {
      detector.destroy();
    };
  }, [scrollRoot, observerIndex]);

  // map of pages at the moment they are scrolled into view, useful for tracking analytics such as page impressions
  // different than the visiblePageRatios in that it only saves the ~initial~ point of when a page comes into view
  // it doesn't track the live change in ratios as the page remains in view when scrolled
  React.useEffect(() => {
    const root = scrollRoot || document.documentElement;
    const detector = new VisibleEntriesDetector<number>({
      root: root,
      thresHold: pageScrolledIntoViewThreshold,
      setVisibleEntries: setPagesScrolledIntoView,
      onVisibleEntriesChange: ({ visibleEntries }) => {
        const newEntries = new Map();
        visibleEntries.map(entry => {
          newEntries.set(
            parseInt(entry.target?.getAttribute(PAGE_NUMBER_ATTRIBUTE) || '', 10),
            entry.intersectionRatio
          );
        });
        return newEntries;
      },
    });
    detector.observeNodes(PAGE_NUMBER_SELECTOR);
    return () => {
      detector.destroy();
    };
  }, [scrollRoot, observerIndex]);

  // calculates a new scroll position after zooming in/out so user doesnt lose their position
  const updateScrollPosition = React.useCallback(
    (zoomMultiplier: number): void => {
      const root = scrollRoot || document.documentElement;
      if (!root) {
        return;
      }
      const newScrollTop = Math.floor(root.scrollTop * zoomMultiplier);
      setTimeout(() => {
        root.scrollTop = newScrollTop;
      }, 0);
    },
    [scrollRoot]
  );

  return {
    isOutlineTargetVisible,
    isPageVisible,
    scrollDirection,
    visibleOutlineTargets,
    visiblePageRatios,
    resetScrollObservers,
    scrollRoot,
    setScrollRoot,
    scrollToOutlineTarget,
    setScrollThreshold,
    scrollToPage,
    updateScrollPosition,
    setIsOutlineClicked,
    scrollThresholdReachedInDirection,
    isAtTop,
    isOutlineClicked,
    pagesScrolledIntoView,
    setPageScrolledIntoViewThreshold,
  };
}
