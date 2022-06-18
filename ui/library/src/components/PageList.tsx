import classnames from 'classnames';
import * as React from 'react';

import { DocumentContext } from '../context/DocumentContext';
import { PageWrapper } from './PageWrapper';

export type Props = {
  className?: string;
  pageElementMap?: Map<number, React.ReactElement>;
};

export const PageList: React.FunctionComponent<Props> = ({ className, pageElementMap }: Props) => {
  const { numPages, scrollTarget, setScrollTarget } = React.useContext(DocumentContext);

  // ref for the scrollable region where the pages are rendered
  const scrollTargetRef = React.createRef<HTMLDivElement>();

  React.useEffect(() => {
    console.log('>>>>', scrollTargetRef);

    if (!scrollTarget && scrollTargetRef.current) {
      setScrollTarget(scrollTargetRef.current);
    }
  }, [scrollTargetRef]);

  return (
    <div className={classnames('reader__page-list', className)} ref={scrollTargetRef}>
      {Array.from({ length: numPages }).map((_, pageIndex) => (
        <PageWrapper key={pageIndex} pageIndex={pageIndex}>
          {pageElementMap && pageElementMap.get(pageIndex)}
        </PageWrapper>
      ))}
    </div>
  );
};
