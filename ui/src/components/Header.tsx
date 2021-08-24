import * as React from 'react';

import { TransformContext } from '../library/context/TransformContext';
import { UiContext } from '../library/context/UiContext';
import { rotateClockwise, rotateCounterClockwise } from '../library/rotate';
import { SimpleZoomControl } from './SimpleZoomControl';

export const Header: React.FunctionComponent = () => {
  const { rotation, setRotation } = React.useContext(TransformContext);
  const {
    isShowingHighlightOverlay,
    isShowingTextHighlight,
    setIsDrawerOpen,
    setIsShowingHighlightOverlay,
    setIsShowingTextHighlight,
  } = React.useContext(UiContext);

  function handleOpenDrawer() {
    setIsDrawerOpen(true);
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

  return (
    <div>
      <SimpleZoomControl />
      <br />
      <a onClick={handleOpenDrawer}>Outline</a>
      <a onClick={handleRotateCW}>↷</a>
      <a onClick={handleRotateCCW}>↶</a>
      <br />
      <a onClick={handleToggleHighlightOverlay}>Highlight Overlay</a>
      <br />
      <a onClick={handleToggleTextHighlight}>Highlight Text</a>
    </div>
  );
};
