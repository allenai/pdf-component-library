import * as React from 'react';

import { PageToAnnotationsMap } from '../types/annotations';
import { CitationPopover } from './CitationPopover';

type Props = {
  annotations: PageToAnnotationsMap;
  pageIndex: number;
  parentRef: React.RefObject<HTMLDivElement>;
};

/*
 * Example of rendering CitationPopovers
 */
export const CitationsDemo: React.FunctionComponent<Props> = ({
  annotations,
  pageIndex,
  parentRef,
}: Props) => {
  function renderCitations(): Array<React.ReactElement> {
    const citationPopovers: Array<React.ReactElement> = [];
    const entitiesForPage = annotations.get(pageIndex);
    if (entitiesForPage) {
      const citations = entitiesForPage.citations;
      citations.map(citation => {
        citationPopovers.push(
          <CitationPopover key={citation.id} citation={citation} parentRef={parentRef} />
        );
      });
    }
    return citationPopovers;
  }

  return <React.Fragment>{annotations.get(pageIndex) && renderCitations()}</React.Fragment>;
};
