import * as React from "react";

import { DocumentContext } from "../../context/DocumentContext";
import { useVisiblePagesStore } from "../../store/VisiblePagesStore";
import { Thumbnail } from "./Thumbnail";

type Props = any;

export const ThumbnailList: React.FunctionComponent<Props> = () => {
  const { numPages } = React.useContext(DocumentContext);

  const {
    state: { visiblePageRatios },
  } = useVisiblePagesStore();
  return (
    <div className="pdf-reader__thumbnail-list-wrapper">
      <ul className="pdf-reader__thumbnail-list">
        {Array.from({ length: numPages }).map((_, pageIndex) => (
          <li key={pageIndex + 1} className="pdf-reader__thumbnail-list__item">
            <Thumbnail
              pageNumber={pageIndex + 1}
              isMostVisiblePage={visiblePageRatios?.has(pageIndex + 1) || false}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
