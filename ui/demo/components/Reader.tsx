import { DocumentContext, DocumentWrapper, Overlay, PageWrapper } from '@allenai/pdf-components';
import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { BrowserRouter, Route } from 'react-router-dom';

import { Header } from './Header';
import { Outline } from './Outline';
import { PDODContextProvider } from './PDODContext';
import { PDODLayers } from './PDODLayers';
import { ScrollToDemo } from './ScrollToDemo';

export const Reader: React.FunctionComponent<RouteComponentProps> = () => {
  const { numPages } = React.useContext(DocumentContext);

  // ref for the div in which the Document component renders
  const pdfContentRef = React.createRef<HTMLDivElement>();

  // ref for the scrollable region where the pages are rendered
  const pdfScrollableRef = React.createRef<HTMLDivElement>();

  const samplePdfUrl = 'https://arxiv.org/pdf/2203.08436.pdf';

  return (
    <BrowserRouter>
      <Route path="/">
        <PDODContextProvider>
          <div className="reader__container">
            <Header pdfUrl={samplePdfUrl} />
            <DocumentWrapper className="reader__main" file={samplePdfUrl} inputRef={pdfContentRef}>
              <Outline parentRef={pdfContentRef} />
              <div className="reader__page-list" ref={pdfScrollableRef}>
                {Array.from({ length: numPages }).map((_, i) => (
                  <PageWrapper key={i} pageIndex={i}>
                    <Overlay>
                      <ScrollToDemo pageIndex={i} />
                      <PDODLayers pageIndex={i} parentRef={pdfScrollableRef} />
                    </Overlay>
                  </PageWrapper>
                ))}
              </div>
            </DocumentWrapper>
          </div>
        </PDODContextProvider>
      </Route>
    </BrowserRouter>
  );
};
