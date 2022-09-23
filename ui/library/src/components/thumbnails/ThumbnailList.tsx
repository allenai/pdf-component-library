import * as React from 'react';

import { DocumentContext } from '../../context/DocumentContext';
import { Thumbnail } from './Thumbnail';

type Props = any;

export const ThumbnailList: React.FunctionComponent<Props> = () => {
  const { numPages } = React.useContext(DocumentContext);

  return (
    <div className="reader__thumbnail-list-wrapper">
      <ul className="reader__thumbnail-list">
        {Array.from({ length: numPages }).map((_, pageIndex) => (
          <li key={pageIndex + 1} className="reader__thumbnail-list__item">
            <Thumbnail pageNumber={pageIndex + 1} />
          </li>
        ))}
      </ul>
    </div>
  );
};
