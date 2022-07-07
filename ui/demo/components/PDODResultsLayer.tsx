import { BoundingBox } from '@allenai/pdf-components';
import { BoundingBox as BoundingBoxType } from '@allenai/pdf-components/src/components/types/boundingBox';
import { DocumentContext, scaleRawBoundingBox } from '@allenai/pdf-components';
import * as React from 'react';
import { useContext, useEffect, useState } from 'react';
import { usePDODContext } from './PDODContext';

import { PDODPopover } from './PDODPopover';

type Props = {
  pageIndex: number;
  parentRef: React.RefObject<HTMLDivElement>;
};

export interface Item {
  text: string;
  bbox: BoundingBoxType[];
  idx?: number;
}

type RawItem = Item & { page: number };

type PageToItems = Map<number, Item[]>;

/*
 * Example of rendering CitationPopovers
 */
export const PDODResultsLayer: React.FunctionComponent<Props> = (props: Props) => {
  const { pageIndex, parentRef } = props;
  const [annotations, setAnnotations] = useState<PageToItems>(new Map());
  const { results } = usePDODContext();

  const { pageDimensions } = useContext(DocumentContext);

  useEffect(() => {
    const newAnnotations: PageToItems = new Map<number, Item[]>();
    const scale = (boundingBox: BoundingBoxType) =>
      scaleRawBoundingBox(boundingBox, pageDimensions.height, pageDimensions.width);
    results.forEach(item => {
      item.tokens.forEach((token, idx) => {
        const page = token.bbox[0].page;
        if (!newAnnotations.has(page)) {
          newAnnotations.set(page, []);
        }
        newAnnotations.get(page)?.push({
          text: token.text.join(' ').replace('- ', ''),
          bbox: token.bbox.map(scale),
          idx: idx === 0 ? item.idx : undefined
        });
      })
    });
    setAnnotations(newAnnotations);
  }, [results, pageDimensions]);

  // TODO: handle multiple bounding boxes for each item
  function renderCitations(): Array<React.ReactElement> {
    const itemPopovers: Array<React.ReactElement> = [];
    const itemsForPage = annotations.get(pageIndex);
    if (itemsForPage) {
      itemsForPage.map((item, idx) => {
        itemPopovers.push(
          <BoundingBox
            key={idx}
            id={`results-${item.idx}`}
            page={item.bbox[0].page}
            top={item.bbox[0].top}
            left={item.bbox[0].left}
            height={item.bbox[0].height}
            width={item.bbox[0].width}
            isHighlighted={true}
          />
        );
        if (item.bbox.length > 1) {
          item.bbox.forEach((box, idx2) => {
            if (idx2 === 0){
              return
            }
            itemPopovers.push(
              <BoundingBox
                key={`${idx}-${idx2}`}
                className={`results-${item.idx}`}
                page={box.page}
                top={box.top}
                left={box.left}
                height={box.height}
                width={box.width}
                isHighlighted={true}
              />
            );

          })
        }
      });
    }
    return itemPopovers;
  }

  return <React.Fragment>{annotations.get(pageIndex) && renderCitations()}</React.Fragment>;
};
