import React from 'react';
import reactDom from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import App from '../components/App';
import configureStore from '../store';

const store = configureStore({});

// Use 'hydrate' method with server rendering in production, 'render' method with server rendering in dev
const renderMethod =
  process.env.NODE_ENV === 'development' ? 'render' : 'hydrate';

reactDom[renderMethod](
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);

// Hot module replacement logic to accept updates from webpack-dev-server
if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept();
  module.hot.accept('../reducers', () => {
    store.replaceReducer(require('../reducers').default);
  });
}
