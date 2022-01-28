import * as React from 'react';

import { Nullable } from '../components/types/utils';
import { logProviderWarning } from '../utils/provider';

export interface IUiContext {
  errorMessage: Nullable<string>;
  isLoading: boolean;
  isShowingHighlightOverlay: boolean;
  isShowingOutline: boolean;
  isShowingTextHighlight: boolean;
  setErrorMessage: (errorMessage: Nullable<string>) => void;
  setIsLoading: (isLoading: boolean) => void;
  setIsShowingHighlightOverlay: (isShowingHighlightOverlay: boolean) => void;
  setIsShowingOutline: (isShowingOutline: boolean) => void;
  setIsShowingTextHighlight: (isShowingTextHighlight: boolean) => void;
}

export const UiContext = React.createContext<IUiContext>({
  errorMessage: null,
  isLoading: false,
  isShowingHighlightOverlay: false,
  isShowingOutline: false,
  isShowingTextHighlight: false,
  setErrorMessage: errorMessage => {
    logProviderWarning(`setErrorMessage(${errorMessage})`, 'UiContext');
  },
  setIsShowingOutline: isShowingOutline => {
    logProviderWarning(`setIsShowingOutline(${isShowingOutline})`, 'UiContext');
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
