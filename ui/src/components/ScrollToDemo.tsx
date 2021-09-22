import * as React from 'react';

import { BoundingBox } from '../library/components/BoundingBox';

type Props = {
  // TODO: #28926 subtask choose between pageNumber/pageIndex
  pageIndex: number;
};

/*
 * Example target for the scroll util function
 */
export const ScrollToDemo: React.FunctionComponent<Props> = ({ pageIndex }: Props) => {
  const demoFigurePageIndex = 4;

  return (
    (pageIndex === demoFigurePageIndex && (
      <BoundingBox
        id="demoFigure"
        className="reader__sample-figure-scroll-bbox"
        top={100}
        left={250}
        height={340}
        width={320}
      />
    )) ||
    null
  );
};
