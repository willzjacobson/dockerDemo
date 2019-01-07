import express from 'express';
import fs from 'fs';
import { join } from 'path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { promisify } from 'util';

const readFileAsync = promisify(fs.readFile);

import { NODE_ENV, WEBPACK_OUTPUT_DIR } from '../config';

import App from '../components/App';

const serverRender = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  // Don't serve in dev mode. index.html is served by webpack-dev-server
  if (NODE_ENV === 'development') return next();

  // This context object is used by the BrowserRouter and StaticRouter
  // to pass information to each other
  const context: any = {};
  // Markup to send preloaded to client
  const app = renderToString(
    <StaticRouter location={req.url} context={context}>
      <App />
    </StaticRouter>,
  );

  try {
    // Webpack generates 'generated.html' using WebpackHtmlPlugin
    // We intentionally do not call it 'index.html' so it is ignored by express.static
    const template = await readFileAsync(
      join(WEBPACK_OUTPUT_DIR, 'generated.html'),
      'utf8',
    );

    // This shouldn't happen given the Redirect component in the App component,
    // But including to be explicit just in case.
    if (context.status === 404) {
      res.status(404);
    }

    // Context.url is defined if a Redirect component was tripped in a routing Switch case
    // Handle the redirect explicitly on the server in this case.
    if (context.url) {
      return res.redirect(301, context.url);
    }

    // The pre-rendered markup is injected into index.html and sent to the client.
    // This means that while the client is fetching the JS bundles in the script tags in index.html,
    // the user is already able to interact with the markup.
    return res.send(
      template.replace(/id="root">.*<\/div>/, `id="root">${app}</div>`),
    );
  } catch (err) {
    return res
      .status(500)
      .send(`Error injecting markup into html template: ${err}`);
  }
};

export default serverRender;
