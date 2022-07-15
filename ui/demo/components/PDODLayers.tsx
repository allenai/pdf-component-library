import * as React from 'react';

import { PageToAnnotationsMap } from '../types/annotations';
import { PDODCitationCardsLayer } from './PDODCitationCardsLayer';
import { PDODResultsLayer } from './PDODResultsLayer';
import { PDODTermLayer } from './PDODTermLayer';

type Props = {
  pageIndex: number;
  parentRef: React.RefObject<HTMLDivElement>;
  annotations: PageToAnnotationsMap;
};

/*
 * Example of rendering CitationPopovers
 */
export const PDODLayers: React.FunctionComponent<Props> = (props: Props) => {
  const { pageIndex, parentRef, annotations } = props;
  return (
    <React.Fragment>
      <PDODTermLayer pageIndex={pageIndex} parentRef={parentRef} />
      <PDODResultsLayer pageIndex={pageIndex} parentRef={parentRef} />
      <PDODCitationCardsLayer
        pageIndex={pageIndex}
        parentRef={parentRef}
        annotations={annotations}
      />
    </React.Fragment>
  );
};
