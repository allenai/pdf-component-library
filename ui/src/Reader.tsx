import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

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
import { computePageSize, PdfPixelSize } from './library/scale';
import { scrollToPdfPage } from './library/scroll';
import { Nullable } from './types';

type State = {
  pdfSize: Nullable<PdfPixelSize>;
  isLoading: boolean;
  isShowingHighlightOverlay: boolean;
  errorMsg: string | null;
  numPages: number;
  scale: number;
};

const TEST_PDF_URL = 'https://arxiv.org/pdf/math/0008020v2.pdf';

export class Reader extends React.Component<RouteComponentProps, State> {
  state = {
    pdfSize: null,
    isLoading: false,
    isShowingHighlightOverlay: false,
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

  handleToggleHighlightOverlay = (): void => {
    this.setState(state => {
      return { isShowingHighlightOverlay: !state.isShowingHighlightOverlay };
    });
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

  renderOverlay = (index: number): React.ReactNode => {
    const pageNumber = index + 1;
    const top = 300 + index * 50;
    const width = 300;

    if (this.state.isShowingHighlightOverlay) {
      return <HighlightOverlay pageNumber={pageNumber}>
        <BoundingBox
          className="reader__sample-highlight-overlay__bbox"
          top={top}
          left={top}
          height={width}
          width={width}
        />
        <BoundingBox
          className="reader__sample-highlight-overlay__bbox"
          top={top + width}
          left={top}
          height={width}
          width={width}
        />
      </HighlightOverlay>;
    }

    return <Overlay>
      <BoundingBox
        className="reader__sample-overlay__bbox"
        top={top}
        left={top}
        height={width}
        width={width}
        onClick={() => window.alert(`You clicked on page ${pageNumber}!!`)}
      />
    </Overlay>;
  };

  render(): React.ReactNode {
    const { numPages, scale, pdfSize } = this.state;
    return (
      <BrowserRouter>
        <Route path="/">
          <div className="reader__container">
            <div className="reader__header">
              <Header scale={scale} handleZoom={this.handleZoom} handleToggleHighlightOverlay={this.handleToggleHighlightOverlay} />
            </div>
            <DocumentWrapper
              className="reader__main"
              file={TEST_PDF_URL}
              onLoadError={this.onPdfLoadError}
              onLoadSuccess={this.onPdfLoadSuccess}>
              <div className="reader__sidebar">
                <Outline onItemClick={this.handleOutlineClick} />
              </div>
              <div className="reader__page-list">
                {Array.from({ length: numPages }).map((_, i) => (
                  <PageWrapper key={i} pageIndex={i} scale={scale} pageSize={pdfSize}>
                    {this.renderOverlay(i)}
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
