import * as React from "react";

import { VisibleEntryDetailType } from "../utils/VisibleEntriesDetector";

export const ACTIONS_VISIBLE_PAGES = {
  UPDATE_VISIBLE_PAGE_RATIOS: "UPDATE_VISIBLE_PAGE_RATIOS",
  UPDATE_PAGES_SCROLLED_INTO_VIEW: "UPDATE_PAGES_SCROLLED_INTO_VIEW",
} as const;

type VisiblePageStoreType = {
  visiblePageRatios: Map<number, VisibleEntryDetailType>;
  pagesScrolledIntoView: Map<number, VisibleEntryDetailType>;
};

export type VisiblePageStoreUpdateType = {
  visiblePageRatios?: Map<number, VisibleEntryDetailType>;
  pagesScrolledIntoView?: Map<number, VisibleEntryDetailType>;
};

export type VisiblePagesActionsType = {
  UPDATE_VISIBLE_PAGE_RATIOS: (payload: VisiblePageStoreType) => void;
  UPDATE_PAGES_SCROLLED_INTO_VIEW: (payload: VisiblePageStoreType) => void;
};

export type VisiblePageDispatchType = (
  actionIdentifier: keyof VisiblePagesActionsType,
  payload: VisiblePageStoreUpdateType
) => void;

let actions: VisiblePagesActionsType;
const listeners: Set<(state: VisiblePageStoreType) => void> = new Set();
let globalState: VisiblePageStoreType = {
  visiblePageRatios: new Map(),
  pagesScrolledIntoView: new Map(),
};

export const visiblePagesStoreDispatch: VisiblePageDispatchType = (
  actionIdentifier: keyof VisiblePagesActionsType,
  payload: VisiblePageStoreUpdateType
) => {
  switch (actionIdentifier) {
    case ACTIONS_VISIBLE_PAGES.UPDATE_VISIBLE_PAGE_RATIOS:
      globalState = {
        pagesScrolledIntoView: globalState.pagesScrolledIntoView,
        visiblePageRatios:
          payload?.visiblePageRatios || globalState.visiblePageRatios,
      };
      break;
    case ACTIONS_VISIBLE_PAGES.UPDATE_PAGES_SCROLLED_INTO_VIEW:
      globalState = {
        pagesScrolledIntoView:
          payload?.pagesScrolledIntoView || globalState.pagesScrolledIntoView,
        visiblePageRatios: globalState.visiblePageRatios,
      };
      break;
    default:
      console.error("Invalid dispatch in useVisiblePagesStore");
  }

  for (const listener of listeners) {
    try {
      listener(globalState);
    } catch (error) {
      console.error(`Listener error in useVisiblePagesStore: ${error}`);
    }
  }
};

export const useVisiblePagesStore = (): { state: VisiblePageStoreType } => {
  const [, setState] = React.useState(globalState);
  React.useEffect(() => {
    listeners.add(setState);
    return () => {
      listeners.delete(setState);
    };
  }, [setState]);

  return { state: globalState };
};

export const initStore = (
  userActions: VisiblePagesActionsType,
  initialState: VisiblePageStoreType
): void => {
  if (initialState) {
    globalState = { ...globalState, ...initialState };
  }
  actions = { ...actions, ...userActions };
};

export const configureVisiblePagesStore = (): void => {
  const actions: VisiblePagesActionsType = {
    UPDATE_VISIBLE_PAGE_RATIOS: (payload: VisiblePageStoreType) => ({
      visiblePageRatios: payload.visiblePageRatios,
    }),
    UPDATE_PAGES_SCROLLED_INTO_VIEW: (payload: VisiblePageStoreType) => ({
      pagesScrolledIntoView: payload.pagesScrolledIntoView,
    }),
  };

  initStore(actions, {
    visiblePageRatios: new Map(),
    pagesScrolledIntoView: new Map(),
  });
};
