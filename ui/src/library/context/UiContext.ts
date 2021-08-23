import * as React from 'react';

import { Nullable } from '../../types';
import { logProviderWarning } from './providerUtils';

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
  setErrorMessage: errorMessage => {
    logProviderWarning(`setErrorMessage(${errorMessage})`, 'UiContext');
  },
  setIsDrawerOpen: isDrawerOpen => {
    logProviderWarning(`setIsDrawerOpen(${isDrawerOpen})`, 'UiContext');
  },
  setIsLoading: isLoading => {
    logProviderWarning(`setIsLoading(${isLoading})`, 'UiContext');
  },
  setIsShowingHighlightOverlay: isShowingHighlightOverlay => {
    logProviderWarning(`setIsShowingHighlightOverlay(${isShowingHighlightOverlay})`, 'UiContext');
  },
  setIsShowingTextHighlight: isShowingTextHighlight => {
    logProviderWarning(`setIsShowingTextHighlight(${isShowingTextHighlight})`, 'UiContext');
  },
});
