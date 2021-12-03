import * as React from 'react';

import { BoundingBox } from '../../library/src/components/BoundingBox';

type Props = {
  pageIndex: number;
};

/*
 * Example target for the scroll util function
 */
export const ScrollToDemo: React.FunctionComponent<Props> = ({ pageIndex }: Props) => {
  const boundingBoxProps = {
    page: 4,
    top: 100,
    left: 250,
    height: 340,
    width: 320,
  };

  if (pageIndex !== boundingBoxProps.page) {
    return null;
  }

  return (
    <BoundingBox
      id="demoFigure"
      className="reader__sample-figure-scroll-bbox"
      {...boundingBoxProps}
    />
  );
};
