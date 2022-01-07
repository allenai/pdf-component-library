import { DocumentContext, DocumentWrapper, Overlay, PageWrapper } from 'pdf-components-dist';
import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { BrowserRouter, Route } from 'react-router-dom';

import {
  Annotations,
  AnnotationsRaw,
  PageToAnnotationsMap,
  transformRawAnnotations,
  generateCitations
} from '../types/annotations';
import { RawCitation } from '../types/citations';
import { loadJSON } from '../utils/utils';
import { CitationsDemo } from './CitationsDemo';
import { Header } from './Header';
import { HighlightOverlayDemo } from './HighlightOverlayDemo';
import { Outline } from './Outline';
import { ScrollToDemo } from './ScrollToDemo';
import { TextHighlightDemo } from './TextHighlightDemo';

export const Reader: React.FunctionComponent<RouteComponentProps> = () => {
  const { pageDimensions, numPages } = React.useContext(DocumentContext);
  const [annotations, setAnnotations] = React.useState<PageToAnnotationsMap>(
    new Map<number, Annotations>()
  );
  const [rawCitations, setRawCitations] = React.useState<RawCitation[]>();
  const [pdfUrl, setPdfUrl] = React.useState<string>();
  // ref for the div in which the Document component renders
  const pdfContentRef = React.createRef<HTMLDivElement>();

  // ref for the scrollable region where the pages are rendered
  const pdfScrollableRef = React.createRef<HTMLDivElement>();

  // TODO: #28639 Get PDF URL from query parameters instead of hardcoding
  // const pdfUrl = 'https://arxiv.org/pdf/1512.02595v1.pdf';
  
  // Runs once on initial load
  // Retrieves sample annotation data from local JSON file
  // React.useEffect(() => {
  //   loadJSON('data/sampleAnnotations_short.json', (data: string) => {
  //     setAnnotationsRaw(JSON.parse(data));
  //   });
  // }, []);

  const s2airsSampleUrl = 'https://development.semanticscholar.org/api/1/paper/5dd3e0e7f1da307d5a7c8cda460f3aa3845e1b3c/pdf-data'

  React.useEffect(() => {
    // already have data
    if (pdfUrl)
      return

    fetch(s2airsSampleUrl)
      .then(response => response.json())
      .then(data => {
        setPdfUrl(data.pdfUrl)
        setRawCitations(data.citations)
      })
  }, [pageDimensions])



  // Attaches annotation data to paper
  React.useEffect(() => {
    // Don't execute until paper data and PDF document have loaded
    if (!rawCitations || !pageDimensions.height || !pageDimensions.width) {
      return;
    }

    setAnnotations(generateCitations(rawCitations, pageDimensions))
  }, [rawCitations, pageDimensions]);


  return (
    <BrowserRouter>
      <Route path="/">
        <div className="reader__container">
          {!!pdfUrl && <Header pdfUrl={pdfUrl} />}
          <DocumentWrapper className="reader__main" file={pdfUrl} inputRef={pdfContentRef}>
            <Outline parentRef={pdfContentRef} />
            <div className="reader__page-list" ref={pdfScrollableRef}>
              {Array.from({ length: numPages }).map((_, i) => (
                <PageWrapper key={i} pageIndex={i}>
                  <Overlay>
                    <HighlightOverlayDemo pageIndex={i} />
                    <TextHighlightDemo pageIndex={i} />
                    <ScrollToDemo pageIndex={i} />
                    <CitationsDemo
                      annotations={annotations}
                      pageIndex={i}
                      parentRef={pdfScrollableRef}
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
};
