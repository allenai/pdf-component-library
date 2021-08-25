import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

import { Popover } from 'antd';
import { PDFDocumentProxy } from 'pdfjs-dist/types/display/api';
import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { BrowserRouter, Route } from 'react-router-dom';

import { Header } from './components/Header';
import { Outline } from './components/Outline';
import { BoundingBox, BoundingBoxProps } from './library/components/BoundingBox';
import { DocumentWrapper } from './library/components/DocumentWrapper';
import { HighlightOverlay } from './library/components/HighlightOverlay';
import { Overlay } from './library/components/Overlay';
import { PageWrapper } from './library/components/PageWrapper';
import { DocumentContext } from './library/context/DocumentContext';
import { TransformContext } from './library/context/TransformContext';
import { UiContext } from './library/context/UiContext';
import { rotateClockwise, rotateCounterClockwise } from './library/rotate';
import { computePageSize } from './library/scale';

export const Reader: React.FunctionComponent<RouteComponentProps> = () => {
  const TEST_PDF_URL = 'https://arxiv.org/pdf/math/0008020v2.pdf';

  // ref for the div in which the Document component renders
  const pdfContentRef = React.createRef<HTMLDivElement>();

  // ref for the scrollable region where the pages are rendered
  const pdfScrollableRef = React.createRef<HTMLDivElement>();

  const {
    isShowingHighlightOverlay,
    isShowingTextHighlight,
    setErrorMessage,
    setIsLoading,
    setIsShowingHighlightOverlay,
    setIsShowingOutline,
    setIsShowingTextHighlight,
  } = React.useContext(UiContext);
  const { rotation, scale, setRotation } = React.useContext(TransformContext);
  const { numPages, pageSize, setNumPages, setPageSize } = React.useContext(DocumentContext);

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

  function onPdfLoadSuccess(pdfDoc: PDFDocumentProxy): void {
    // getPage uses 1-indexed pageNumber, not 0-indexed pageIndex
    pdfDoc.getPage(1).then(page => {
      setPageSize(
        computePageSize({
          userUnit: page.userUnit,
          topLeft: { x: page.view[0], y: page.view[1] },
          bottomRight: { x: page.view[2], y: page.view[3] },
        })
      );
    });
    setIsLoading(false);
    setNumPages(pdfDoc.numPages);
    setErrorMessage(null);
  }

  function onPdfLoadError(error: unknown): void {
    setIsLoading(false);
    setErrorMessage(getErrorMessage(error));
  }

  // TODO: #29079 remove this once UI design is finalized and we have real data
  function renderPopoverContent(pageNumber: number): React.ReactNode {
    return <div>You clicked on page {pageNumber}.</div>;
  }

  // TODO: #29079 remove this once we have real data
  function getDemoBoundingBoxProps(): Array<BoundingBoxProps> {
    return [
      {
        top: 280,
        left: 250,
        height: 20,
        width: 420,
      },
      {
        top: 300,
        left: 130,
        height: 55,
        width: 540,
      },
      {
        top: 355,
        left: 130,
        height: 20,
        width: 225,
      },
    ];
  }

  // TODO: #29079 remove this once we have real data and UI design
  function renderHighlightOverlayBoundingBox(
    boxProps: BoundingBoxProps,
    index: number
  ): React.ReactElement {
    const props = {
      ...boxProps,
      className: 'reader__sample-highlight-overlay__bbox',
      isHighlighted: false,
      key: index,
    };

    return <BoundingBox {...props} />;
  }

  // TODO: #29079 remove this once we have real data and UI design
  function renderTextHighlightBoundingBox(
    boxProps: BoundingBoxProps,
    index: number
  ): React.ReactElement {
    const props = {
      ...boxProps,
      className: 'reader__sample-text-highlight__bbox',
      isHighlighted: true,
      key: index,
    };

    return <BoundingBox {...props} />;
  }

  // TODO: #29079 remove this once we have real data and UI design
  function renderOverlay(index: number): React.ReactElement {
    const pageNumber = index + 1;

    // example of highlight overlay with unmasked bounding boxes
    if (isShowingHighlightOverlay) {
      return (
        <HighlightOverlay pageNumber={pageNumber}>
          {getDemoBoundingBoxProps().map((prop, i) => renderHighlightOverlayBoundingBox(prop, i))}
        </HighlightOverlay>
      );
    }

    // example of standard overlay with "highlighted" bounding boxes
    if (isShowingTextHighlight) {
      return (
        <Overlay>
          {getDemoBoundingBoxProps().map((prop, i) => renderTextHighlightBoundingBox(prop, i))}
        </Overlay>
      );
    }

    return (
      // example of standard overlay with bounding boxes that display
      // popover example on click
      <Overlay>
        <Popover
          // TODO: #28926 Fix renderPopoverContent to use pageNumber, not index
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
    <BrowserRouter>
      <Route path="/">
        <div className="reader__container">
          <div className="reader__header">
            <Header
              handleShowOutline={handleShowOutline}
              handleRotateCW={handleRotateCW}
              handleRotateCCW={handleRotateCCW}
              handleToggleHighlightOverlay={handleToggleHighlightOverlay}
              handleToggleHighlightText={handleToggleTextHighlight}
            />
          </div>
          <DocumentWrapper
            className="reader__main"
            file={TEST_PDF_URL}
            // TODO: #28926 Improve performance by using callbacks for load handlers
            onLoadError={onPdfLoadError}
            onLoadSuccess={onPdfLoadSuccess}
            inputRef={pdfContentRef}>
            <Outline parentRef={pdfContentRef} />
            <div className="reader__page-list" ref={pdfScrollableRef}>
              {Array.from({ length: numPages }).map((_, i) => (
                <PageWrapper
                  key={i}
                  pageIndex={i}
                  scale={scale}
                  rotation={rotation}
                  pageSize={pageSize}>
                  {renderOverlay(i)}
                </PageWrapper>
              ))}
            </div>
          </DocumentWrapper>
        </div>
      </Route>
    </BrowserRouter>
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getErrorMessage(error: any): string {
  if (!error) {
    return 'Unknown error';
  }
  if (typeof error === 'string') {
    return error;
  }
  if (error instanceof Error) {
    return error.message;
  }
  if (typeof error.error === 'string') {
    return error.error;
  }
  return error.toString();
}
