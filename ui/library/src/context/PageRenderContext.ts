import * as React from "react";
import { pdfjs } from "react-pdf";

import { PageNumber } from "../components/types/page";
import { Nullable } from "../components/types/utils";
import { logProviderWarning } from "../utils/provider";
import { getMostVisiblePageNumber } from "../utils/VisiblePageUtil";

export type RenderState = {
  promise: Promise<string>;
  objectURL: Nullable<string>;
};

export type PageNumberToRenderStateMap = Map<number, RenderState>;

export interface IPageRenderContext {
  pageRenderStates: PageNumberToRenderStateMap;
  getObjectURLForPage: (pageNumber: PageNumber) => Nullable<string>;
  isBuildingObjectURLForPage: (pageNumber: PageNumber) => boolean;
  isFinishedBuildingAllPagesObjectURLs: () => boolean;
  buildObjectURLForPage: (pageNumber: PageNumber) => Promise<string>;
}

export const PageRenderContext = React.createContext<IPageRenderContext>({
  pageRenderStates: new Map(),
  getObjectURLForPage: (args) => {
    logProviderWarning(
      `getObjectURLForPage(${JSON.stringify(args)})`,
      "PageRenderContext"
    );
    return null;
  },
  isBuildingObjectURLForPage: (args) => {
    logProviderWarning(
      `isBuildingObjectURLForPage(${JSON.stringify(args)})`,
      "PageRenderContext"
    );
    return false;
  },
  isFinishedBuildingAllPagesObjectURLs: () => {
    logProviderWarning(
      `isFinishedBuildingAllPagesObjectURLs()`,
      "PageRenderContext"
    );
    return false;
  },
  buildObjectURLForPage: (args) => {
    logProviderWarning(
      `buildObjectURLForPage(${JSON.stringify(args)})`,
      "PageRenderContext"
    );
    return Promise.resolve("");
  },
});

export function usePageRenderContextProps({
  pdfDocProxy,
  pixelRatio,
  scale,
}: {
  pdfDocProxy?: pdfjs.PDFDocumentProxy;
  pixelRatio: number;
  scale: number;
}): IPageRenderContext {
  const [pageRenderStates, _setPageRenderStates] =
    React.useState<PageNumberToRenderStateMap>(() => {
      const map = new Map();
      Object.freeze(map);
      return map;
    });

  // Because rendering a page is async, we will lose the current pageRenderStates
  // This ref trick allows the latest to be accessible when the objectURL is ready
  const pageRenderStatesRef = React.useRef(pageRenderStates);
  const setPageRenderStates = React.useCallback(
    (pageRenderStates: PageNumberToRenderStateMap) => {
      pageRenderStatesRef.current = pageRenderStates;
      _setPageRenderStates(pageRenderStates);
    },
    [pageRenderStatesRef]
  );

  const isBuildingObjectURLForPage = React.useCallback(
    ({ pageNumber, pageIndex }: PageNumber): boolean => {
      if (typeof pageIndex === "number") {
        pageNumber = pageIndex + 1;
      }
      if (typeof pageNumber !== "number") {
        return false;
      }
      const state = pageRenderStates.get(pageNumber);
      if (!state) {
        return false;
      }
      return !state.objectURL;
    },
    [pageRenderStates]
  );

  const isFinishedBuildingAllPagesObjectURLs =
    React.useCallback((): boolean => {
      if (!pdfDocProxy) return false;
      for (
        let pageNumber = 1;
        pageNumber <= pdfDocProxy.numPages;
        pageNumber++
      ) {
        if (!pageRenderStates.get(pageNumber)?.objectURL) {
          return false;
        }
      }
      return true;
    }, [pdfDocProxy, pageRenderStates]);

  const getObjectURLForPage = React.useCallback(
    ({ pageNumber, pageIndex }: PageNumber): Nullable<string> => {
      if (typeof pageIndex === "number") {
        pageNumber = pageIndex + 1;
      }
      if (typeof pageNumber !== "number") {
        return null;
      }
      return pageRenderStates.get(pageNumber)?.objectURL || null;
    },
    [pageRenderStates]
  );

  const buildObjectURLForPage = React.useCallback(
    ({ pageNumber, pageIndex }: PageNumber): Promise<string> => {
      if (typeof pageIndex === "number") {
        pageNumber = pageIndex + 1;
      }
      if (typeof pageNumber !== "number") {
        throw new Error('prop "pageNumber" is not a number');
      }
      if (!pdfDocProxy) {
        throw new Error(
          'cannot build a page until a "pdfDocProxy" is set on DocumentContext'
        );
      }

      // Don't need to start another task if already rendered
      const existingPromise = pageRenderStates.get(pageNumber)?.promise;
      if (existingPromise) {
        return existingPromise;
      }

      const promise = buildPageObjectURL({
        pageNumber,
        pdfDocProxy,
        pixelRatio,
        scale,
        promiseTimestamp: flushTimestamp,
      });
      const renderState: RenderState = {
        promise,
        objectURL: null,
      };
      promise.then((objectURL) => {
        if (!objectURL) return;
        renderState.objectURL = objectURL;
        const newPageRenderStates = new Map(pageRenderStatesRef.current);
        Object.freeze(newPageRenderStates);
        setPageRenderStates(newPageRenderStates);
      });
      const newPageRenderStates = new Map(pageRenderStatesRef.current);
      newPageRenderStates.set(pageNumber, renderState);
      Object.freeze(newPageRenderStates);
      setPageRenderStates(newPageRenderStates);
      return promise;
    },
    [pageRenderStates, pdfDocProxy, scale]
  );

  React.useEffect(() => {
    if (
      !pdfDocProxy ||
      [...pageRenderStates.keys()].length === pdfDocProxy.numPages
    ) {
      return;
    }

    const priorityQueue = getPriorityQueue(pdfDocProxy.numPages);
    for (const pageNumber of priorityQueue) {
      buildObjectURLForPage({ pageNumber });
    }
  }, [pageRenderStates, pdfDocProxy]);

  // Flush page render states when scale changes
  React.useEffect(() => {
    // Clean memory of old generated images
    for (const [, renderState] of pageRenderStatesRef.current) {
      if (renderState.objectURL) {
        URL.revokeObjectURL(renderState.objectURL);
      }
    }

    // if current async promises dont have this timestamp, then we flush them
    flushTimestamp = new Date().getTime();

    // Clear all page render states, so pages can rebuild images
    const newPageRenderStates = new Map();
    Object.freeze(newPageRenderStates);
    setPageRenderStates(newPageRenderStates);
  }, [scale, pixelRatio]);

  return {
    pageRenderStates,
    getObjectURLForPage,
    isBuildingObjectURLForPage,
    isFinishedBuildingAllPagesObjectURLs,
    buildObjectURLForPage,
  };
}

export function getNeighboringPages(
  pages: number[],
  numTotalPages: number
): number[] {
  return pages.length === 0
    ? []
    : [
        Math.max(1, pages[0] - 1),
        Math.min(numTotalPages, pages[pages.length - 1] + 1),
      ];
}

export function getPriorityQueue(numPages: number): number[] {
  const mostVisiblePage = getMostVisiblePageNumber();
  const visiblePages: number[] = mostVisiblePage ? [mostVisiblePage] : [];
  const visiblePagesNeighbors = getNeighboringPages(visiblePages, numPages);
  const allPages = Array.from({ length: numPages }, (_, i) => i + 1);
  const priorityQueue = new Set([
    ...visiblePages,
    ...visiblePagesNeighbors,
    ...allPages,
  ]); // put into set to remove duplicats
  return Array.from(priorityQueue); // convert set to array
}

// This boost causes the rendered image to be scaled up by this amount
const SCALE_BOOST = 2;

// Generate an object url for a given page, rendered in a shared canvas
async function buildPageObjectURL({
  pageNumber,
  pdfDocProxy,
  pixelRatio = (typeof window !== "undefined"
    ? window.devicePixelRatio
    : null) || 0,
  scale = 1,
  imageType = "image/png",
  imageQuality = 1.0,
  promiseTimestamp,
}: {
  pageNumber: number;
  pdfDocProxy: pdfjs.PDFDocumentProxy;
  pixelRatio?: number;
  scale?: number;
  imageType?: string;
  imageQuality?: number;
  promiseTimestamp: number;
}): Promise<string> {
  const pageProxy = await pdfDocProxy.getPage(pageNumber);

  const blob: Nullable<Blob> | number = await useRenderCanvas(
    async (canvas) => {
      if (promiseTimestamp !== flushTimestamp) {
        return promiseTimestamp; // flush stale promise
      }
      // Render page in a canvas
      const viewport = pageProxy.getViewport({
        scale: scale * pixelRatio * SCALE_BOOST,
      });
      canvas.height = viewport.height;
      canvas.width = viewport.width;
      const canvasContext = canvas.getContext("2d");
      if (!canvasContext) {
        throw new Error("canvas was unable to get a context");
      }

      const renderTask = pageProxy.render({
        canvasContext,
        viewport,
        intent: "print", // immediately render pages on inactive pages
      });
      await renderTask.promise;

      await new Promise((resolve) => setTimeout(resolve, 16));

      // Fetch a blob for an image of the canvas
      return new Promise((resolve, reject) => {
        try {
          canvas.toBlob((blob) => resolve(blob), imageType, imageQuality);
        } catch (error) {
          reject(error);
        }
      });
    }
  );

  if (typeof blob === "number") {
    return "";
  }
  // Convert blob image to object url
  if (!blob) {
    throw new Error("unable to create image from page");
  }
  return URL.createObjectURL(blob);
}

let renderCanvas: Nullable<HTMLCanvasElement> = null;

// Get or create a shared canvas for rendering pages in
function getRenderCanvas(): HTMLCanvasElement {
  if (!renderCanvas) {
    renderCanvas = document.createElement("canvas");
  }
  return renderCanvas;
}

let flushTimestamp = new Date().getTime();
let nextCanvasUse: Promise<any> = Promise.resolve();

// Use the shared canvas to render a page, using promises to create a queue
async function useRenderCanvas<T>(
  callback: (canvas: HTMLCanvasElement) => Promise<T>
): Promise<T> {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  let resolve = (_value: T | PromiseLike<T>) => {};
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  let reject = (_reason: any) => {};
  const prom = new Promise<T>((_resolve, _reject) => {
    resolve = _resolve;
    reject = _reject;
  });
  nextCanvasUse = nextCanvasUse.then(() =>
    callback(getRenderCanvas()).then(resolve, reject)
  );
  const result = await prom;
  await new Promise((res) => setTimeout(res, 16)); // Give some time between renders
  return result;
}
