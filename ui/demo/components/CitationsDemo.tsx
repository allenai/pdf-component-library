import * as React from 'react';

import { PageToAnnotationsMap } from '../types/annotations';
import { CitationPopover } from './CitationPopover';

type Props = {
  annotations: PageToAnnotationsMap;
  pageIndex: number;
};

/*
 * Example of rendering CitationPopovers
 */
export const CitationsDemo: React.FunctionComponent<Props> = ({
  annotations,
  pageIndex,
}: Props) => {
  function renderCitations(): Array<React.ReactElement> {
    const citationPopovers: Array<React.ReactElement> = [];
    const entitiesForPage = annotations.get(pageIndex);
    if (entitiesForPage) {
      const citations = entitiesForPage.citations;
      citations.map(citation => {
        citationPopovers.push(<CitationPopover key={citation.id} citation={citation} />);
      });
    }
    return citationPopovers;
  }

  return <React.Fragment>{annotations.get(pageIndex) && renderCitations()}</React.Fragment>;
};
