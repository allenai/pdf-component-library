import * as React from 'react';

import { BoundingBox } from '../library/components/BoundingBox';
import { UiContext } from '../library/context/UiContext';
import { BoundingBox as BoundingBoxType } from '../library/types';

type Props = {
  // TODO: #28926 subtask choose between pageNumber/pageIndex
  pageIndex: number;
};

/*
 * Example of BoundingBoxes used as text highlights
 */
export const TextHighlightDemo: React.FunctionComponent<Props> = ({ pageIndex }: Props) => {
  const { isShowingTextHighlight } = React.useContext(UiContext);

  function getBoundingBoxProps(): Array<BoundingBoxType> {
    return [
      {
        page: 0,
        top: 280,
        left: 250,
        height: 20,
        width: 420,
      },
      {
        page: 0,
        top: 300,
        left: 130,
        height: 55,
        width: 540,
      },
      {
        page: 0,
        top: 355,
        left: 130,
        height: 20,
        width: 225,
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

  return (isShowingTextHighlight && <div>{renderHighlightedBoundingBoxes()}</div>) || null;
};
