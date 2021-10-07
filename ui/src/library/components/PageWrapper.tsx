import * as React from 'react';
import { Page } from 'react-pdf/dist/esm/entry.webpack';
import { RenderFunction } from 'react-pdf/dist/Page';

import { DocumentContext } from '../context/DocumentContext';
import { TransformContext } from '../context/TransformContext';
import { generatePageId } from '../scroll';
import { computePageStyle, getPageWidth } from '../styleUtils';
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

  const onClick = React.useCallback((e: unknown) => {
    console.log(e);
  }, []);

  const getWidth = React.useCallback(() => {
    return getPageWidth(pageSize, rotation);
  }, [pageSize, rotation]);

  const pageStyle = React.useCallback(() => {
    return computePageStyle(pageSize, rotation, scale);
  }, [pageSize, rotation, scale]);

  // Width needs to be set to prevent the outermost Page div from extending to fit the parent,
  // and mis-aligning the text layer.
  // TODO: Can we CSS this to auto-shrink?
  return (
    <div id={generatePageId(pageIndex)} className="reader__page" style={pageStyle()}>
      {children}
      <Page
        width={getWidth()}
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
