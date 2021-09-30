import * as React from 'react';

import { BoundingBox } from '../library/components/BoundingBox';
import { UiContext } from '../library/context/UiContext';
import { BoundingBox as BoundingBoxType } from '../library/types';

type Props = {
  pageIndex: number;
};

/*
 * Example of BoundingBoxes used as text highlights
 */
export const TextHighlightDemo: React.FunctionComponent<Props> = ({ pageIndex }: Props) => {
  const { isShowingTextHighlight } = React.useContext(UiContext);
  if (!isShowingTextHighlight) {
    return null;
  }

  function getBoundingBoxProps(): Array<BoundingBoxType> {
    return [
      {
        page: 0,
        top: 170,
        left: 415,
        height: 30,
        width: 110,
      },
      {
        page: 0,
        top: 421,
        left: 283,
        height: 15,
        width: 55,
      },
      {
        page: 0,
        top: 830,
        left: 387,
        height: 15,
        width: 56,
      },
      {
        page: 1,
        top: 213,
        left: 315,
        height: 15,
        width: 55,
      },
      {
        page: 1,
        top: 477,
        left: 395,
        height: 15,
        width: 55,
      },
      {
        page: 1,
        top: 844,
        left: 618,
        height: 15,
        width: 55,
      },
    ];
  }

  function renderHighlightedBoundingBoxes(): Array<React.ReactElement> {
    const boxes: Array<React.ReactElement> = [];
    getBoundingBoxProps().map((prop, i) => {
      // Only render this BoundingBox if it belongs on the current page
      if (prop.page === pageIndex) {
        const props = {
          ...prop,
          className: 'reader__sample-text-highlight__bbox',
          // Set isHighlighted to true for highlighted styling
          isHighlighted: true,
          key: i,
        };

        boxes.push(<BoundingBox {...props} />);
      }
    });
    return boxes;
  }

  return <React.Fragment>{renderHighlightedBoundingBoxes()}</React.Fragment>;
};
