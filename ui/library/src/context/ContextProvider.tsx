import * as React from "react";

import { DocumentContext, useDocumentContextProps } from "./DocumentContext";
import {
  PageRenderContext,
  usePageRenderContextProps,
} from "./PageRenderContext";
import { ScrollContext, useScrollContextProps } from "./ScrollContext";
import { TransformContext, useTransformContextProps } from "./TransformContext";
import { UiContext, useUiContextProps } from "./UiContext";

export type Props = {
  children?: React.ReactElement | Array<React.ReactElement>;
  transformContextOverrides?: Partial<
    React.ContextType<typeof TransformContext>
  >;
};

export const ContextProvider: React.FunctionComponent<Props> = ({
  children,
  transformContextOverrides,
}: Props) => {
  const documentProps = useDocumentContextProps();
  const transformProps = useTransformContextProps(transformContextOverrides);
  const uiProps = useUiContextProps();
  const scrollProps = useScrollContextProps();
  const pageRenderProps = usePageRenderContextProps({
    pdfDocProxy: documentProps.pdfDocProxy,
    pixelRatio: transformProps.pixelRatio,
    scale: transformProps.scale,
  });

  return (
    <DocumentContext.Provider value={documentProps}>
      <TransformContext.Provider value={transformProps}>
        <UiContext.Provider value={uiProps}>
          <ScrollContext.Provider value={scrollProps}>
            <PageRenderContext.Provider value={pageRenderProps}>
              {children}
            </PageRenderContext.Provider>
          </ScrollContext.Provider>
        </UiContext.Provider>
      </TransformContext.Provider>
    </DocumentContext.Provider>
  );
};
