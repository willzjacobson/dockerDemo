import cors from 'cors';
import express from 'express';
import helmet from 'helmet';

import { PORT, WEBPACK_OUTPUT_DIR } from '../config';

const app = express();

// Set various headers for protection
app.use(helmet());
// Allow cross-domain requests
app.use(cors());

import serverRender from '../renderers/server';
import api from './api';

app.use('/api', api);

// JS bundles & assets are placed in this file by webpack.
// Serve them as static files
// Other assets such as images will go here as well,
// though this app currently has none
// (Note: an appropriate Webpack loader would need to be defined)
app.use(express.static(WEBPACK_OUTPUT_DIR));

app.get('/*', serverRender);

// Error handling middleware
app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    console.log('Request reached error handling', err);
    res.sendStatus(err.status || 500);
  },
);

app.listen(PORT, () =>
  console.log(`The server is listening closely on port ${PORT}...`),
);
