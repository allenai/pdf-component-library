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
  const { scrollToPage, visiblePageNumbers, getMaxVisibleElement } =
    React.useContext(ScrollContext);
  const [minPage, setMinPage] = React.useState(0);
  const [currentPage, setCurrentPage] = React.useState(0);
  const [isUserInput, setIsUserInput] = React.useState(false);
  const [isDisabled, setIsDisabled] = React.useState(true);

  // Initialize page control element
  React.useEffect(() => {
    if (numPages != 0) {
      setMinPage(1);
      setCurrentPage(1);
      setIsDisabled(false);
    }
  }, [numPages]);

  React.useEffect(() => {
    if (isUserInput && controlRef.current) {
      controlRef.current.value = currentPage.toString();
      return;
    }
    if (visiblePageNumbers.size !== 0 && controlRef.current && !isUserInput) {
      setCurrentPage(getMaxVisibleElement(visiblePageNumbers));
      controlRef.current.value = getMaxVisibleElement(visiblePageNumbers).toString();
    }
  }, [controlRef, visiblePageNumbers]);

  const onPageNumberChange = React.useCallback(
    event => {
      if (!controlRef || !controlRef.current) {
        return;
      }
      setIsUserInput(true);
      const newPageNumber = parseInt(event.target.value, 10);
      if (newPageNumber <= minPage || newPageNumber >= numPages) {
        if (controlRef.current) {
          controlRef.current.value = currentPage.toString();
          setIsUserInput(false);
        }
      }
      if (newPageNumber >= minPage && newPageNumber <= numPages) {
        setTimeout(() => {
          scrollToPage({ pageNumber: newPageNumber });
          setCurrentPage(newPageNumber);
        });
        setIsUserInput(false);
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
        name="currentPage"
        readOnly={isReadOnly}
        disabled={isDisabled}
        onChange={onPageNumberChange}
      />
      {showDivider && <span className="reader__page-number-control__separator">/</span>}
      <input
        className="reader__page-number-control__total-pages"
        type="number"
        value={numPages}
        disabled={true}
      />
    </div>
  );
};

PageNumberControl.defaultProps = {
  isReadOnly: false,
  showDivider: true,
};
