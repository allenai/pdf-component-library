import * as React from 'react';

import { logProviderWarning } from './providerUtils';
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
});
