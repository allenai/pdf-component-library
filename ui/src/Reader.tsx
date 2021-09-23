import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { BrowserRouter, Route } from 'react-router-dom';

import { CitationsDemo } from './components/CitationsDemo';
import { Header } from './components/Header';
import { HighlightOverlayDemo } from './components/HighlightOverlayDemo';
import { Outline } from './components/Outline';
import { ScrollToDemo } from './components/ScrollToDemo';
import { TextHighlightDemo } from './components/TextHighlightDemo';
import { DocumentWrapper } from './library/components/DocumentWrapper';
import { Overlay } from './library/components/Overlay';
import { PageWrapper } from './library/components/PageWrapper';
import { DocumentContext } from './library/context/DocumentContext';
import { TransformContext } from './library/context/TransformContext';

export const Reader: React.FunctionComponent<RouteComponentProps> = () => {
  const TEST_PDF_URL = 'https://arxiv.org/pdf/math/0008020v2.pdf';

  // ref for the div in which the Document component renders
  const pdfContentRef = React.createRef<HTMLDivElement>();

  // ref for the scrollable region where the pages are rendered
  const pdfScrollableRef = React.createRef<HTMLDivElement>();

  const { rotation, scale } = React.useContext(TransformContext);
  const { numPages, pageSize } = React.useContext(DocumentContext);

  return (
    <BrowserRouter>
      <Route path="/">
        <div className="reader__container">
          <div className="reader__header">
            <Header />
          </div>
          <DocumentWrapper className="reader__main" file={TEST_PDF_URL} inputRef={pdfContentRef}>
            <Outline parentRef={pdfContentRef} />
            <div className="reader__page-list" ref={pdfScrollableRef}>
              {Array.from({ length: numPages }).map((_, i) => (
                <PageWrapper
                  key={i}
                  pageIndex={i}
                  scale={scale}
                  rotation={rotation}
                  pageSize={pageSize}>
                  <Overlay>
                    <HighlightOverlayDemo pageIndex={i} />
                    <TextHighlightDemo pageIndex={i} />
                    <ScrollToDemo pageIndex={i} />
                    <CitationsDemo parentRef={pdfScrollableRef} />
                  </Overlay>
                </PageWrapper>
              ))}
            </div>
          </DocumentWrapper>
        </div>
      </Route>
    </BrowserRouter>
  );
};
