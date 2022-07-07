import * as React from 'react';
import { PDODResultsLayer } from './PDODResultsLayer';

import { PDODTermLayer } from './PDODTermLayer';

type Props = {
  pageIndex: number;
  parentRef: React.RefObject<HTMLDivElement>;
};

/*
 * Example of rendering CitationPopovers
 */
export const PDODLayers: React.FunctionComponent<Props> = (props: Props) => {
  const { pageIndex, parentRef } = props;
  return (
    <React.Fragment>
      <PDODTermLayer pageIndex={pageIndex} parentRef={parentRef} />
      <PDODResultsLayer pageIndex={pageIndex} parentRef={parentRef} />
    </React.Fragment>
  );
};
