import classnames from 'classnames';
import * as React from 'react';

import { PageRenderContext } from '../../context/PageRenderContext';
import { ScrollContext } from '../../context/ScrollContext';
import { getMaxVisibleElement } from '../../utils/MaxVisibleElement';
import { Nullable } from '../types/utils';

type Props = {
  pageNumber: number;
};

export const Thumbnail: React.FunctionComponent<Props> = ({ pageNumber }: Props) => {
  const { buildObjectURLForPage, getObjectURLForPage } = React.useContext(PageRenderContext);
  const { isPageVisible, scrollToPage, visiblePageRatios } = React.useContext(ScrollContext);
  const [maxVisiblePageNumber, setMaxVisiblePageNumber] = React.useState<Nullable<string>>(null);
  const objectURL = getObjectURLForPage({ pageNumber });

  React.useEffect(() => {
    if (visiblePageRatios.size !== 0) {
      const max = getMaxVisibleElement(visiblePageRatios);
      if (max) {
        setMaxVisiblePageNumber(max.toString());
      }
    }
  }, [visiblePageRatios]);

  const isThumbnailVisible =
    maxVisiblePageNumber &&
    parseInt(maxVisiblePageNumber) === pageNumber &&
    isPageVisible({ pageNumber });

  React.useEffect(() => {
    buildObjectURLForPage({ pageNumber });
  }, [pageNumber]);

  const onClick = React.useCallback(
    event => {
      event.preventDefault();
      scrollToPage({ pageNumber });
    },
    [pageNumber, scrollToPage]
  );

  return (
    <a
      aria-label={`scroll to page ${pageNumber}`}
      onClick={onClick}
      className={classnames(
        'reader__thumbnail',
        { 'reader__thumbnail--no-image': !objectURL },
        { 'reader__thumbnail--is-visible': isThumbnailVisible }
      )}
      data-page-number={pageNumber}>
      <img className="reader__thumbnail__image" src={objectURL || undefined} />
    </a>
  );
};
