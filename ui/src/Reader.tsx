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
import { Annotations, getAnnotations, PaperAnnotated, PaperRaw } from './types/paper';
import { loadJSON } from './utils';

export const Reader: React.FunctionComponent<RouteComponentProps> = () => {
  const { pageSize, numPages } = React.useContext(DocumentContext);
  const [paperRaw, setPaperRaw] = React.useState<PaperRaw>();
  const [paperAnnotated, setPaperAnnotated] = React.useState<PaperAnnotated>();

  // ref for the div in which the Document component renders
  const pdfContentRef = React.createRef<HTMLDivElement>();

  // ref for the scrollable region where the pages are rendered
  const pdfScrollableRef = React.createRef<HTMLDivElement>();

  // Runs once on initial load
  // Retrieves sample paper data from local JSON file
  React.useEffect(() => {
    loadJSON('data/samplePaper_short.json', (data: string) => {
      const paperRaw = JSON.parse(data);
      setPaperRaw(paperRaw);
      setPaperAnnotated({
        pdfUrl: paperRaw.pdfUrl,
        annotations: new Map<number, Annotations>(),
      });
    });
  }, []);

  // Attaches annotation data to paper
  React.useEffect(() => {
    // Run once, after paper data and PDF document have loaded
    if (!paperRaw || !pageSize.height || !pageSize.width) {
      return;
    }
    const annotations = getAnnotations(paperRaw, pageSize);
    setPaperAnnotated({
      pdfUrl: paperRaw.pdfUrl,
      annotations,
    });
  }, [paperRaw, pageSize]);

  return (
    <BrowserRouter>
      <Route path="/">
        <div className="reader__container">
          <div className="reader__header">
            <Header />
          </div>
          {paperRaw && (
            <DocumentWrapper
              className="reader__main"
              file={paperRaw.pdfUrl}
              inputRef={pdfContentRef}>
              <Outline parentRef={pdfContentRef} />
              <div className="reader__page-list" ref={pdfScrollableRef}>
                {Array.from({ length: numPages }).map((_, i) => (
                  <PageWrapper
                    key={i}
                    pageIndex={i}>
                    <Overlay>
                      <HighlightOverlayDemo pageIndex={i} />
                      <TextHighlightDemo pageIndex={i} />
                      <ScrollToDemo pageIndex={i} />
                      <CitationsDemo
                        pageIndex={i}
                        paperAnnotated={paperAnnotated}
                        parentRef={pdfScrollableRef}
                      />
                    </Overlay>
                  </PageWrapper>
                ))}
              </div>
            </DocumentWrapper>
          )}
        </div>
      </Route>
    </BrowserRouter>
  );
};
