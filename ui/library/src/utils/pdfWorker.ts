// Import from webpack entrypoint to load PDFjs worker
// @ts-ignore This file does not have types associated with it. This is ok because it's just a wrapper for loading the worker.
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry';
import { pdfjs } from 'react-pdf/dist/esm/entry.webpack';

// Set PDFjs worker source or else PDF will not load when this library is imported as a package.
// Possibly related to issue #30125
export function initPdfWorker(): void {
  pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;
}
