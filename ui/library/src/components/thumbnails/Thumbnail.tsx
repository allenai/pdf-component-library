import classnames from 'classnames';
import * as React from 'react';

import { PageRenderContext } from '../../context/PageRenderContext';
import { ScrollContext } from '../../context/ScrollContext';

type Props = {
  pageNumber: number;
};

export const Thumbnail: React.FunctionComponent<Props> = ({ pageNumber }: Props) => {
  const { pageRenderStates, buildObjectURLForPage, getObjectURLForPage } = React.useContext(PageRenderContext);
  const { isPageVisible, scrollToPage } = React.useContext(ScrollContext);
  const objectURL = getObjectURLForPage({ pageNumber });
  const hasPageVisible = isPageVisible({ pageNumber });

  React.useEffect(() => {
    buildObjectURLForPage({ pageNumber });
  }, [pageNumber, pageRenderStates]);

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
        { 'reader__thumbnail--has-page-image': objectURL },
        { 'reader__thumbnail--no-page-image': !objectURL },
        { 'reader__thumbnail--has-page-visible': hasPageVisible },
        { 'reader__thumbnail--no-page-visible': !hasPageVisible }
      )}
      data-page-number={pageNumber}>
      <img className="reader__thumbnail__image" src={objectURL || undefined} />
    </a>
  );
};
