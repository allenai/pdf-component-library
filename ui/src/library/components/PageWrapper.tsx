import * as React from 'react';
import { Page } from 'react-pdf/dist/esm/entry.webpack';
import { RenderFunction } from 'react-pdf/dist/Page';

import { DocumentContext } from '../context/DocumentContext';
import { TransformContext } from '../context/TransformContext';
import { isSideways } from '../rotate';
import { generatePageId } from '../scroll';
import { HighlightOverlay } from './HighlightOverlay';
import { Overlay } from './Overlay';

/**
 * A subset of react-pdf's Page component props exposed by this wrapper
 */
type PageProps = {
  error?: string | React.ReactElement | RenderFunction;
  loading?: string | React.ReactElement | RenderFunction;
  noData?: string | React.ReactElement | RenderFunction;
  pageIndex: number;
};
type Props = {
  className?: string;
  children?: React.ReactElement<typeof HighlightOverlay | typeof Overlay>;
} & PageProps;

export const PageWrapper: React.FunctionComponent<Props> = ({
  children,
  error,
  loading,
  noData,
  pageIndex,
}: Props) => {
  const { rotation, scale } = React.useContext(TransformContext);
  const { pageSize } = React.useContext(DocumentContext);

  // Don't display until we have page size data
  // TODO: Handle this nicer so we display either the loading or error treatment
  if (!pageSize) {
    return null;
  }

  function onClick(e: unknown): void {
    console.log(e);
  }

  function computeStyle(): { width: number } | undefined {
    if (!pageSize) {
      return undefined;
    }
    return {
      width: (isSideways(rotation) ? pageSize.height : pageSize.width) * scale,
    };
  }

  // Width needs to be set to prevent the outermost Page div from extending to fit the parent,
  // and mis-aligning the text layer.
  // TODO: Can we CSS this to auto-shrink?
  return (
    <div id={generatePageId(pageIndex)} className="reader__page" style={computeStyle()}>
      {children}
      <Page
        width={isSideways(rotation) ? pageSize.height : pageSize.width}
        error={error}
        loading={loading}
        noData={noData}
        pageIndex={pageIndex}
        scale={scale}
        onClick={onClick}
        rotate={rotation}
        renderAnnotationLayer={false}
      />
    </div>
  );
};
