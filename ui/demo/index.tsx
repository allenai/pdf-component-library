/**
 * This is the main entry point for the UI. You should not need to make any
 * changes here.
 */

import * as React from 'react';
import * as ReactDOM from 'react-dom';

// @ts-ignore
import { rotateClockwise } from '../dist/pdf-components';
console.info(rotateClockwise);


const App = () => (
  <h1>Yooooooo</h1>
);

ReactDOM.render(<App />, document.getElementById('root'));
