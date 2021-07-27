/**
 * This is the main entry point for the UI. You should not need to make any
 * changes here unless you want to update the theme.
 *
 * @see https://github.com/allenai/varnish
 */

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';

import { ContextProvider } from './library/components/ContextProvider';
import { Reader } from './Reader';

const App = () => (
  <BrowserRouter>
    <Route path="/">
      <ContextProvider>
        <Reader />
      </ContextProvider>
    </Route>
  </BrowserRouter>
);

ReactDOM.render(<App />, document.getElementById('root'));
