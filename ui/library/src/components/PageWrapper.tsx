import classnames from 'classnames';
import * as React from 'react';
import { Page } from 'react-pdf';
import { RenderFunction } from 'react-pdf/dist/Page';

import { DocumentContext } from '../context/DocumentContext';
import { PageRenderContext } from '../context/PageRenderContext';
import { TransformContext } from '../context/TransformContext';
import { generatePageIdFromIndex } from '../utils/scroll';
import { computePageStyle, getPageWidth } from '../utils/style';
import { HighlightOverlay } from './HighlightOverlay';
import { Overlay } from './Overlay';

/**
 * A subset of react-pdf's Page component props exposed by this wrapper
 */
export type PageProps = {
  error?: string | React.ReactElement | RenderFunction;
  loading?: string | React.ReactElement | RenderFunction;
  noData?: string | React.ReactElement | RenderFunction;
  pageIndex: number;
};

export type Props = {
  className?: string;
  children?: React.ReactElement<typeof HighlightOverlay | typeof Overlay>;
} & PageProps;

export const PageWrapper: React.FunctionComponent<Props> = ({
  children,
  error,
  loading,
  noData,
  pageIndex,
  ...extraProps
}: Props) => {
  const { rotation, scale } = React.useContext(TransformContext);
  const { pageDimensions, getOutlineTargets } = React.useContext(DocumentContext);
  const { getObjectURLForPage, isBuildingObjectURLForPage } = React.useContext(PageRenderContext);

  const objectURLForPage = getObjectURLForPage({ pageIndex });
  const isBuildingPageImage = isBuildingObjectURLForPage({ pageIndex });

  // Don't display until we have page size data
  // TODO: Handle this nicer so we display either the loading or error treatment
  if (!pageDimensions) {
    return null;
  }

  const getWidth = React.useCallback(() => {
    return getPageWidth(pageDimensions, rotation);
  }, [pageDimensions, rotation]);

  const getPageStyle = React.useCallback(() => {
    const styles: Record<string, unknown> = computePageStyle(pageDimensions, rotation, scale);
    if (objectURLForPage) {
      styles.backgroundImage = `url(${objectURLForPage})`;
    }
    return styles;
  }, [pageDimensions, rotation, scale, objectURLForPage]);

  const outlineTargets = getOutlineTargets({ pageIndex, scale, rotation, pageDimensions });

  // Width needs to be set to prevent the outermost Page div from extending to fit the parent,
  // and mis-aligning the text layer.
  // TODO: Can we CSS this to auto-shrink?
  return (
    <div
      id={generatePageIdFromIndex(pageIndex)}
      className={classnames(
        'reader__page',
        { 'reader__page--has-page-image': objectURLForPage },
        { 'reader__page--no-page-image': !objectURLForPage },
        { 'reader__page--is-building-page-image': isBuildingPageImage }
      )}
      style={getPageStyle()}
      {...extraProps}>
      {children}
      <Page
        width={getWidth()}
        error={error}
        loading={loading}
        noData={noData}
        pageIndex={pageIndex}
        scale={scale}
        rotate={rotation}
        renderAnnotationLayer={true}
      />
      <div className="reader__page__outline-targets">
        {outlineTargets.map(({ dest, leftPx, topPx }) => (
          <span
            key={dest}
            className="reader__page__outline-target"
            data-outline-target-dest={dest}
            style={{ left: leftPx + 'px', top: topPx + 'px' }}
          />
        ))}
      </div>
    </div>
  );
};
