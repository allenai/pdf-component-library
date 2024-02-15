import * as React from "react";

import { NodeDestination } from "../components/types/outline";
import { PageNumber } from "../components/types/page";
import { Nullable } from "../components/types/utils";
import { logProviderWarning } from "../utils/provider";
import { generatePageIdFromIndex } from "../utils/scroll";
import { VisibleEntryDetailType } from "../utils/VisibleEntriesDetector";
export interface IScrollContext {
  isOutlineTargetVisible: (dest: NodeDestination) => boolean;
  visibleOutlineTargets: Map<NodeDestination, VisibleEntryDetailType>; // mapping node destination with their intersection ratio
  scrollRoot: Nullable<HTMLElement>;
  setScrollRoot: (root: Nullable<HTMLElement>) => void;
  scrollToOutlineTarget: (dest: NodeDestination) => void;
  scrollToPage: (pageNumber: PageNumber) => void;
  updateScrollPosition: (zoomMultiplier: number) => void;
  setIsOutlineClicked: (isOutlineGetClicked: boolean) => void;
  isOutlineClicked: Nullable<boolean>;
  isScrollFromTopLimitReached: Nullable<boolean>;
  setScrollFromTopLimit: (limit: Nullable<number>) => void;
}

const DEFAULT_CONTEXT: IScrollContext = {
  visibleOutlineTargets: new Map(),
  isOutlineTargetVisible: (opts) => {
    logProviderWarning(
      `isOutlineTargetVisible(${JSON.stringify(opts)})`,
      "ScrollContext"
    );
    return false;
  },
  scrollRoot: <HTMLElement>{},
  setScrollRoot: (_el: Nullable<HTMLElement>) => {
    logProviderWarning(`setScrollRoot(...)`, "ScrollContext");
  },
  scrollToOutlineTarget: (dest) => {
    logProviderWarning(`scrollToOutlineTarget(${dest})`, "ScrollContext");
  },
  scrollToPage: (opts) => {
    logProviderWarning(
      `scrollToPage(${JSON.stringify(opts)})`,
      "ScrollContext"
    );
  },
  updateScrollPosition: (zoomMultiplier) => {
    logProviderWarning(
      `updateScrollPosition(${JSON.stringify(zoomMultiplier)})`,
      "ScrollContext"
    );
  },
  setIsOutlineClicked: (opts) => {
    logProviderWarning(
      `setIsOutlineGetClicked(${JSON.stringify(opts)})`,
      "ScrollContext"
    );
  },
  isOutlineClicked: null,
  isScrollFromTopLimitReached: null,
  setScrollFromTopLimit: (limit: Nullable<number>) => {
    logProviderWarning(`setScrollFromTopLimit(${limit})`, "ScrollContext");
  },
};

export const ScrollContext =
  React.createContext<IScrollContext>(DEFAULT_CONTEXT);

export function useScrollContextProps(): IScrollContext {
  // Node used for observing the scroll position
  const [scrollRoot, setScrollRoot] =
    React.useState<Nullable<HTMLElement>>(null);

  const [isOutlineClicked, setIsOutlineClicked] =
    React.useState<Nullable<boolean>>(null);

  const [scrollFromTopLimit, setScrollFromTopLimit] =
    React.useState<Nullable<number>>(null);

  const [isScrollFromTopLimitReached, setIsScrollFromTopLimitReached] =
    React.useState<boolean>(false);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [visibleOutlineTargets, setVisibleOutlineNodes] = React.useState<
    Map<NodeDestination, VisibleEntryDetailType>
  >(() => {
    const map = new Map<NodeDestination, VisibleEntryDetailType>();
    Object.freeze(map);
    return map;
  });
  const isOutlineTargetVisible = React.useCallback(
    (dest: NodeDestination): boolean => {
      return visibleOutlineTargets.has(dest);
    },
    [visibleOutlineTargets]
  );

  const scrollToOutlineTarget = React.useCallback(
    (dest: NodeDestination): void => {
      setIsOutlineClicked(true);
      document
        .querySelector(`[data-outline-target-dest="${dest}"]`)
        ?.scrollIntoView({ behavior: "smooth" });
    },
    []
  );

  const scrollToPage = React.useCallback(
    ({ pageNumber, pageIndex }: PageNumber): void => {
      if (typeof pageNumber === "number") {
        pageIndex = pageNumber - 1;
      }
      if (typeof pageIndex !== "number") {
        return;
      }
      document
        .getElementById(generatePageIdFromIndex(pageIndex))
        ?.scrollIntoView({ behavior: "smooth" });
    },
    []
  );

  React.useEffect(() => {
    const onScroll = () => {
      const root = scrollRoot || document.documentElement;
      if (!root || scrollFromTopLimit == null) {
        return;
      }
      setIsScrollFromTopLimitReached(scrollFromTopLimit <= root.scrollTop);
    };

    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [scrollRoot, scrollFromTopLimit]);

  // TODO: (#39831) - We currently aren't using visibleOutlineNodes for anything. Its supposed to show which outline targets are visible, but we dont have css for it
  // Once we add the style, then this can be moved to visiblePagesUtil/visiblePagesStore
  // // Watch outline nodes
  // React.useEffect(() => {
  //   const root = scrollRoot || document.documentElement;
  //   const detector = new VisibleEntriesDetector<NodeDestination>({
  //     root: root,
  //     setVisibleEntries: setVisibleOutlineNodes,
  //     onVisibleEntriesChange: ({
  //       visibleEntries,
  //       hiddenEntries,
  //       lastEntries,
  //     }) => {
  //       hiddenEntries.map((entry) =>
  //         lastEntries.delete(entry.target.getAttribute(OUTLINE_ATTRIBUTE))
  //       );
  //       const newEntries = new Map(lastEntries);
  //       visibleEntries.map((entry) =>
  //         newEntries.set(entry.target.getAttribute(OUTLINE_ATTRIBUTE), {
  //           ratio: entry.intersectionRatio,
  //           timestamp: entry.time,
  //         })
  //       );
  //       return newEntries;
  //     },
  //   });
  //   detector.observeNodes(OUTLINE_SELECTOR);
  //   return () => {
  //     detector.destroy();
  //   };
  // }, [scrollRoot, observerIndex]);

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
    visibleOutlineTargets,
    scrollRoot,
    setScrollRoot,
    scrollToOutlineTarget,
    scrollToPage,
    updateScrollPosition,
    setIsOutlineClicked,
    isOutlineClicked,
    isScrollFromTopLimitReached,
    setScrollFromTopLimit,
  };
}
