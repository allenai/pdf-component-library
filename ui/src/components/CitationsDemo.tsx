import * as React from 'react';

import { PaperAnnotated } from '../types/paper';
import { CitationPopover } from './CitationPopover';

type Props = {
  // TODO: #28926 subtask choose between pageNumber/pageIndex
  pageIndex: number;
  paperAnnotated: PaperAnnotated | undefined;
  parentRef: React.RefObject<HTMLDivElement>;
};

/*
 * Example of rendering CitationPopovers
 */
export const CitationsDemo: React.FunctionComponent<Props> = ({
  paperAnnotated,
  pageIndex,
  parentRef,
}: Props) => {
  function renderCitations(): Array<React.ReactElement> {
    const citationPopovers: Array<React.ReactElement> = [];
    const entitiesForPage = paperAnnotated && paperAnnotated.annotations.get(pageIndex);
    if (entitiesForPage) {
      const citations = entitiesForPage.citations;
      citations.map((citation, i) => {
        citationPopovers.push(
          <CitationPopover key={i} citation={citation} parentRef={parentRef} />
        );
      });
    }
    return citationPopovers;
  }

  return (
    <React.Fragment>
      {paperAnnotated && paperAnnotated.annotations.get(pageIndex) && renderCitations()}
    </React.Fragment>
  );
};
