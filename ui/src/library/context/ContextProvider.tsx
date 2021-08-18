import * as React from 'react';

import { Nullable } from '../../types';
import { PageRotation } from '../rotate';
import { Size } from '../scale';
import { DocumentContext, IDocumentContext } from './DocumentContext';
import { ITransformContext, TransformContext } from './TransformContext';
import { IUiContext, UiContext } from './UiContext';

type Props = {
  children?: React.ReactElement | Array<React.ReactElement>;
};

function useDocumentContextProps(): IDocumentContext {
  const [numPages, setNumPages] = React.useState<number>(0);
  const [pageSize, setPageSize] = React.useState<Size>({ height: 0, width: 0 });

  return {
    numPages,
    pageSize,
    setNumPages,
    setPageSize,
  };
}

function useTransformContextProps(): ITransformContext {
  const [rotation, setRotation] = React.useState<PageRotation>(PageRotation.Rotate0);
  const [scale, setScale] = React.useState<number>(1.0);

  return {
    rotation,
    scale,
    setRotation,
    setScale,
  };
}

function useUiContextProps(): IUiContext {
  const [errorMessage, setErrorMessage] = React.useState<Nullable<string>>(null);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isShowingHighlightOverlay, setIsShowingHighlightOverlay] = React.useState<boolean>(false);
  const [isShowingTextHighlight, setIsShowingTextHighlight] = React.useState<boolean>(false);

  return {
    errorMessage,
    isDrawerOpen,
    isLoading,
    isShowingHighlightOverlay,
    isShowingTextHighlight,
    setErrorMessage,
    setIsDrawerOpen,
    setIsLoading,
    setIsShowingHighlightOverlay,
    setIsShowingTextHighlight,
  };
}

export const ContextProvider: React.FunctionComponent<Props> = ({ children }: Props) => {
  const documentProps = useDocumentContextProps();
  const transformProps = useTransformContextProps();
  const uiProps = useUiContextProps();

  return (
    <DocumentContext.Provider value={documentProps}>
      <TransformContext.Provider value={transformProps}>
        <UiContext.Provider value={uiProps}>{children}</UiContext.Provider>
      </TransformContext.Provider>
    </DocumentContext.Provider>
  );
};
