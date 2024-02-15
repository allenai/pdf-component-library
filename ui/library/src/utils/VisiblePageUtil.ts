import * as React from "react";

import { Nullable } from "../components/types/utils";
import { ScrollContext } from "../context/ScrollContext";
import {
  ACTIONS_VISIBLE_PAGES,
  configureVisiblePagesStore,
  visiblePagesStoreDispatch,
} from "../store/VisiblePagesStore";
import { getMaxVisibleElement } from "./MaxVisibleElement";
import VisibleEntriesDetector, {
  VisibleEntryDetailType,
} from "./VisibleEntriesDetector";

export type Props = {
  className?: string;
};

const DEFAULT_PAGE_SCROLLED_INTO_VIEW_THRESHOLD = 0.1;

const PAGE_NUMBER_ATTRIBUTE = "data-page-number";
const PAGE_NUMBER_SELECTOR = `.pdf-reader__page[${PAGE_NUMBER_ATTRIBUTE}]`;

// Declare mostVisiblePageNumber outside of hook. This is useful if we want to check the current most visible page, and dont need updates
let mostVisiblePageNumber: Nullable<number> = null;
export default function useVisiblePages(): {
  resetScrollObservers: () => void;
} {
  const { scrollRoot } = React.useContext(ScrollContext);

  React.useEffect(() => {
    mostVisiblePageNumber = null;
    configureVisiblePagesStore();
  }, []);

  // Causes the IntersectionObservers to disconnect and be recreated (useful when DOM changes)
  const [observerIndex, setObserverIndex] = React.useState(0);
  const resetScrollObservers = React.useCallback(() => {
    setObserverIndex(observerIndex + 1);
  }, [observerIndex]);

  const setVisiblePageRatios = (
    visibleElements: Map<number, VisibleEntryDetailType>
  ) => {
    mostVisiblePageNumber = getMaxVisibleElement(visibleElements);
    visiblePagesStoreDispatch(
      ACTIONS_VISIBLE_PAGES.UPDATE_VISIBLE_PAGE_RATIOS,
      {
        visiblePageRatios: visibleElements,
      }
    );
  };

  // Watch pages and update store once a new page is more in view than another
  // this is used for Thumbnails, PageNumberControl, and the PageRenderContext
  React.useEffect(() => {
    const root = scrollRoot || document.documentElement;
    const visiblePageRatioDetector = new VisibleEntriesDetector<number>({
      root: root,
      setVisibleEntries: setVisiblePageRatios,
      onVisibleEntriesChange: ({
        visibleEntries,
        hiddenEntries,
        lastEntries,
      }) => {
        if (hiddenEntries.length) {
          const maxTime = Math.max(...hiddenEntries.map((e) => e.time));
          const hiddenPageNums = hiddenEntries.map(
            (e) => e.target?.getAttribute(PAGE_NUMBER_ATTRIBUTE) || ""
          );

          // due to upper limit on how fast the Intersection Observer API can sample and how fast browsers can render (happens when users scroll fast)
          // sometimes entries will not be signaled as hidden, meaning they should be removed from lastEntries but weren't
          // so if an entry has a timestamp thats older then an entry we are currently removing, we can assume its "stale" and delete
          // more details about this issue here: https://stackoverflow.com/questions/61951380/intersection-observer-fails-sometimes-when-i-scroll-fast

          for (const [key, value] of lastEntries.entries()) {
            if (
              value.timestamp <= maxTime ||
              hiddenPageNums.includes(String(key))
            ) {
              lastEntries.delete(key);
            }
          }
        }
        const newEntries = new Map(lastEntries);
        visibleEntries.map((entry) => {
          newEntries.set(
            parseInt(
              entry.target?.getAttribute(PAGE_NUMBER_ATTRIBUTE) || "",
              10
            ),
            {
              ratio: entry.intersectionRatio,
              timestamp: entry.time,
            }
          );
        });
        return newEntries;
      },
    });
    visiblePageRatioDetector.observeNodes(PAGE_NUMBER_SELECTOR);
    return () => {
      visiblePageRatioDetector?.destroy();
    };
  }, [scrollRoot, observerIndex]);

  // map of pages at the moment they are scrolled into view, useful for tracking analytics such as page impressions
  // different than the visiblePageRatios in that it only saves the ~initial~ point of when a page comes into view
  // it doesn't track the live change in ratios as the page remains in view when scrolled

  const setPagesScrolledIntoView = (
    visibleElements: Map<number, VisibleEntryDetailType>
  ) => {
    visiblePagesStoreDispatch(
      ACTIONS_VISIBLE_PAGES.UPDATE_PAGES_SCROLLED_INTO_VIEW,
      {
        pagesScrolledIntoView: visibleElements,
      }
    );
  };
  React.useEffect(() => {
    const root = scrollRoot || document.documentElement;
    const detector = new VisibleEntriesDetector<number>({
      root: root,
      thresHold: DEFAULT_PAGE_SCROLLED_INTO_VIEW_THRESHOLD,
      setVisibleEntries: setPagesScrolledIntoView,
      onVisibleEntriesChange: ({ visibleEntries }) => {
        const newEntries = new Map();
        visibleEntries.map((entry) => {
          newEntries.set(
            parseInt(
              entry.target?.getAttribute(PAGE_NUMBER_ATTRIBUTE) || "",
              10
            ),
            { ratio: entry.intersectionRatio }
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

  return { resetScrollObservers };
}

export function getMostVisiblePageNumber(): Nullable<number> {
  return mostVisiblePageNumber;
}
