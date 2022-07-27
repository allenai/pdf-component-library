import * as React from 'react';
import { pdfjs } from 'react-pdf';

import { Dimensions } from '../components/types/boundingBox';
import {
  OutlineNode,
  OutlinePosition,
  OutlinePositionsByPageNumberMap,
  OutlineTarget,
  OutlineTargetArgs,
} from '../components/types/outline';
import { Nullable } from '../components/types/utils';
import { logProviderWarning } from '../utils/provider';
import { calculateTargetPosition } from '../utils/scroll';
export interface IDocumentContext {
  numPages: number;
  outline: Nullable<Array<OutlineNode>>;
  outlinePositions: Nullable<OutlinePositionsByPageNumberMap>;
  pageDimensions: Dimensions; // Scaled at 100%
  pdfDocProxy?: pdfjs.PDFDocumentProxy;
  getOutlineTargets: (opts: OutlineTargetArgs) => OutlineTarget[];
  setNumPages: (numPages: number) => void;
  setOutline: (outline: Nullable<Array<OutlineNode>>) => void;
  setOutlinePositions: (outlinePositions: Nullable<OutlinePositionsByPageNumberMap>) => void;
  setPageDimensions: (pageDimensions: Dimensions) => void;
  setPdfDocProxy: (pdfDocProxy: pdfjs.PDFDocumentProxy) => void;
}

export const DocumentContext = React.createContext<IDocumentContext>({
  numPages: 0,
  outline: [],
  outlinePositions: null,
  pageDimensions: { height: 0, width: 0 },
  pdfDocProxy: undefined,
  getOutlineTargets: opts => {
    logProviderWarning(`getOutlineTargets(${JSON.stringify(opts)})`, 'DocumentContext');
    return [];
  },
  setNumPages: numPages => {
    logProviderWarning(`setNumPages(${numPages})`, 'DocumentContext');
  },
  setOutline: outline => {
    logProviderWarning(`setOutline(${outline})`, 'DocumentContext');
  },
  setOutlinePositions: outline => {
    logProviderWarning(`setOutlinePositions(${outline})`, 'DocumentContext');
  },
  setPageDimensions: pageDimensions => {
    logProviderWarning(`setPageDimensions(${pageDimensions})`, 'DocumentContext');
  },
  setPdfDocProxy: pdfDocProxy => {
    logProviderWarning(`setPdfDocProxy(${pdfDocProxy})`, 'DocumentContext');
  },
});

export function useDocumentContextProps(): IDocumentContext {
  const [numPages, setNumPages] = React.useState<number>(0);
  const [outline, setOutline] = React.useState<Nullable<Array<OutlineNode>>>(null);
  const [outlinePositions, setOutlinePositions] =
    React.useState<Nullable<OutlinePositionsByPageNumberMap>>(null);
  const [pageDimensions, setPageDimensions] = React.useState<Dimensions>({ height: 0, width: 0 });
  const [pdfDocProxy, setPdfDocProxy] = React.useState<pdfjs.PDFDocumentProxy>();

  // Draw outline target into the pdf based on the args
  const getOutlineTargets = React.useCallback(
    ({
      pageNumber,
      pageIndex,
      scale,
      rotation,
      pageDimensions,
    }: OutlineTargetArgs): OutlineTarget[] => {
      if (typeof pageIndex === 'number') {
        pageNumber = pageIndex + 1;
      }
      if (typeof pageNumber !== 'number') {
        return [];
      }
      const positions = outlinePositions?.get(pageNumber) || [];
      return positions.map(({ dest, leftPoint, bottomPoint }) => {
        const { leftPx, topPx } = calculateTargetPosition({
          scale,
          rotation,
          leftPoint,
          bottomPoint,
          pageDimensions,
        });
        return {
          dest,
          leftPx,
          topPx,
        };
      });
    },
    [outlinePositions]
  );

  return {
    numPages,
    outline,
    outlinePositions,
    pageDimensions,
    pdfDocProxy,
    getOutlineTargets,
    setNumPages,
    setOutline,
    setOutlinePositions,
    setPageDimensions: setPageDimensions,
    setPdfDocProxy,
  };
}

export async function buildOutlinePositions(
  pdfDocProxy: pdfjs.PDFDocumentProxy,
  outline?: OutlineNode[]
): Promise<OutlinePositionsByPageNumberMap> {
  if (!outline) {
    outline = await pdfDocProxy.getOutline();
  }

  // Depth first search through outline items
  const itemQueue = outline.slice();
  const proms: Promise<Nullable<OutlinePosition>>[] = [];
  while (itemQueue.length > 0) {
    const item = itemQueue.pop();
    if (!item) {
      continue; // Not able to process
    }
    const { dest, items } = item;

    // Add child items to queue
    if (Array.isArray(items)) {
      itemQueue.push(...items);
    }

    // Fetch destinations for item
    if (Array.isArray(dest)) {
      proms.push(...dest.map(dest => getDestination(pdfDocProxy, dest)));
    } else if (typeof dest === 'string') {
      proms.push(getDestination(pdfDocProxy, dest));
    }
  }

  // Collect results all at once, so we don't have to pay for the cost of
  // queueing messages sent to the worker
  const results = await Promise.all(proms);

  // Split results into pages
  const map = new Map<number, OutlinePosition[]>();
  for (const result of results) {
    if (!result) {
      continue; // Filter out null
    }
    const { pageNumber } = result;
    if (!map.has(pageNumber)) {
      map.set(pageNumber, []);
    }
    map.get(pageNumber)?.push(result);
  }

  // Freeze objects so consumers cannot mutate
  for (const pagePos of map.values()) {
    for (const pos of pagePos) {
      Object.freeze(pos);
    }
    Object.freeze(pagePos);
  }
  Object.freeze(map);

  return map;
}

async function getDestination(
  pdfDocProxy: pdfjs.PDFDocumentProxy,
  dest: string
): Promise<Nullable<OutlinePosition>> {
  const result = await pdfDocProxy.getDestination(dest);
  if (!result) {
    return null;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [ref, _format, leftPoint, bottomPoint] = result;
  const pageIndex = await pdfDocProxy.getPageIndex(ref);
  const pageNumber = pageIndex + 1;
  return { pageNumber, dest, leftPoint, bottomPoint };
}
