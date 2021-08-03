import * as React from 'react';

import { Nullable } from '../../types';
import { logProviderWarning } from '../errorUtils';

export type UIContextData = {
  drawerContainerClass: string;
  errorMessage: Nullable<string>;
  isDrawerOpen: boolean;
  isLoading: boolean;
  isShowingHighlightOverlay: boolean;
  numPages: number;

  setErrorMessage: (message: Nullable<string>) => void;
  setIsDrawerOpen: (isDrawerOpen: boolean) => void;
  setIsLoading: (isLoading: boolean) => void;
  setIsShowingHighlightOverlay: (isShowingHighlightOverlay: boolean) => void;
  setNumPages: (numPages: number) => void;
};

export const UIContext = React.createContext<UIContextData>({
  drawerContainerClass: '',
  errorMessage: null,
  isDrawerOpen: false,
  isLoading: false,
  isShowingHighlightOverlay: false,
  numPages: 0,

  setErrorMessage: message => {
    logProviderWarning(`setErrorMessage(${message})`, 'UIContext');
  },
  setIsDrawerOpen: isDrawerOpen => {
    logProviderWarning(`setIsDrawerOpen(${isDrawerOpen})`, 'UIContext');
  },
  setIsLoading: isLoading => {
    logProviderWarning(`setIsLoading(${isLoading})`, 'UIContext');
  },
  setIsShowingHighlightOverlay: isShowingHighlightOverlay => {
    logProviderWarning(`setIsShowingHighlightOverlay(${isShowingHighlightOverlay})`, 'UIContext');
  },
  setNumPages: numPages => {
    logProviderWarning(`setNumPages(${numPages})`, 'UIContext');
  },
});
