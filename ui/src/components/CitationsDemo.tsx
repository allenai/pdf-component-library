import * as React from 'react';

import { Annotations } from '../types/paper';
import { CitationPopover } from './CitationPopover';

type Props = {
  // TODO: #28926 subtask choose between pageNumber/pageIndex
  pageIndex: number;
  annotations: Map<number, Annotations>;
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
    const entitiesForPage = annotations.get(pageIndex);
    const citationPopovers: Array<React.ReactElement> = [];
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

  return <div>{annotations.get(pageIndex) && renderCitations()}</div>;
};
