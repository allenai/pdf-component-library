import * as React from 'react';
import { Page } from 'react-pdf/dist/esm/entry.webpack';
import { RenderFunction } from 'react-pdf/dist/Page';

import { Nullable } from '../../types';
import { isSideways, PageRotation } from '../rotate';
import { PdfPixelSize } from '../scale';
import { generatePageId } from '../scroll';
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
  scale: number; // Unlike the react-pdf component, this is now required
  rotation: PageRotation;
};
type Props = {
  className?: string;
  children?: React.ReactElement<typeof Overlay>;
  pageSize?: Nullable<PdfPixelSize>;
} & PageProps;

export class PageWrapper extends React.PureComponent<Props> {
  onClick = (e: unknown): void => {
    console.log(e);
  };

  computeStyle = (): { width: number } | undefined => {
    const { pageSize, scale, rotation } = this.props;
    if (!pageSize) {
      return undefined;
    }
    return {
      width: (isSideways(rotation) ? pageSize.height : pageSize.width) * scale,
    };
  };

  render(): React.ReactNode {
    const { pageSize, error, loading, noData, pageIndex, pageNumber, scale, rotation, children } =
      this.props;
    // Click events from the Outline only give pageNumber, so we need to be clever when setting the ID.
    // TODO: Settle on one to use--pageIndex or pageNumber. react-pdf seems to prefer the latter
    const pageNumberForId = this.props.pageNumber
      ? this.props.pageNumber
      : this.props.pageIndex
      ? this.props.pageIndex + 1
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
        style={this.computeStyle()}>
        <PageSizeContext.Provider value={{ pageSize, scale, rotation }}>
          {children}
        </PageSizeContext.Provider>
        <Page
          width={isSideways(rotation) ? pageSize.height : pageSize.width}
          error={error}
          loading={loading}
          noData={noData}
          pageIndex={pageIndex}
          pageNumber={pageNumber}
          scale={scale}
          onClick={this.onClick}
          rotate={rotation}
          renderAnnotationLayer={false}
        />
      </div>
    );
  }
}
