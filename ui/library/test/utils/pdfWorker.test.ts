import { expect } from 'chai';
import { pdfjs } from 'react-pdf';

import { initPdfWorker } from '../../src/utils/pdfWorker';

describe('initPdfWorker', () => {
  it('pdf worker CDN matches the check in pingdom.com', () => {
    initPdfWorker();
    expect(pdfjs.GlobalWorkerOptions.workerSrc).to.equal(
      '//cdnjs.cloudflare.com/ajax/libs/pdf.js/2.12.313/pdf.worker.min.js'
    );
  });
});
