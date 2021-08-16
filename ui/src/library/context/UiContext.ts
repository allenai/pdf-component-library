import * as React from 'react';

import { Nullable } from '../../types';

export interface IUiContext {
  errorMessage: Nullable<string>;
  isDrawerOpen: boolean;
  isLoading: boolean;
  isShowingHighlightOverlay: boolean;
  setErrorMessage: (errorMessage: Nullable<string>) => void;
  setIsDrawerOpen: (isDrawerOpen: boolean) => void;
  setIsLoading: (isLoading: boolean) => void;
  setIsShowingHighlightOverlay: (isShowingHighlightOverlay: boolean) => void;
}

export const UiContext = React.createContext<IUiContext>({
  errorMessage: null,
  isDrawerOpen: false,
  isLoading: false,
  isShowingHighlightOverlay: false,
  // TODO: #28926 Log this with an error util instead of returning value
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
});
