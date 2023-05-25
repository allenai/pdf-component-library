import classnames from 'classnames';
import * as React from 'react';

import { DocumentContext } from '../context/DocumentContext';
import { ScrollContext } from '../context/ScrollContext';
import { getMaxVisibleElement } from '../utils/MaxVisibleElement';

export type Props = {
  className?: string;
};

type TODO__TIMER = any;

const DELAY_SCROLL_TIME_OUT_MS = 1000;

export const PageNumberControl: React.FunctionComponent<Props> = ({ className }: Props) => {
  const delayTimerRef = React.useRef<TODO__TIMER>();
  const { numPages } = React.useContext(DocumentContext);
  const { scrollToPage, visiblePageRatios } = React.useContext(ScrollContext);
  const [minPage, setMinPage] = React.useState<number>(0);
  const [userInput, setUserInput] = React.useState<string>('0');

  // Initialize page control element
  React.useEffect(() => {
    if (numPages != 0) {
      setMinPage(1);
    }
  }, [numPages]);

  // Everytime we scroll through the page this useEffect
  // will trigger and set current page based on our current
  // scroll position
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

      // After user input the page that they want to scroll to
      // our ref will start setting a delay around 1s before scroll
      // to the position that user desire
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

    delayTimerRef.current = setTimeout(() => {
      scrollToPage({ pageNumber: pageNumber });
    }, DELAY_SCROLL_TIME_OUT_MS);
  }, [userInput, scrollToPage]);

  return (
    <div className={classnames('pdf-reader__page-number-control', className)}>
      <input
        aria-label="Current Page"
        className="pdf-reader__page-number-control__current-page"
        type="number"
        name="currentPage"
        value={userInput}
        onChange={onPageNumberChange}
        onBlur={handleBlur}
      />
      <span className="pdf-reader__page-number-control__separator ">/</span>
      <span aria-label="Total Pages" className="pdf-reader__page-number-control__total-pages">
        {numPages}
      </span>
    </div>
  );
};
