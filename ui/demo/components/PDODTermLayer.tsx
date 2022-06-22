import { DocumentContext, scaleRawBoundingBox } from '@allenai/pdf-components';
import { BoundingBox } from '@allenai/pdf-components/src/components/types/boundingBox';
import * as React from 'react';
import { useContext, useEffect, useState } from 'react';

import { PDODPopover } from './PDODPopover';

type Props = {
  pageIndex: number;
  parentRef: React.RefObject<HTMLDivElement>;
};

export interface Item {
  text: string;
  bbox: BoundingBox[];
}

type RawItem = Item & { page: number };

type PageToItems = Map<number, Item[]>;

/*
 * Example of rendering CitationPopovers
 */
export const PDODTermLayer: React.FunctionComponent<Props> = (props: Props) => {
  const { pageIndex, parentRef } = props;
  const [annotations, setAnnotations] = useState<PageToItems>(new Map());
  const [rawAnnotations, setRawAnnotations] = useState<RawItem[]>([]);

  const { pageDimensions } = useContext(DocumentContext);

  useEffect(() => {
    fetch('...')
      .then(resp => resp.json())
      .then((items: RawItem[]) => {
        setRawAnnotations(items);
      });
  }, []);
  useEffect(() => {
    const newAnnotations: PageToItems = new Map<number, Item[]>();
    const scale = (boundingBox: BoundingBox) =>
      scaleRawBoundingBox(boundingBox, pageDimensions.height, pageDimensions.width);
    rawAnnotations.forEach(item => {
      const page = item.page;
      if (!newAnnotations.has(page)) {
        newAnnotations.set(item.page, []);
      }
      newAnnotations.get(item.page)?.push({
        text: item.text,
        bbox: item.bbox.map(scale),
      });
    });
    setAnnotations(newAnnotations);
  }, [rawAnnotations, pageDimensions]);

  // TODO: handle multiple bounding boxes for each item
  function renderCitations(): Array<React.ReactElement> {
    const itemPopovers: Array<React.ReactElement> = [];
    const itemsForPage = annotations.get(pageIndex);
    if (itemsForPage) {
      itemsForPage.map((item, idx) => {
        itemPopovers.push(
          <PDODPopover key={idx} item={item} boundingBox={item.bbox[0]} parentRef={parentRef} />
        );
      });
    }
    return itemPopovers;
  }

  return <React.Fragment>{annotations.get(pageIndex) && renderCitations()}</React.Fragment>;
};
