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
  return (
    <BoundingBox
      id={`demoFigure_${pageIndex}`}
      className="reader__sample-figure-scroll-bbox"
      top={380}
      left={105}
      height={110}
      width={600}
    />
  );
};
