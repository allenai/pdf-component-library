import * as React from 'react';

import { Nullable } from '../../types';

export interface IUi {
    errorMessage: Nullable<string>,
    isDrawerOpen: boolean,
    isLoading: boolean,
    isShowingHighlightOverlay: boolean,
}

export const UiContext = React.createContext<IUi>({
    errorMessage: null,
    isDrawerOpen: false,
    isLoading: false,
    isShowingHighlightOverlay: false,
});
