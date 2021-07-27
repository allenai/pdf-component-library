import * as React from 'react';
import { Page } from 'react-pdf/dist/esm/entry.webpack';
import { RenderFunction } from 'react-pdf/dist/Page';

import { isSideways } from '../rotate';
import { generatePageId } from '../scroll';
import { HighlightOverlay } from './HighlightOverlay';
import { Overlay } from './Overlay';
import { PageSizeContext } from './PageSizeContext';

/**
 * A subset of react-pdf's Page component props exposed by this wrapper
 */
type PageProps = {
  error?: string | React.ReactElement | RenderFunction;
  loading?: string | React.ReactElement | RenderFunction;
  noData?: string | React.ReactElement | RenderFunction;
  pageIndex?: number;
  pageNumber?: number;
};

type Props = {
  className?: string;
  children?: React.ReactElement<typeof HighlightOverlay | typeof Overlay>;
} & PageProps;

export const PageWrapper: React.FunctionComponent<Props> = (props: Props) => {
  const { pageSize, rotation, scale } = React.useContext(PageSizeContext);
  const { error, loading, noData, pageIndex, pageNumber, children } = props;

  function onClick(e: unknown): void {
    console.log(e);
  };

  function computeStyle(): { width: number } | undefined {
    if (!pageSize) {
      return undefined;
    }
    return {
      width: (isSideways(rotation) ? pageSize.height : pageSize.width) * scale,
    };
  };

  // Click events from the Outline only give pageNumber, so we need to be clever when setting the ID.
  // TODO: Settle on one to use--pageIndex or pageNumber. react-pdf seems to prefer the latter
  const pageNumberForId = props.pageNumber
    ? props.pageNumber
    : props.pageIndex
      ? props.pageIndex + 1
      : 1;

  // Don't display until we have page size data
  // TODO: Handle this nicer so we display either the loading or error treatment
  if (!pageSize) {
    return null;
  }

  // Width needs to be set to prevent the outermost Page div from extending to fit the parent,
  // and mis-aligning the text layer.
  // TODO: Can we CSS this to auto-shrink?
  return (
    <div
      id={generatePageId(pageNumberForId)}
      className="reader__page"
      style={computeStyle()}>
      {children}
      <Page
        width={isSideways(rotation) ? pageSize.height : pageSize.width}
        error={error}
        loading={loading}
        noData={noData}
        pageIndex={pageIndex}
        pageNumber={pageNumber}
        scale={scale}
        onClick={onClick}
        rotate={rotation}
        renderAnnotationLayer={false}
      />
    </div>
  );
}
