import * as React from 'react';
import { pdfjs } from 'react-pdf';

import { Nullable } from '../components/types/utils';
import { logProviderWarning } from '../utils/provider';
import { PageRotation } from '../utils/rotate';

export type RenderState = {
  promise: Promise<string>;
  objectURL: Nullable<string>;
};

export type PageNumberToRenderStateMap = Map<number, RenderState>;

export interface IPageRenderContext {
  pageRenderStates: PageNumberToRenderStateMap;
  getObjectURLForPage: (args: { pageNumber?: number; pageIndex?: number }) => Nullable<string>;
  buildObjectURLForPage: (args: { pageNumber?: number; pageIndex?: number }) => Promise<string>;
}

export const PageRenderContext = React.createContext<IPageRenderContext>({
  pageRenderStates: new Map(),
  getObjectURLForPage: args => {
    logProviderWarning(`getObjectURLForPage(${JSON.stringify(args)})`, 'PageRenderContext');
    return null;
  },
  buildObjectURLForPage: args => {
    logProviderWarning(`buildObjectURLForPage(${JSON.stringify(args)})`, 'PageRenderContext');
    return Promise.resolve('');
  },
});

export function usePageRenderContextProps({
  pdfDocProxy,
  scale,
  rotation,
  visiblePageNumbers: visiblePageNumbers,
}: {
  pdfDocProxy?: pdfjs.PDFDocumentProxy;
  scale: number;
  rotation: PageRotation;
  visiblePageNumbers: Set<number>;
}): IPageRenderContext {
  const [pageRenderStates, setPageRenderStates] = React.useState<PageNumberToRenderStateMap>(() => {
    const map = new Map();
    Object.freeze(map);
    return map;
  });

  const getObjectURLForPage = React.useCallback(
    ({ pageNumber, pageIndex }: { pageNumber?: number; pageIndex?: number }): Nullable<string> => {
      if (typeof pageIndex === 'number') {
        pageNumber = pageIndex + 1;
      }
      if (typeof pageNumber !== 'number') {
        return null;
      }
      return pageRenderStates.get(pageNumber)?.objectURL || null;
    },
    [pageRenderStates]
  );

  const buildObjectURLForPage = React.useCallback(
    ({ pageNumber, pageIndex }: { pageNumber?: number; pageIndex?: number }): Promise<string> => {
      if (typeof pageIndex === 'number') {
        pageNumber = pageIndex + 1;
      }
      if (typeof pageNumber !== 'number') {
        throw new Error('prop "pageNumber" is not a number');
      }
      if (!pdfDocProxy) {
        throw new Error('cannot build a page until a "pdfDocProxy" is set on DocumentContext');
      }
      const promise = buildPageObjectURL({ pageNumber, pdfDocProxy, scale, rotation });
      const renderState: RenderState = {
        promise,
        objectURL: null,
      };
      promise.then(objectURL => {
        console.log(`Rendered page ${pageNumber}`, objectURL);
        // TODO: This will not update the context with a new map. The scope of pageRenderStates may be wrong.
        renderState.objectURL = objectURL;
      });
      const newPageRenderStates = new Map(pageRenderStates);
      newPageRenderStates.set(pageNumber, renderState);
      Object.freeze(newPageRenderStates);
      setPageRenderStates(newPageRenderStates);
      return promise;
    },
    [pageRenderStates, pdfDocProxy, scale, rotation]
  );

  React.useEffect(() => {
    for (const pageNumber of visiblePageNumbers) {
      if (pageRenderStates.has(pageNumber)) {
        continue;
      }
      buildObjectURLForPage({ pageNumber });
    }
  }, [pageRenderStates, visiblePageNumbers]);

  return {
    pageRenderStates,
    getObjectURLForPage,
    buildObjectURLForPage,
  };
}

// Generate an object url for a given page, rendered in a shared canvas
async function buildPageObjectURL({
  pageNumber,
  pdfDocProxy,
  scale = 1,
  rotation = PageRotation.Rotate0,
  imageType = 'image/png',
  imageQuality = 1.0,
}: {
  pageNumber: number;
  pdfDocProxy: pdfjs.PDFDocumentProxy;
  scale?: number;
  rotation?: PageRotation;
  imageType?: string;
  imageQuality?: number;
}): Promise<string> {
  console.log(`Rendering page ${pageNumber}`, {
    scale,
    rotation,
  });
  const pageProxy = await pdfDocProxy.getPage(pageNumber);

  const blob: Nullable<Blob> = await useRenderCanvas(async canvas => {
    // Render page in a canvas
    const viewport = pageProxy.getViewport({ scale });
    canvas.height = viewport.height;
    canvas.width = viewport.width;
    const canvasContext = canvas.getContext('2d');
    if (!canvasContext) {
      throw new Error('canvas was unable to get a context');
    }

    // TODO: allow a timeout on the render task
    const renderTask = pageProxy.render({
      canvasContext,
      viewport,
    });
    await renderTask.promise;

    // Fetch a blob for an image of the canvas
    return new Promise((resolve, reject) => {
      try {
        canvas.toBlob(blob => resolve(blob), imageType, imageQuality);
      } catch (error) {
        reject(error);
      }
    });
  });

  // Convert blob image to object url
  if (!blob) {
    throw new Error('unable to create image from page');
  }
  return URL.createObjectURL(blob);
}

let renderCanvas: Nullable<HTMLCanvasElement> = null;

// Get or create a shared canvas for rendering pages in
function getRenderCanvas(): HTMLCanvasElement {
  if (!renderCanvas) {
    renderCanvas = document.createElement('canvas');
  }
  return renderCanvas;
}

let nextCanvasUse: Promise<any> = Promise.resolve();

// Use the shared canvas to render a page, using promises to create a queue
async function useRenderCanvas<T>(callback: (canvas: HTMLCanvasElement) => Promise<T>): Promise<T> {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  let resolve = (_value: T | PromiseLike<T>) => {};
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  let reject = (_reason: any) => {};
  const prom = new Promise<T>((_resolve, _reject) => {
    resolve = _resolve;
    reject = _reject;
  });
  nextCanvasUse = nextCanvasUse.then(() => callback(getRenderCanvas()).then(resolve, reject));
  const result = await prom;
  return result;
}
