import * as React from 'react';

import { Nullable } from '../../types';
import { PageRotation } from '../rotate';
import { PdfPixelSize } from '../scale';
import { PageSizeContext } from './PageSizeContext';
import { UIContext } from './UIContext';

type Props = {
  children?: React.ReactElement | Array<React.ReactElement>;
};

export const ContextProvider: React.FunctionComponent<Props> = ({ children }: Props) => {
  const drawerContainerClass = 'reader__main';
  const [errorMessage, setErrorMessage] = React.useState<Nullable<string>>(null);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isShowingHighlightOverlay, setIsShowingHighlightOverlay] = React.useState<boolean>(false);
  const [numPages, setNumPages] = React.useState<number>(0);
  const [pageSize, setPageSize] = React.useState<PdfPixelSize>({ height: 0, width: 0 });
  const [rotation, setRotation] = React.useState<PageRotation>(PageRotation.Rotate0);
  const [scale, setScale] = React.useState<number>(1.0);

  const uiContextProps = {
    drawerContainerClass,
    errorMessage,
    isDrawerOpen,
    isLoading,
    isShowingHighlightOverlay,
    numPages,
    setErrorMessage,
    setIsDrawerOpen,
    setIsLoading,
    setIsShowingHighlightOverlay,
    setNumPages,
  };

  const pageSizeContextProps = {
    pageSize,
    rotation,
    scale,
    setPageSize,
    setRotation,
    setScale,
  };

  return (
    <UIContext.Provider value={uiContextProps}>
      <PageSizeContext.Provider value={pageSizeContextProps}>{children}</PageSizeContext.Provider>
    </UIContext.Provider>
  );
};
