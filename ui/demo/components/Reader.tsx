import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { BrowserRouter, Route } from 'react-router-dom';

import { DocumentContext, DocumentWrapper, Overlay, PageWrapper } from 'pdf-components-dist';
import {
  Annotations,
  AnnotationsRaw,
  PageToAnnotationsMap,
  transformRawAnnotations,
} from '../types/annotations';
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
  const [annotationsRaw, setAnnotationsRaw] = React.useState<AnnotationsRaw>();

  // ref for the div in which the Document component renders
  const pdfContentRef = React.createRef<HTMLDivElement>();

  // ref for the scrollable region where the pages are rendered
  const pdfScrollableRef = React.createRef<HTMLDivElement>();

  // TODO: #28639 Get PDF URL from query parameters instead of hardcoding
  const pdfUrl = 'https://arxiv.org/pdf/1512.02595v1.pdf';

  // Runs once on initial load
  // Retrieves sample annotation data from local JSON file
  React.useEffect(() => {
    loadJSON('data/sampleAnnotations_short.json', (data: string) => {
      setAnnotationsRaw(JSON.parse(data));
    });
  }, []);

  // Attaches annotation data to paper
  React.useEffect(() => {
    // Don't execute until paper data and PDF document have loaded
    if (!annotationsRaw || !pageDimensions.height || !pageDimensions.width) {
      return;
    }

    setAnnotations(transformRawAnnotations(annotationsRaw, pageDimensions));
  }, [annotationsRaw, pageDimensions]);

  return (
    <BrowserRouter>
      <Route path="/">
        <div className="reader__container">
          <Header pdfUrl={pdfUrl} />
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
