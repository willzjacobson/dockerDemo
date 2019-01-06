import express from 'express';

import * as files from './files';

const router = express.Router();

router.get('/files', files.get);

export default router;
