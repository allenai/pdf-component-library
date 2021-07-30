import * as React from 'react';

import { Nullable } from '../../types';

export type UIContextData = {
  drawerContainerClass: string;
  errorMessage: Nullable<string>;
  isDrawerOpen: boolean;
  isLoading: boolean;
  isShowingHighlightOverlay: boolean;
  numPages: number;

  setErrorMessage: Function;
  setIsDrawerOpen: Function;
  setIsLoading: Function;
  setIsShowingHighlightOverlay: Function;
  setNumPages: Function;
};

export const UIContext = React.createContext<UIContextData>({
  drawerContainerClass: '',
  errorMessage: null,
  isDrawerOpen: false,
  isLoading: false,
  isShowingHighlightOverlay: false,
  numPages: 0,

  setErrorMessage: () => {},
  setIsDrawerOpen: () => {},
  setIsLoading: () => {},
  setIsShowingHighlightOverlay: () => {},
  setNumPages: () => {},
});
