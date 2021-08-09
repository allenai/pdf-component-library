import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

import { Drawer, Popover } from 'antd';
import { PDFDocumentProxy } from 'pdfjs-dist/types/display/api';
import * as React from 'react';
import { Outline } from 'react-pdf/dist/esm/entry.webpack';
import { RouteComponentProps } from 'react-router';
import { BrowserRouter, Route } from 'react-router-dom';

import { Header } from './components/Header';
import { BoundingBox } from './library/components/BoundingBox';
import { DocumentWrapper } from './library/components/DocumentWrapper';
import { HighlightOverlay } from './library/components/HighlightOverlay';
import { Overlay } from './library/components/Overlay';
import { PageWrapper } from './library/components/PageWrapper';
import { PageRotation, rotateClockwise, rotateCounterClockwise } from './library/rotate';
import { computePageSize, Size } from './library/scale';
import { scrollToPdfPage } from './library/scroll';
import { PageSizeContext } from './library/context/PageSizeContext';
import { TransformContext } from './library/context/TransformContext';
import { UiContext } from './library/context/UiContext';

type State = {
  pageSize: Size;
  isDrawerOpen: boolean;
  isLoading: boolean;
  isShowingHighlightOverlay: boolean;
  errorMessage: string | null;
  numPages: number;
  scale: number;
  rotation: PageRotation;
};

const TEST_PDF_URL = 'https://arxiv.org/pdf/math/0008020v2.pdf';

export class Reader extends React.Component<RouteComponentProps, State> {
  // ref for the div in which the Document component renders
  pdfContentRef = React.createRef<HTMLDivElement>();

  // ref for the scrollable region where the pages are rendered
  pdfScrollableRef = React.createRef<HTMLDivElement>();

  state = {
    pageSize: { height: 0, width: 0 },
    isDrawerOpen: false,
    isLoading: false,
    isShowingHighlightOverlay: false,
    errorMessage: null,
    numPages: 0,
    scale: 1.0,
    rotation: PageRotation.Rotate0,
  };

  componentDidMount(): void {
    fetch(TEST_PDF_URL).then(pdf => console.log(pdf));
  }

  handleOutlineClick = ({ pageNumber }: { pageNumber: string }): void => {
    scrollToPdfPage(pageNumber);
  };

  handleZoom = (multiplier: number): void => {
    this.setState(state => {
      return { scale: state.scale * multiplier };
    });
  };

  handleOpenDrawer = (): void => {
    this.setState({ isDrawerOpen: true });
  };

  handleCloseDrawer = (): void => {
    this.setState({ isDrawerOpen: false });
  };

  handleRotateCW = (): void => {
    this.setState(state => {
      return {
        rotation: rotateClockwise(state.rotation),
      };
    });
  };

  handleRotateCCW = (): void => {
    this.setState(state => {
      return {
        rotation: rotateCounterClockwise(state.rotation),
      };
    });
  };

  handleToggleHighlightOverlay = (): void => {
    this.setState(state => {
      return { isShowingHighlightOverlay: !state.isShowingHighlightOverlay };
    });
  };

  onPdfLoadSuccess = (pdfDoc: PDFDocumentProxy): void => {
    // getPage uses 1-indexed pageNumber, not 0-indexed pageIndex
    pdfDoc.getPage(1).then(page => {
      this.setState({
        pageSize: computePageSize({
          userUnit: page.userUnit,
          topLeft: { x: page.view[0], y: page.view[1] },
          bottomRight: { x: page.view[2], y: page.view[3] },
        }),
      });
    });
    this.setState({
      isLoading: false,
      numPages: pdfDoc.numPages,
      errorMessage: null,
    });
  };

  onPdfLoadError = (error: unknown): void => {
    this.setState({
      isLoading: false,
      errorMessage: getErrorMessage(error),
    });
  };

  renderPopoverContent = (pageNumber: number): React.ReactNode => {
    return <div>You clicked on page {pageNumber}.</div>;
  };

  renderOverlay = (index: number): React.ReactElement => {
    const pageNumber = index + 1;

    if (this.state.isShowingHighlightOverlay) {
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
          content={this.renderPopoverContent(index)}
          trigger="click"
          //@ts-ignore there's something wonky with the types here
          getPopupContainer={() => this.pdfScrollableRef.current}>
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
  };

  render(): React.ReactNode {
    const { errorMessage, isDrawerOpen, isLoading, isShowingHighlightOverlay, numPages, scale, pageSize, rotation } = this.state;
    return (
      <BrowserRouter>
        <Route path="/">
          <div className="reader__container">
            <div className="reader__header">
              <Header
                scale={scale}
                handleZoom={this.handleZoom}
                handleOpenDrawer={this.handleOpenDrawer}
                handleRotateCW={this.handleRotateCW}
                handleRotateCCW={this.handleRotateCCW}
                handleToggleHighlightOverlay={this.handleToggleHighlightOverlay}
              />
            </div>
            <DocumentWrapper
              className="reader__main"
              file={TEST_PDF_URL}
              onLoadError={this.onPdfLoadError}
              onLoadSuccess={this.onPdfLoadSuccess}
              inputRef={this.pdfContentRef}>
              <Drawer
                title="Outline"
                placement="left"
                visible={isDrawerOpen}
                mask={false}
                onClose={this.handleCloseDrawer}
                //@ts-ignore there's something wonky with the types here
                getContainer={() => {
                  // Passing this ref mounts the drawer "inside" the grid content area
                  // instead of using the entire browser height.
                  return this.pdfContentRef.current;
                }}
                className="reader__outline-drawer">
                <Outline onItemClick={this.handleOutlineClick} />
              </Drawer>
              <div className="reader__page-list" ref={this.pdfScrollableRef}>
                {Array.from({ length: numPages }).map((_, i) => (
                  <PageSizeContext.Provider value={{ pageSize }} key={i}>
                    <TransformContext.Provider value={{ rotation, scale }}>
                      <UiContext.Provider value={{ errorMessage, isDrawerOpen, isLoading, isShowingHighlightOverlay }}>
                        <PageWrapper
                          pageIndex={i}
                          scale={scale}
                          rotation={rotation}
                          pageSize={pageSize}>
                          {this.renderOverlay(i)}
                        </PageWrapper>
                      </UiContext.Provider>
                    </TransformContext.Provider>
                  </PageSizeContext.Provider>

                ))}
              </div>
            </DocumentWrapper>
          </div>
        </Route>
      </BrowserRouter>
    );
  }
}

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
