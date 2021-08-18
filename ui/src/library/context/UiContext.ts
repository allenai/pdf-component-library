import * as React from 'react';

import { Nullable } from '../../types';

export interface IUiContext {
  errorMessage: Nullable<string>;
  isDrawerOpen: boolean;
  isLoading: boolean;
  isShowingHighlightOverlay: boolean;
  isShowingTextHighlight: boolean;
  setErrorMessage: (errorMessage: Nullable<string>) => void;
  setIsDrawerOpen: (isDrawerOpen: boolean) => void;
  setIsLoading: (isLoading: boolean) => void;
  setIsShowingHighlightOverlay: (isShowingHighlightOverlay: boolean) => void;
  setIsShowingTextHighlight: (isShowingTextHighlight: boolean) => void;
}

export const UiContext = React.createContext<IUiContext>({
  errorMessage: null,
  isDrawerOpen: false,
  isLoading: false,
  isShowingHighlightOverlay: false,
  isShowingTextHighlight: false,
  // TODO log this instead of returning
  setErrorMessage: errorMessage => {
    return errorMessage;
  },
  setIsDrawerOpen: isDrawerOpen => {
    return isDrawerOpen;
  },
  setIsLoading: isLoading => {
    return isLoading;
  },
  setIsShowingHighlightOverlay: isShowingHighlightOverlay => {
    return isShowingHighlightOverlay;
  },
  setIsShowingTextHighlight: isShowingTextHighlight => {
    return isShowingTextHighlight;
  },
});
