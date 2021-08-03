import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

import { Popover } from 'antd';
import { PDFDocumentProxy } from 'pdfjs-dist/types/display/api';
import * as React from 'react';

import { Header } from './components/Header';
import { BoundingBox } from './library/components/BoundingBox';
import { DocumentWrapper } from './library/components/DocumentWrapper';
import { HighlightOverlay } from './library/components/HighlightOverlay';
import { Outline } from './library/components/Outline';
import { Overlay } from './library/components/Overlay';
import { PageSizeContext } from './library/components/PageSizeContext';
import { PageWrapper } from './library/components/PageWrapper';
import { UIContext } from './library/components/UIContext';
import { getErrorMessage } from './library/errorUtils';
import { getPageNumber } from './library/pageNumber';
import { computePageSize } from './library/scale';

export const Reader: React.FunctionComponent = () => {
  const pageSizeContext = React.useContext(PageSizeContext);
  const uiContext = React.useContext(UIContext);

  const pdfUrl = 'https://arxiv.org/pdf/math/0008020v2.pdf';

  // ref for the scrollable region where the pages are rendered
  const pdfScrollableRef = React.createRef<HTMLDivElement>();

  function onPdfLoadSuccess(pdfDoc: PDFDocumentProxy): void {
    // getPage uses 1-indexed pageNumber, not 0-indexed pageIndex
    pdfDoc.getPage(1).then(page => {
      pageSizeContext.setPageSize(
        computePageSize({
          userUnit: page.userUnit,
          topLeft: { x: page.view[0], y: page.view[1] },
          bottomRight: { x: page.view[2], y: page.view[3] },
        })
      );
    });
    uiContext.setIsLoading(false);
    uiContext.setNumPages(pdfDoc.numPages);
    uiContext.setErrorMessage(null);
  }

  function onPdfLoadError(error: unknown): void {
    uiContext.setIsLoading(false);
    uiContext.setErrorMessage(getErrorMessage(error));
  }

  function renderPopoverContent(pageNumber: number): React.ReactNode {
    return <div>You clicked on page {pageNumber}.</div>;
  }

  function renderOverlay(index: number): React.ReactElement {
    const pageNumber = getPageNumber(undefined, index);

    if (uiContext.isShowingHighlightOverlay) {
      return (
        <HighlightOverlay pageNumber={pageNumber}>
          <BoundingBox
            className="reader__sample-highlight-overlay__bbox"
            top={280}
            left={250}
            height={20}
            width={425}
          />
          <BoundingBox
            className="reader__sample-highlight-overlay__bbox"
            top={300}
            left={120}
            height={55}
            width={550}
          />
          <BoundingBox
            className="reader__sample-highlight-overlay__bbox"
            top={350}
            left={120}
            height={20}
            width={240}
          />
        </HighlightOverlay>
      );
    }

    return (
      <Overlay>
        <Popover
          content={renderPopoverContent(index)}
          trigger="click"
          //@ts-ignore there's something wonky with the types here
          getPopupContainer={() => pdfScrollableRef.current}>
          <BoundingBox
            className="reader__sample-overlay__bbox"
            top={10 + index * 50}
            left={10 + index * 50}
            height={30}
            width={30}
          />
        </Popover>
      </Overlay>
    );
  }

  return (
    <div className="reader__container">
      <div className="reader__header">
        <Header />
      </div>
      <DocumentWrapper
        className={uiContext.drawerContainerClass}
        file={pdfUrl}
        onLoadError={onPdfLoadError}
        onLoadSuccess={onPdfLoadSuccess}>
        <Outline />
        <div className="reader__page-list" ref={pdfScrollableRef}>
          {Array.from({ length: uiContext.numPages }).map((_, i) => (
            <PageWrapper key={i} pageIndex={i}>
              {renderOverlay(i)}
            </PageWrapper>
          ))}
        </div>
      </DocumentWrapper>
    </div>
  );
};
