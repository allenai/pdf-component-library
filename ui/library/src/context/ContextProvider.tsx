import * as React from 'react';
import { pdfjs } from 'react-pdf';

import { Dimensions } from '../components/types/boundingBox';
import { OutlineNode } from '../components/types/outline';
import { Nullable } from '../components/types/utils';
import { PageRotation } from '../utils/rotate';
import { DocumentContext, IDocumentContext } from './DocumentContext';
import { ITransformContext, TransformContext } from './TransformContext';
import { IUiContext, UiContext } from './UiContext';

export type Props = {
  children?: React.ReactElement | Array<React.ReactElement>;
};

function useDocumentContextProps(): IDocumentContext {
  const [numPages, setNumPages] = React.useState<number>(0);
  const [outline, setOutline] = React.useState<Nullable<Array<OutlineNode>>>(null);
  const [pageDimensions, setPageDimensions] = React.useState<Dimensions>({ height: 0, width: 0 });
  const [pdfDocProxy, setPdfDocProxy] = React.useState<pdfjs.PDFDocumentProxy>();

  return {
    numPages,
    outline,
    pageDimensions: pageDimensions,
    pdfDocProxy,
    setNumPages,
    setOutline,
    setPageDimensions: setPageDimensions,
    setPdfDocProxy,
  };
}

function useTransformContextProps(): ITransformContext {
  const [rotation, setRotation] = React.useState<PageRotation>(PageRotation.Rotate0);
  const [scale, setScale] = React.useState<number>(1.0);
  const [zoomMultiplier, setZoomMultiplier] = React.useState<number>(1.2);

  return {
    rotation,
    scale,
    setRotation,
    setScale,
    setZoomMultiplier,
    zoomMultiplier,
  };
}

function useUiContextProps(): IUiContext {
  const [errorMessage, setErrorMessage] = React.useState<Nullable<string>>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [isShowingHighlightOverlay, setIsShowingHighlightOverlay] = React.useState<boolean>(false);
  const [isShowingOutline, setIsShowingOutline] = React.useState<boolean>(false);
  const [isShowingTextHighlight, setIsShowingTextHighlight] = React.useState<boolean>(false);

  return {
    errorMessage,
    isLoading,
    isShowingHighlightOverlay,
    isShowingOutline,
    isShowingTextHighlight,
    setErrorMessage,
    setIsLoading,
    setIsShowingHighlightOverlay,
    setIsShowingOutline,
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
