import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

import { PDFDocumentProxy } from 'pdfjs-dist/types/display/api';
import React from 'react';
import { Outline } from 'react-pdf/dist/esm/entry.webpack';
import { RouteComponentProps } from 'react-router';
import { BrowserRouter, Route } from 'react-router-dom';

import BoundingBox from './components/BoundingBox';
import DocumentWrapper from './components/DocumentWrapper';
import Header from './components/Header';
import Overlay from './components/Overlay';
import PageWrapper from './components/PageWrapper';
import { computePageSize } from './scale';
import { scrollToPdfPage } from './scroll';
import { Nullable, PdfPixelSize } from './types';

type State = {
  pdfSize: Nullable<PdfPixelSize>;
  isLoading: boolean;
  errorMsg: string | null;
  numPages: number;
  scale: number;
};

const TEST_PDF_URL = 'https://arxiv.org/pdf/math/0008020v2.pdf';

export default class Reader extends React.Component<RouteComponentProps, State> {
  state = {
    pdfSize: null,
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

  render(): React.ReactNode {
    const { numPages, scale, pdfSize } = this.state;
    return (
      <BrowserRouter>
        <Route path="/">
          <div className="reader__container">
            <div className="reader__header">
              <Header scale={scale} handleZoom={this.handleZoom} />
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
                    <Overlay>
                      <BoundingBox
                        top={10 + i * 50}
                        left={10 + i * 50}
                        height={30}
                        width={30}
                        fill="#ff0000"
                        stroke="#00ff00"
                        onClick={() => window.alert(`You clicked on page ${i + 1}!!`)}
                      />
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
