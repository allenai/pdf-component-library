import classnames from 'classnames';
import * as React from 'react';

import { DocumentContext } from '../context/DocumentContext';
import { ScrollContext } from '../context/ScrollContext';

export type Props = {
  isReadOnly?: boolean;
  showDivider?: boolean;
  className?: string;
};

export const PageNumberControl: React.FunctionComponent<Props> = ({
  isReadOnly,
  showDivider,
  className,
}: Props) => {
  const controlRef = React.createRef<HTMLInputElement>();
  const { numPages } = React.useContext(DocumentContext);
  const { scrollToPage, visiblePageNumbers } = React.useContext(ScrollContext);
  const [minPage, setMinPage] = React.useState(0);
  const [currentPage, setCurrentPage] = React.useState(0);
  const [isDisabled, setIsDisabled] = React.useState(true);

  // Initialize page control element
  React.useEffect(() => {
    if (numPages != 0) {
      setMinPage(1);
      setCurrentPage(1);
      setIsDisabled(false);
    }
  }, [numPages]);

  // TODO: update current page when scrolling down or up
  React.useEffect(() => {
    console.log(visiblePageNumbers, controlRef);
  }, [controlRef, visiblePageNumbers]);

  // TODO: scroll to the page specified by the user
  const onPageNumberChange = React.useCallback(
    event => {
      if (!controlRef || !controlRef.current) {
        return;
      }

      const newPageNumber = parseInt(event.target.value, 10);
      console.log(controlRef, newPageNumber);
      if (newPageNumber >= minPage && newPageNumber <= numPages) {
        console.log('in!', newPageNumber);
        scrollToPage({ pageNumber: newPageNumber });
        setCurrentPage(newPageNumber);
      }
    },
    [controlRef, minPage, numPages, scrollToPage]
  );

  return (
    <div className={classnames('reader__page-number-control', className)}>
      <input
        ref={controlRef}
        className="reader__page-number-control__current-page"
        type="number"
        readOnly={isReadOnly}
        disabled={isDisabled}
        min={minPage}
        max={numPages}
        onChange={onPageNumberChange}
      />
      {showDivider && '/'}
      <span className="reader__page-number-control__total-pages">{numPages}</span>
    </div>
  );
};

PageNumberControl.defaultProps = {
  isReadOnly: false,
  showDivider: true,
};
