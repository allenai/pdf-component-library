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
import { Overlay } from './library/components/Overlay';
import { PageWrapper } from './library/components/PageWrapper';
import { computePageSize, PdfPixelSize } from './library/scale';
import { scrollToPdfPage } from './library/scroll';
import { Nullable } from './types';

type State = {
  pdfSize: Nullable<PdfPixelSize>;
  isDrawerOpen: boolean;
  isLoading: boolean;
  errorMsg: string | null;
  numPages: number;
  scale: number;
};

const TEST_PDF_URL = 'https://arxiv.org/pdf/math/0008020v2.pdf';

export class Reader extends React.Component<RouteComponentProps, State> {
  // ref for the div in which the Document component renders
  pdfContentRef = React.createRef<HTMLDivElement>();

  // ref for the scrollable region where the pages are rendered
  pdfScrollableRef = React.createRef<HTMLDivElement>();

  state = {
    pdfSize: null,
    isDrawerOpen: false,
    isLoading: false,
    errorMsg: null,
    numPages: 0,
    scale: 1.0,
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

  onPdfLoadSuccess = (pdfDoc: PDFDocumentProxy): void => {
    // getPage uses 1-indexed pageNumber, not 0-indexed pageIndex
    pdfDoc.getPage(1).then(page => {
      this.setState({
        pdfSize: computePageSize({
          userUnit: page.userUnit,
          topLeft: { x: page.view[0], y: page.view[1] },
          bottomRight: { x: page.view[2], y: page.view[3] },
        }),
      });
    });
    this.setState({
      isLoading: false,
      numPages: pdfDoc.numPages,
      errorMsg: null,
    });
  };

  onPdfLoadError = (error: unknown): void => {
    this.setState({
      isLoading: false,
      errorMsg: getErrorMessage(error),
    });
  };

  renderPopoverContent = (pageNumber: number): React.ReactNode => {
    return <div>You clicked on page {pageNumber}.</div>;
  };

  render(): React.ReactNode {
    const { isDrawerOpen, numPages, scale, pdfSize } = this.state;
    return (
      <BrowserRouter>
        <Route path="/">
          <div className="reader__container">
            <div className="reader__header">
              <Header
                scale={scale}
                handleZoom={this.handleZoom}
                handleOpenDrawer={this.handleOpenDrawer}
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
                  <PageWrapper key={i} pageIndex={i} scale={scale} pageSize={pdfSize}>
                    <Overlay>
                      <Popover
                        content={this.renderPopoverContent(i)}
                        trigger="click"
                        //@ts-ignore there's something wonky with the types here
                        getPopupContainer={() => this.pdfScrollableRef.current}>
                        <BoundingBox
                          className="reader__sample-overlay__bbox"
                          top={10 + i * 50}
                          left={10 + i * 50}
                          height={30}
                          width={30}
                        />
                      </Popover>
                    </Overlay>
                  </PageWrapper>
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
