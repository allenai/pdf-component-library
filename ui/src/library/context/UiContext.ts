import * as React from 'react';

import { Nullable } from '../../types';

export interface IUiContext {
    errorMessage: Nullable<string>,
    isDrawerOpen: boolean,
    isLoading: boolean,
    isShowingHighlightOverlay: boolean,
    setErrorMessage: (errorMessage: Nullable<string>) => void,
    setIsDrawerOpen: (isDrawerOpen: boolean) => void,
    setIsLoading: (isLoading: boolean) => void,
    setIsShowingHighlightOverlay: (isShowingHighlightOverlay: boolean) => void,
}

export const UiContext = React.createContext<IUiContext>({
    errorMessage: null,
    isDrawerOpen: false,
    isLoading: false,
    isShowingHighlightOverlay: false,
    setErrorMessage: (errorMessage) => { },
    setIsDrawerOpen: (isDrawerOpen) => { },
    setIsLoading: (isLoading) => { },
    setIsShowingHighlightOverlay: (isShowingHighlightOverlay) => { },
});
