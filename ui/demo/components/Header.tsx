import { DownloadButton, PageNumberControl, scrollToId, UiContext } from '@allenai/pdf-components';
import classnames from 'classnames';
import * as React from 'react';

import { DemoHeaderContext } from '../context/DemoHeaderContext';
import { SimpleZoomControl } from './SimpleZoomControl';

type Props = {
  pdfUrl: string;
};

export const Header: React.FunctionComponent<Props> = ({ pdfUrl }: Props) => {
  const {
    isShowingHighlightOverlay,
    isShowingTextHighlight,
    setIsShowingHighlightOverlay,
    setIsShowingOutline,
    setIsShowingTextHighlight,
    setIsShowingThumbnail,
  } = React.useContext(UiContext);
  const { isShowingNoteTaking, setIsShowingNoteTaking } = React.useContext(DemoHeaderContext);

  const handleShowOutline = React.useCallback(() => {
    setIsShowingOutline(true);
  }, []);

  const handleShowThumbnail = React.useCallback(() => {
    setIsShowingThumbnail(true);
  }, []);

  const handleToggleHighlightOverlay = React.useCallback(() => {
    setIsShowingHighlightOverlay(!isShowingHighlightOverlay);
  }, [isShowingHighlightOverlay]);

  const handleToggleTextHighlight = React.useCallback(() => {
    setIsShowingTextHighlight(!isShowingTextHighlight);
  }, [isShowingTextHighlight]);

  const handleScrollToFigure = React.useCallback(() => {
    setIsShowingTextHighlight(false);
    setIsShowingHighlightOverlay(false);

    const id = 'demoFigure';
    scrollToId(id);
  }, []);

  const handleShowNoteTaking = React.useCallback(() => {
    setIsShowingNoteTaking(!isShowingNoteTaking);
  }, [isShowingNoteTaking]);

  return (
    <div className="reader__header">
      <div className="header-control">
        <PageNumberControl />
      </div>
      <div className="header-control">
        <SimpleZoomControl />
      </div>
      <div className="header-control">
        <a onClick={handleShowOutline}>Outline</a>
      </div>
      <div className="header-control">
        <a onClick={handleShowThumbnail}>Thumbnail</a>
      </div>
      <div className={classnames('header-control', { 'is-selected': isShowingHighlightOverlay })}>
        <a onClick={handleToggleHighlightOverlay}>Highlight Overlay</a>
      </div>
      <div className={classnames('header-control', { 'is-selected': isShowingTextHighlight })}>
        <a onClick={handleToggleTextHighlight}>Highlight Text</a>
      </div>
      <div className="header-control">
        <a onClick={handleScrollToFigure}>Scroll to Figure 1</a>
      </div>
      <div className={classnames('header-control', { 'is-selected': isShowingNoteTaking })}>
        <a onClick={handleShowNoteTaking}>Note Taking</a>
      </div>
      <DownloadButton pdfUrl={pdfUrl} />
    </div>
  );
};
