import { DocumentContext, DocumentWrapper, Overlay, PageWrapper } from '@allenai/pdf-components';
import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { BrowserRouter, Route } from 'react-router-dom';

import { samplePdfSha, samplePdfUrl } from '../data/FakeServer';
import { Annotations, generateCitations, PageToAnnotationsMap } from '../types/annotations';
import { RawCitation } from '../types/citations';
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

  const { pageDimensions } = React.useContext(DocumentContext);
  const [annotations, setAnnotations] = React.useState<PageToAnnotationsMap>(
    new Map<number, Annotations>()
  );
  const [rawCitations, setRawCitations] = React.useState<RawCitation[]>();

  const sampleS2airsUrl = `http://s2airs.prod.s2.allenai.org/v1/pdf_data?pdf_sha=${samplePdfSha}`;

  React.useEffect(() => {
    // If data has been loaded then return directly to prevent sending multiple requests
    fetch(sampleS2airsUrl, { referrer: '' })
      .then(response => response.json())
      .then(data => {
        setRawCitations(data[0].citations);
      });
  }, [pageDimensions]);

  // Attaches annotation data to paper
  React.useEffect(() => {
    // Don't execute until paper data and PDF document have loaded
    if (!rawCitations || !pageDimensions.height || !pageDimensions.width) {
      return;
    }

    setAnnotations(generateCitations(rawCitations, pageDimensions));
  }, [rawCitations, pageDimensions]);

  return (
    <BrowserRouter>
      <Route path="/">
        <div className="reader__container">
          <Header pdfUrl={samplePdfUrl} />
          <DocumentWrapper className="reader__main" file={samplePdfUrl} inputRef={pdfContentRef}>
            <PDODContextProvider>
              <Outline parentRef={pdfContentRef} />
              <div className="reader__page-list" ref={pdfScrollableRef}>
                {Array.from({ length: numPages }).map((_, i) => (
                  <PageWrapper key={i} pageIndex={i}>
                    <Overlay>
                      <ScrollToDemo pageIndex={i} />
                      <PDODLayers
                        pageIndex={i}
                        parentRef={pdfScrollableRef}
                        annotations={annotations}
                      />
                    </Overlay>
                  </PageWrapper>
                ))}
              </div>
            </PDODContextProvider>
          </DocumentWrapper>
        </div>
      </Route>
    </BrowserRouter>
  );
};
