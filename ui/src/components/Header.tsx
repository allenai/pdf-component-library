import * as React from 'react';

import { TransformContext } from '../library/context/TransformContext';
import { UiContext } from '../library/context/UiContext';
import { rotateClockwise, rotateCounterClockwise } from '../library/rotate';
import { scrollTo } from '../library/scroll';
import { SimpleZoomControl } from './SimpleZoomControl';

export const Header: React.FunctionComponent = () => {
  const {
    isShowingHighlightOverlay,
    isShowingTextHighlight,
    setIsShowingHighlightOverlay,
    setIsShowingOutline,
    setIsShowingTextHighlight,
  } = React.useContext(UiContext);
  const { rotation, setRotation } = React.useContext(TransformContext);

  function handleShowOutline(): void {
    setIsShowingOutline(true);
  }

  function handleRotateCW(): void {
    setRotation(rotateClockwise(rotation));
  }

  function handleRotateCCW(): void {
    setRotation(rotateCounterClockwise(rotation));
  }

  // TODO: #29079 remove this once UI design is finalized
  function handleToggleHighlightOverlay(): void {
    // Store new value in a temp variable because state value updates are batched and
    // executed once this function returns. Otherwise we won't get the correct value
    // for isShowingHighlightOverlay down below
    const newVal = !isShowingHighlightOverlay;
    setIsShowingHighlightOverlay(newVal);

    if (newVal) {
      setIsShowingTextHighlight(false);
    }
  }

  // TODO: #29079 remove this once UI design is finalized
  function handleToggleTextHighlight(): void {
    // Store new value in a temp variable because state value updates are batched and
    // executed once this function returns. Otherwise we won't get the correct value
    // for isShowingTextHighlight down below
    const newVal = !isShowingTextHighlight;
    setIsShowingTextHighlight(newVal);
    if (newVal) {
      setIsShowingHighlightOverlay(false);
    }
  }

  // TODO: #29079 remove this once UI design is finalized and we have real data
  function handleScrollToFigure(): void {
    setIsShowingTextHighlight(false);
    setIsShowingHighlightOverlay(false);

    const id = 'demoFigure_1';
    scrollTo(id);
  }

  return (
    <div className="reader__header">
      <div className="header-control">
        <SimpleZoomControl />
      </div>
      <div className="header-control">
        Rotate
        <a onClick={handleRotateCW}>↷</a>
        <a onClick={handleRotateCCW}>↶</a>
      </div>
      <div className="header-control">
        <a onClick={handleShowOutline}>Outline</a>
      </div>
      <div className="header-control">
        <a onClick={handleToggleHighlightOverlay}>Highlight Overlay</a>
      </div>
      <div className="header-control">
        <a onClick={handleToggleTextHighlight}>Highlight Text</a>
      </div>
      <div className="header-control">
        <a onClick={handleScrollToFigure}>Scroll to Figure 1</a>
      </div>
    </div>
  );
};
