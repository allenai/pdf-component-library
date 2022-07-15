import { DocumentContext, scaleRawBoundingBox } from '@allenai/pdf-components';
import { BoundingBox } from '@allenai/pdf-components/src/components/types/boundingBox';
import * as React from 'react';
import { useContext, useEffect, useState } from 'react';

import { rawAnnotations as _rawAnnotations } from '../data/FakeServer';
import { RawCitation } from '../types/citations';
import { PDODSearchTermHighlights } from './PDODSearchTermHighlights';

type Props = {
  pageIndex: number;
  parentRef: React.RefObject<HTMLDivElement>;
};

export interface Item {
  text: string;
  bbox: BoundingBox[];
}

type PageToItems = Map<number, Item[]>;

/*
 * Example of rendering CitationPopovers
 */
export const PDODTermLayer: React.FunctionComponent<Props> = (props: Props) => {
  const { pageIndex, parentRef } = props;
  const [annotations, setAnnotations] = useState<PageToItems>(new Map());
  const [rawAnnotations, setRawAnnotations] = useState<RawCitation[]>([]);

  const { pageDimensions } = useContext(DocumentContext);

  useEffect(() => {
    // fetch('...')
    //   .then(resp => resp.json())
    //   .then((items: RawItem[]) => {
    //     setRawAnnotations(items);
    //   });
    setRawAnnotations(_rawAnnotations);
  }, []);
  useEffect(() => {
    if (pageDimensions.height === 0 || pageDimensions.width === 0) {
      return;
    }
    const newAnnotations: PageToItems = new Map<number, Item[]>();
    const scale = (boundingBox: BoundingBox) =>
      scaleRawBoundingBox(boundingBox, pageDimensions.height, pageDimensions.width);
    rawAnnotations.forEach(item => {
      const page = item.mentions[0].boundingBoxes[0].page;
      if (!newAnnotations.has(page)) {
        newAnnotations.set(page, []);
      }
      newAnnotations.get(page)?.push({
        text: item.referenceText ?? 'no ref text',
        bbox: item.mentions[0].boundingBoxes.map(scale),
      });
    });
    setAnnotations(newAnnotations);
  }, [rawAnnotations, pageDimensions.height, pageDimensions.width]);

  // TODO: handle multiple bounding boxes for each item
  function renderCitations(): Array<React.ReactElement> {
    const itemPopovers: Array<React.ReactElement> = [];
    const itemsForPage = annotations.get(pageIndex);
    if (itemsForPage) {
      itemsForPage.map((item, idx) => {
        itemPopovers.push(
          <PDODSearchTermHighlights
            key={idx}
            item={item}
            boundingBox={item.bbox[0]}
            parentRef={parentRef}
          />
        );
      });
    }
    return itemPopovers;
  }

  return <React.Fragment>{annotations.get(pageIndex) && renderCitations()}</React.Fragment>;
};
