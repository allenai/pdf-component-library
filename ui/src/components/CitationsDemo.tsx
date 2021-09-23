import * as React from 'react';

import { ENTITY_TYPE } from '../types/entity';
import { CitationPopover } from './CitationPopover';

type Props = {
  parentRef: React.RefObject<HTMLDivElement>;
};

/*
 * Example of the CitationPopover component
 */
export const CitationsDemo: React.FunctionComponent<Props> = ({ parentRef }: Props) => {
  return (
    <CitationPopover
      citation={{
        id: 1234,
        type: ENTITY_TYPE.CITATION,
        attributes: {
          boundingBoxes: [
            {
              page: 1,
              top: 748,
              left: 365,
              height: 20,
              width: 17,
            },
          ],
          paper: {
            title: 'The Best Paper Ever',
            authors: [
              { id: 1, name: 'Author One', url: 'https://www.semanticscholar.org' },
              { id: 2, name: 'Author Two', url: 'https://www.semanticscholar.org' },
              { id: 3, name: 'Author Three', url: 'https://www.semanticscholar.org' },
            ],
            year: 2021,
            abstract:
              'Research has found that baking soda is an underrated leavener for baked goods containing acidic ingredients.',
            url: 'http://www.semanticscholar.org',
          },
        },
      }}
      parentRef={parentRef}
    />
  );
};
