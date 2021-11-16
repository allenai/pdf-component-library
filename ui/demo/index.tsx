/**
 * This is the main entry point for the UI. You should not need to make any
 * changes here.
 */

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import PdfComponents from 'pdf-components';
console.info(PdfComponents.BoundingBox);
console.info(PdfComponents.rotateClockwise(PdfComponents.PageRotation.Rotate180));

const App = () => (
  <h1>Yooooooo</h1>
);

ReactDOM.render(<App />, document.getElementById('root'));
