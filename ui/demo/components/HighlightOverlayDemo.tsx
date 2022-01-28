import { BoundingBox, BoundingBoxType, HighlightOverlay, UiContext } from '@allenai/pdf-components';
import * as React from 'react';

type Props = {
  pageIndex: number;
};

/*
 * Example of the HighlightOverlay component
 */
export const HighlightOverlayDemo: React.FunctionComponent<Props> = ({ pageIndex }: Props) => {
  const { isShowingHighlightOverlay } = React.useContext(UiContext);
  if (!isShowingHighlightOverlay) {
    return null;
  }

  function getBoundingBoxProps(): Array<BoundingBoxType> {
    return [
      {
        page: 0,
        top: 465,
        left: 500,
        height: 15,
        width: 140,
      },
      {
        page: 0,
        top: 480,
        left: 180,
        height: 15,
        width: 450,
      },
      {
        page: 0,
        top: 495,
        left: 180,
        height: 15,
        width: 450,
      },
      {
        page: 0,
        top: 510,
        left: 180,
        height: 15,
        width: 105,
      },
      {
        page: 1,
        top: 235,
        left: 130,
        height: 15,
        width: 550,
      },
      {
        page: 1,
        top: 250,
        left: 130,
        height: 15,
        width: 550,
      },
      {
        page: 1,
        top: 265,
        left: 130,
        height: 15,
        width: 200,
      },
    ];
  }

  function renderHighlightOverlayBoundingBoxes(): Array<React.ReactElement> {
    const boxes: Array<React.ReactElement> = [];
    getBoundingBoxProps().map((prop, i) => {
      // Only render this BoundingBox if it belongs on the current page
      if (prop.page === pageIndex) {
        const props = {
          ...prop,
          className: 'reader__sample-highlight-overlay__bbox',
          isHighlighted: false,
          key: i,
        };

        boxes.push(<BoundingBox {...props} />);
      }
    });
    return boxes;
  }

  return (
    <HighlightOverlay pageIndex={pageIndex}>
      {renderHighlightOverlayBoundingBoxes()}
    </HighlightOverlay>
  );
};
