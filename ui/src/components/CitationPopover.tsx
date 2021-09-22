import { Popover } from 'antd';
import classNames from 'classnames';
import * as React from 'react';

import { BoundingBox } from '../library/components/BoundingBox';
import { TransformContext } from '../library/context/TransformContext';
import { BoundingBox as BoundingBoxType } from '../library/types';
import { Author, Citation, CitationPaper } from '../types/citations';
import { loadJSON } from '../utils';

type Props = {
  citation: Citation;
  parentRef: React.RefObject<HTMLElement>;
};

export const CitationPopover: React.FunctionComponent<Props> = ({ citation, parentRef }: Props) => {
  const transformContext = React.useContext(TransformContext);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isPopoverVisible, setIsPopoverVisible] = React.useState(false);
  const [paper, setPaper] = React.useState<CitationPaper>();

  // Handler triggered when Ant Popover is shown or hidden
  function handleVisibleChange(isVisible: boolean) {
    setIsPopoverVisible(isVisible);
    if (isVisible && !paper) {
      setIsLoading(true);
      loadJSON(`data/citationPapers/${citation.attributes.paperId}.json`, (data: string) => {
        const citationPaperData: CitationPaper = JSON.parse(data);
        setPaper(citationPaperData);
        setIsLoading(false);
      });
    }
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

  function renderPaperSummary(paper: CitationPaper): React.ReactElement | null {
    const { abstract, authors, title, url, year } = paper;
    const shortenedAbstract = abstract ? abstract.substring(0, 300) : null;
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

  function renderPopoverContent(): React.ReactNode {
    return (
      <div className="reader__popover__citation">
        {isLoading && <p className="popover__citation-loading">Loading...</p>}
        {paper && renderPaperSummary(paper)}
      </div>
    );
  }

  return (
    <div>
      {
        // Create a BoundingBox/Popover pair for each bounding box in the citation.
        // This accounts for citations that span multiple pages and avoids buggy popover placement
        // behavior that occurs when the inner BoundingBox is placed in a loop.
        citation.attributes.bounding_boxes.map((box: BoundingBoxType, i: number) => {
          return (
            <Popover
              // Passing this ref mounts the popover "inside" the scrollable content area
              // instead of using the entire browser height.
              //@ts-ignore there's something wonky with the types here
              getPopupContainer={() => parentRef.current}
              content={renderPopoverContent()}
              trigger="click"
              key={i}
              onVisibleChange={handleVisibleChange}>
              <BoundingBox
                className={classNames(
                  'reader__popover__bbox',
                  `rotate${transformContext.rotation}`,
                  isPopoverVisible ? 'selected' : ''
                )}
                top={box.top}
                left={box.left}
                height={box.height}
                width={box.width}
              />
            </Popover>
          );
        })
      }
    </div>
  );
};
