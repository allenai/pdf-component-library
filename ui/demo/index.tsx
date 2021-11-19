/**
 * This is the main entry point for the UI. You should not need to make any
 * changes here.
 */

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { ContextProvider } from 'pdf-components';

import { Reader } from './components/Reader';

const App = () => (
  <ContextProvider>
    <BrowserRouter>
      <Route path="/" component={Reader} />
    </BrowserRouter>
  </ContextProvider>
);

ReactDOM.render(<App />, document.getElementById('root'));
