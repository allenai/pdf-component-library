import { pdfjs } from 'react-pdf';

// Set PDFjs worker source or else PDF will not load when this library is imported as a package.
export function initPdfWorker(): void {
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
}
