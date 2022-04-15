import { BoundingBox } from '@allenai/pdf-components';
import { Popover } from 'antd';
import classNames from 'classnames';
import * as React from 'react';

import { Author, Citation, CitationPaper, makeAuthors, makePaperUrl } from '../types/citations';

type Props = {
  citation: Citation;
  parentRef: React.RefObject<HTMLElement>;
};

export const CitationPopover: React.FunctionComponent<Props> = ({ citation, parentRef }: Props) => {
  const ABSTRACT_MAX_LENGTH = 300;
  const [isLoading, setIsLoading] = React.useState(true);
  const [isPopoverVisible, setIsPopoverVisible] = React.useState(false);
  const [paper, setPaper] = React.useState<CitationPaper>();

  // Handler triggered when Ant Popover is shown or hidden
  const handleVisibleChange = React.useCallback(
    (isVisible: boolean) => {
      setIsPopoverVisible(isVisible);
      if (isVisible && !paper) {
        setIsLoading(true);
        fetch(
          `https://api.semanticscholar.org/graph/v1/paper/${citation.paperId}?fields=abstract,authors,title,year`
        )
          .then(response => response.json())
          .then(data => {
            // HACKED: saves the work defining types for Paper object
            const citationPaper: CitationPaper = {
              abstract: data.abstract,
              authors: makeAuthors(data.authors),
              title: data.title,
              url: makePaperUrl(data.paperId),
              year: parseInt(data.year),
            };

            setPaper(citationPaper);
            setIsLoading(false);
          });
      }
    },
    [citation, paper]
  );

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
      return null;
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

  function renderPaperSummary(paper: CitationPaper): React.ReactNode {
    const { abstract, authors, title, url, year } = paper;
    const shortenedAbstract = abstract ? abstract.substring(0, ABSTRACT_MAX_LENGTH) : null;
    return (
      <div className="reader__popover__citation">
        {title && <p className="reader__popover__citation-title">{renderLink(title, url)}</p>}
        {authors && authors.length && (
          <p className="reader__popover__citation-authors">{renderAuthorNames(authors)}</p>
        )}
        {year && <p className="reader__popover__citation-year">{year}</p>}
        {shortenedAbstract && (
          <p className="reader__popover__citation-abstract">{`${shortenedAbstract}...`}</p>
        )}
      </div>
    );
  }

  const renderPopoverContent = React.useCallback(() => {
    return (
      <div className="reader__popover__citation">
        {isLoading && <p className="popover__citation-loading">Loading...</p>}
        {paper && renderPaperSummary(paper)}
      </div>
    );
  }, [isLoading, paper]);

  return (
    // Create a BoundingBox/Popover pair for each bounding box in the citation.
    // This accounts for citations that span multiple pages and avoids buggy popover placement
    // behavior that occurs when the inner BoundingBox is placed in a loop.
    <Popover
      // Passing this ref mounts the popover "inside" the scrollable content area
      // instead of using the entire browser height.
      //@ts-ignore there's something wonky with the types here
      getPopupContainer={() => parentRef.current}
      content={renderPopoverContent}
      trigger="click"
      onVisibleChange={handleVisibleChange}>
      <BoundingBox
        className={classNames('reader__popover__bbox', isPopoverVisible ? 'selected' : '')}
        page={citation.boundingBox.page}
        top={citation.boundingBox.top}
        left={citation.boundingBox.left}
        height={citation.boundingBox.height}
        width={citation.boundingBox.width}
        isHighlighted={true}
      />
    </Popover>
  );
};
