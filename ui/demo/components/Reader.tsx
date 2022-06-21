import { DocumentContext, DocumentWrapper, Overlay, PageList } from '@allenai/pdf-components';
import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { BrowserRouter, Route } from 'react-router-dom';

import { generateCitations } from '../types/annotations';
import { RawCitation } from '../types/citations';
import { CitationsDemo } from './CitationsDemo';
import { Header } from './Header';
import { HighlightOverlayDemo } from './HighlightOverlayDemo';
import { Outline } from './Outline';

export const Reader: React.FunctionComponent<RouteComponentProps> = () => {
  const { pageDimensions } = React.useContext(DocumentContext);
  const [pageToElementMap, setPageToElementMap] = React.useState<Map<number, React.ReactElement>>(
    new Map<number, React.ReactElement>()
  );
  const [rawCitations, setRawCitations] = React.useState<RawCitation[]>();

  // ref for the div in which the Document component renders
  const pdfContentRef = React.createRef<HTMLDivElement>();

  const samplePdfUrl = 'https://arxiv.org/pdf/2112.07873.pdf';
  const sampleS2airsUrl =
    'http://s2airs.prod.s2.allenai.org/v1/pdf_data?pdf_sha=9b79eb8d21c8a832daedbfc6d8c31bebe0da3ed5';

  React.useEffect(() => {
    // If data has been loaded then return directly to prevent sending multiple requests
    if (rawCitations) {
      return;
    }

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

    let pageElementMap = new Map<number, React.ReactElement>();
    const pageToAnnotationsMap = generateCitations(rawCitations, pageDimensions);
    for (const [pageIndex] of pageToAnnotationsMap) {
      const citationDemo = (
        <Overlay>
          <HighlightOverlayDemo pageIndex={pageIndex} />
          <CitationsDemo annotations={pageToAnnotationsMap} pageIndex={pageIndex} />
        </Overlay>
      );
      pageElementMap = pageElementMap.set(pageIndex, citationDemo);
    }
    setPageToElementMap(pageElementMap);
  }, [rawCitations, pageDimensions]);

  return (
    <BrowserRouter>
      <Route path="/">
        <div className="reader__container">
          <Header pdfUrl={samplePdfUrl} />
          <DocumentWrapper className="reader__main" file={samplePdfUrl} inputRef={pdfContentRef}>
            <Outline parentRef={pdfContentRef} />
            <PageList pageElementMap={pageToElementMap} />
          </DocumentWrapper>
        </div>
      </Route>
    </BrowserRouter>
  );
};
