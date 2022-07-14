import * as React from 'react';

import { DocumentContext, useDocumentContextProps } from './DocumentContext';
import { ScrollContext, useScrollContextProps } from './ScrollContext';
import { TransformContext, useTransformContextProps } from './TransformContext';
import { UiContext, useUiContextProps } from './UiContext';

export type Props = {
  children?: React.ReactElement | Array<React.ReactElement>;
};

export const ContextProvider: React.FunctionComponent<Props> = ({ children }: Props) => {
  const documentProps = useDocumentContextProps();
  const transformProps = useTransformContextProps();
  const uiProps = useUiContextProps();
  const scrollProps = useScrollContextProps();

  return (
    <DocumentContext.Provider value={documentProps}>
      <TransformContext.Provider value={transformProps}>
        <UiContext.Provider value={uiProps}>
          <ScrollContext.Provider value={scrollProps}>{children}</ScrollContext.Provider>
        </UiContext.Provider>
      </TransformContext.Provider>
    </DocumentContext.Provider>
  );
};
