import * as React from 'react';

import { DocumentContext } from '../../context/DocumentContext';
import { Thumbnail } from './Thumbnail';

type Props = any;

export const ThumbnailList: React.FunctionComponent<Props> = () => {
  const { numPages } = React.useContext(DocumentContext);

  return (
    <div className="reader__thumbnail-list">
      <ul className="reader__thumbnail-list__list">
        {Array.from({ length: numPages })
          .map((_, i) => i + 1)
          .map(pageNumber => (
            <li key={pageNumber} className="reader__thumbnail-list__item">
              <Thumbnail pageNumber={pageNumber} />
            </li>
          ))}
      </ul>
    </div>
  );
};
