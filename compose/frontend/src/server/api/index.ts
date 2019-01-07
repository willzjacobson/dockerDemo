import axios from 'axios';
import express from 'express';

import { API_URL } from '../../config';

const router = express.Router();

router.get('/', async (req: express.Request, res: express.Response) => {
  try {
    const { data } = await axios.get(API_URL);
    res.status(200).json(data);
  } catch (err) {
    console.log('GET err:', err);
    res.status(500).send(err);
  }
});

router.post('/', async (req: express.Request, res: express.Response) => {
  try {
    await axios.post(API_URL);
    res.sendStatus(200);
  } catch (err) {
    console.log('POST err:', err);
    res.status(500).send(err);
  }
});

router.delete('/', async (req: express.Request, res: express.Response) => {
  try {
    const { data } = await axios.delete(API_URL);
    res.status(200).json(data);
  } catch (err) {
    console.log('DELETE err:', err);
    res.status(500).send(err);
  }
});

export default router;
