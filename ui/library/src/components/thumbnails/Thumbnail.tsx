import classnames from "classnames";
import * as React from "react";

import { PageRenderContext } from "../../context/PageRenderContext";
import { ScrollContext } from "../../context/ScrollContext";

type Props = {
  pageNumber: number;
  isMostVisiblePage: boolean;
};

export const Thumbnail: React.FunctionComponent<Props> = ({
  pageNumber,
  isMostVisiblePage,
}: Props) => {
  const { getObjectURLForPage } = React.useContext(PageRenderContext);
  const { scrollToPage, setIsOutlineClicked } = React.useContext(ScrollContext);
  const objectURL = getObjectURLForPage({ pageNumber });

  const onClick = React.useCallback(
    (event) => {
      event.preventDefault();
      scrollToPage({ pageNumber });
      setIsOutlineClicked(true);
    },
    [pageNumber, scrollToPage]
  );

  return (
    <a
      aria-label={`scroll to page ${pageNumber}`}
      href={`#${pageNumber}`}
      onClick={onClick}
      className={classnames(
        "pdf-reader__thumbnail",
        { "pdf-reader__thumbnail--no-image": !objectURL },
        { "pdf-reader__thumbnail--full-opacity": isMostVisiblePage }
      )}
      data-page-number={pageNumber}
      data-test-id="thumbnail-link"
    >
      {!!objectURL && (
        <img className="pdf-reader__thumbnail-image" src={objectURL} />
      )}
    </a>
  );
};
