/**
 * This is the main entry point for the UI. You should not need to make any
 * changes here.
 */

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';

import { Reader } from './components/Reader';

import PdfComponents from 'pdf-components';
console.info(PdfComponents);

const App = () => (
  // <PdfComponents.ContextProvider>
  //   <PdfComponents.DownloadButton pdfUrl="." />
  // </PdfComponents.ContextProvider>

  <PdfComponents.ContextProvider>
    <BrowserRouter>
      <Route path="/" component={Reader} />
    </BrowserRouter>
  </PdfComponents.ContextProvider>
);

ReactDOM.render(<App />, document.getElementById('root'));
