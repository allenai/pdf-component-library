import * as React from 'react';

import { TransformContext } from '../../src/library/context/TransformContext';
import { UiContext } from '../../src/library/context/UiContext';
import { rotateClockwise, rotateCounterClockwise } from '../../src/library/rotate';
import { scrollTo } from '../../src/library/scroll';
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

  const handleShowOutline = React.useCallback(() => {
    setIsShowingOutline(true);
  }, []);

  const handleRotateCW = React.useCallback(() => {
    setRotation(rotateClockwise(rotation));
  }, [rotation]);

  const handleRotateCCW = React.useCallback(() => {
    setRotation(rotateCounterClockwise(rotation));
  }, [rotation]);

  // TODO: #29079 remove this once UI design is finalized
  const handleToggleHighlightOverlay = React.useCallback(() => {
    // Store new value in a temp variable because state value updates are batched and
    // executed once this function returns. Otherwise we won't get the correct value
    // for isShowingHighlightOverlay down below
    const newVal = !isShowingHighlightOverlay;
    setIsShowingHighlightOverlay(newVal);

    if (newVal) {
      setIsShowingTextHighlight(false);
    }
  }, [isShowingHighlightOverlay]);

  // TODO: #29079 remove this once UI design is finalized
  const handleToggleTextHighlight = React.useCallback(() => {
    // Store new value in a temp variable because state value updates are batched and
    // executed once this function returns. Otherwise we won't get the correct value
    // for isShowingTextHighlight down below
    const newVal = !isShowingTextHighlight;
    setIsShowingTextHighlight(newVal);
    if (newVal) {
      setIsShowingHighlightOverlay(false);
    }
  }, [isShowingTextHighlight]);

  // TODO: #29079 remove this once UI design is finalized and we have real data
  const handleScrollToFigure = React.useCallback(() => {
    setIsShowingTextHighlight(false);
    setIsShowingHighlightOverlay(false);

    const id = 'demoFigure';
    scrollTo(id);
  }, []);

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
