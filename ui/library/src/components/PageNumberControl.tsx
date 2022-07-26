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
  const { numPages } = React.useContext(DocumentContext);
  const { scrollToPage, visiblePageNumbers } = React.useContext(ScrollContext);
  const [minPage, setMinPage] = React.useState(0);
  const [currentPage, setCurrentPage] = React.useState(0);

  React.useEffect(() => {
    if (numPages != 0) {
      setMinPage(1);
      setCurrentPage(1);
    }
  }, [numPages]);

  // TODO: update current page when scrolling down/up
  React.useEffect(() => {
    console.log(visiblePageNumbers);
  }, [visiblePageNumbers]);

  // TODO: scroll to the page specified by the user
  const onPageNumberChange = React.useCallback(
    event => {
      console.log(event);
    },
    [scrollToPage]
  );

  return (
    <div className={classnames('reader__page-number-control', className)}>
      <input
        className="reader__page-number-control__current-page"
        type="number"
        readOnly={isReadOnly}
        disabled={numPages == 0}
        value={currentPage}
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