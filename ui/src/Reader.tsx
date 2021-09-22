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
import { scaleRawBoundingBoxWithContext } from './library/components/BoundingBox';
import { DocumentWrapper } from './library/components/DocumentWrapper';
import { Overlay } from './library/components/Overlay';
import { PageWrapper } from './library/components/PageWrapper';
import { DocumentContext } from './library/context/DocumentContext';
import { TransformContext } from './library/context/TransformContext';
import { BoundingBox as BoundingBoxType } from './library/types';
import { Citation } from './types/citations';
import { ENTITY_TYPE } from './types/entity';
import { Annotations, PaperAnnotated } from './types/paper';
import { loadJSON } from './utils';

export const Reader: React.FunctionComponent<RouteComponentProps> = () => {
  const documentContext = React.useContext(DocumentContext);
  const transformContext = React.useContext(TransformContext);
  const { pageSize, numPages } = documentContext;
  const { scale, rotation } = transformContext;
  const [isLoadingAnnotations, setIsLoadingAnnotations] = React.useState(true);
  const [isLoadingJson, setIsLoadingJson] = React.useState(false);
  const [paper, setPaper] = React.useState<PaperAnnotated>();

  // ref for the div in which the Document component renders
  const pdfContentRef = React.createRef<HTMLDivElement>();

  // ref for the scrollable region where the pages are rendered
  const pdfScrollableRef = React.createRef<HTMLDivElement>();

  // Retrieves sample paper data from local JSON file
  React.useEffect(() => {
    // Run once on initial page load. Don't run again if we are in the process of retreiving
    // or have already retrieved the JSON data
    if (!paper && !isLoadingJson) {
      setIsLoadingJson(true);
      loadJSON('data/samplePaper_short.json', (data: string) => {
        setIsLoadingJson(false);
        setPaper(new PaperAnnotated(JSON.parse(data)));
      });
    }
  }, [paper]);

  // Attaches annotation data to paper
  React.useEffect(() => {
    // Run once, after paper and PDF document have loaded
    if (!paper || !pageSize.height || !pageSize.width) {
      return;
    }
    initAnnotations();
    // This state change forces child components to rerender
    // using the updated annotation data
    setIsLoadingAnnotations(false);
  }, [paper, pageSize]);

  function initAnnotations() {
    if (!paper) {
      return;
    }
    // Start with all entities in raw format
    const rawEntities = paper.entities;
    rawEntities.map(entity => {
      // Add Citations to Annotation map
      if (entity.type === ENTITY_TYPE.CITATION) {
        const boxes: Array<BoundingBoxType> = entity.attributes.bounding_boxes;
        boxes.map(box => {
          if (typeof box.page === 'number') {
            let annotationsForPage = paper.annotations.get(box.page);
            if (!annotationsForPage) {
              paper.annotations.set(box.page, new Annotations());
              annotationsForPage = paper.annotations.get(box.page);
            }

            // Transform raw bounding box data with respect to page size, scale, and rotation
            const scaledBox = scaleRawBoundingBoxWithContext(
              box,
              documentContext,
              transformContext
            );
            const citation = new Citation(entity, entity.attributes.paper_id, [scaledBox]);
            if (annotationsForPage) {
              annotationsForPage.citations.push(citation);
            }
          }
        });
      }
    });
  }

  return (
    <BrowserRouter>
      <Route path="/">
        <div className="reader__container">
          <div className="reader__header">
            <Header />
          </div>
          {paper && (
            <DocumentWrapper className="reader__main" file={paper.pdfUrl} inputRef={pdfContentRef}>
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
                      <CitationsDemo pageIndex={i} annotations={paper.annotations} parentRef={pdfScrollableRef} />
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
