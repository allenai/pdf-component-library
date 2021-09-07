import { Popover } from 'antd';
import classNames from 'classnames';
import * as React from 'react';

import { Author, Citation } from '../data/types';
import { BoundingBox } from '../library/components/BoundingBox';

type Props = {
  citation: Citation;
  parentRef: React.RefObject<HTMLElement>;
};

export const CitationPopover: React.FunctionComponent<Props> = ({ citation, parentRef }: Props) => {
  const [isPopoverVisible, setIsPopoverVisible] = React.useState(false);

  // Handler triggered when Ant Popover is shown or hidden
  function handleVisibleChange(isVisible: boolean) {
    setIsPopoverVisible(isVisible);
  }

  function renderLink(text: string, url?: string): React.ReactNode {
    if (url) {
      return (
        <a href={url} target="_blank" rel="noreferrer">
          {text}
        </a>
      );
    }
    return <span>{text}</span>;
  }

  function renderAuthorNames(authors: Array<Author>): React.ReactNode {
    if (!authors || !authors.length) {
      return '';
    }

    return authors.map((author: Author, i: number) => {
      let connector = ', ';
      if (i === 0) {
        connector = '';
      } else if (i === authors.length - 1) {
        connector = ' and ';
      }

      return (
        <span className="author" key={author.id}>
          {connector}
          {renderLink(author.name, author.url)}
        </span>
      );
    });
  }

  function renderPopoverContent(): React.ReactFragment {
    const { abstract, authors, title, url, year } = citation.paper;
    return (
      <div className="reader__popover__citation">
        <p className="reader__popover__citation-title">{renderLink(title, url)}</p>
        <p className="reader__popover__citation-authors">{renderAuthorNames(authors)}</p>
        <p className="reader__popover__citation-year">{year}</p>
        <p className="reader__popover__citation-abstract">{abstract}</p>
      </div>
    );
  }

  return (
    <Popover
      // Passing this ref mounts the popover "inside" the scrollable content area
      // instead of using the entire browser height.
      //@ts-ignore there's something wonky with the types here
      getPopupContainer={() => parentRef.current}
      content={renderPopoverContent()}
      trigger="click"
      onVisibleChange={handleVisibleChange}>
      <BoundingBox
        className={classNames('reader__popover__bbox', isPopoverVisible ? 'selected' : '')}
        top={citation.boundingBox.top}
        left={citation.boundingBox.left}
        height={citation.boundingBox.height}
        width={citation.boundingBox.width}
      />
    </Popover>
  );
};
