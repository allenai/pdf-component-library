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
import {
  Annotations,
  AnnotationsRaw,
  PageToAnnotationsMap,
  transformRawAnnotations,
} from './types/annotations';
import { loadJSON } from './utils';

export const Reader: React.FunctionComponent<RouteComponentProps> = () => {
  const { pageSize, numPages } = React.useContext(DocumentContext);
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
    if (!annotationsRaw || !pageSize.height || !pageSize.width) {
      return;
    }

    setAnnotations(transformRawAnnotations(annotationsRaw, pageSize));
  }, [annotationsRaw, pageSize]);

  return (
    <BrowserRouter>
      <Route path="/">
        <div className="reader__container">
          <Header />
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
