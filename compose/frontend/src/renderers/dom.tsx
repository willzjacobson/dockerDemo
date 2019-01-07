import React from 'react';
import reactDom from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from '../components/App';

// Use 'hydrate' method with server rendering in production, 'render' method with server rendering in dev
const renderMethod =
  process.env.NODE_ENV === 'development' ? 'render' : 'hydrate';

reactDom[renderMethod](
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root'),
);

// Hot module replacement logic to accept updates from webpack-dev-server
if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept();
}
