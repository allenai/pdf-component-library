import * as React from 'react';

import { PageSizeContext } from '../library/components/PageSizeContext';
import { rotateClockwise, rotateCounterClockwise } from '../library/rotate';
import { SimpleZoomControl } from './SimpleZoomControl';
import { UIContext } from '../library/components/UIContext';

export const Header: React.FunctionComponent = () => {
  const pageSizeContext = React.useContext(PageSizeContext);
  const uiContext = React.useContext(UIContext);

  function handleOpenDrawer(): void {
    uiContext.setIsDrawerOpen(true);
  }

  function handleToggleHighlightOverlay(): void {
    uiContext.setIsShowingHighlightOverlay(!uiContext.isShowingHighlightOverlay);
  };

  function handleRotateCW(): void {
    pageSizeContext.setRotation(rotateClockwise(pageSizeContext.rotation));
  }

  function handleRotateCCW(): void {
    pageSizeContext.setRotation(rotateCounterClockwise(pageSizeContext.rotation));
  }

  return (
    <div>
      I&apos;m a header!
      <br />
      <SimpleZoomControl />
      <br />
      <a onClick={handleOpenDrawer}>Outline</a>
      <a onClick={handleRotateCW}>↷</a>
      <a onClick={handleRotateCCW}>↶</a>
      <br />
      <a onClick={handleToggleHighlightOverlay}>Highlight Overlay</a>
    </div>
  );
}
