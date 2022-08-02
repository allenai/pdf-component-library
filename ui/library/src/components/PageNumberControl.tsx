import classnames from 'classnames';
import * as React from 'react';

import { DocumentContext } from '../context/DocumentContext';
import { ScrollContext } from '../context/ScrollContext';
import { getMaxVisibleElement } from '../utils/MaxVisibleElement';

export type Props = {
  showDivider?: boolean;
  className?: string;
};

type TODO__TIMER = any;

const DELAY_SCROLL_TIME_OUT_MS = 1000;

export const PageNumberControl: React.FunctionComponent<Props> = ({
  showDivider,
  className,
}: Props) => {
  const delayTimerRef = React.useRef<TODO__TIMER>();
  const { numPages } = React.useContext(DocumentContext);
  const { scrollToPage, visiblePageRatios } = React.useContext(ScrollContext);
  const [minPage, setMinPage] = React.useState(0);
  const [userInput, setUserInput] = React.useState('0');

  // Initialize page control element
  React.useEffect(() => {
    if (numPages != 0) {
      setMinPage(1);
    }
  }, [numPages]);

  React.useEffect(() => {
    if (visiblePageRatios.size !== 0) {
      const maxVisiblePageNumber = getMaxVisibleElement(visiblePageRatios);
      if (maxVisiblePageNumber) {
        setUserInput(maxVisiblePageNumber.toString());
      }
    }
  }, [visiblePageRatios]);

  const onPageNumberChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.currentTarget;
      // Decimal case
      if (!Number.isInteger(value)) {
        setUserInput(parseInt(value, 10).toString());
      }

      setUserInput(value);
      if (delayTimerRef.current) {
        clearTimeout(delayTimerRef.current);
      }

      const newPageNumber = parseInt(value, 10);
      if (newPageNumber >= minPage && newPageNumber <= numPages) {
        delayTimerRef.current = setTimeout(() => {
          scrollToPage({ pageNumber: newPageNumber });
        }, DELAY_SCROLL_TIME_OUT_MS);
      }
    },
    [minPage, numPages, scrollToPage]
  );

  const handleBlur = React.useCallback(() => {
    if (delayTimerRef.current) {
      clearTimeout(delayTimerRef.current);
    }
    const pageNumber = parseInt(userInput, 10);
    if (Number.isNaN(pageNumber)) {
      return;
    }
    scrollToPage({ pageNumber });
  }, [userInput]);

  return (
    <div className={classnames('reader__page-number-control', className)}>
      <input
        aria-label="Current Page"
        className="reader__page-number-control__current-page"
        type="number"
        name="currentPage"
        value={userInput}
        onChange={onPageNumberChange}
        onBlur={handleBlur}
      />
      {showDivider && <span className="reader__page-number-control__separator">/</span>}
      <input
        aria-label="Total Pages"
        className="reader__page-number-control__total-pages"
        type="number"
        value={numPages}
        disabled={true}
      />
    </div>
  );
};

PageNumberControl.defaultProps = {
  showDivider: true,
};
