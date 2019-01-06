import bodyParser from 'body-parser';
import express from 'express';

module.exports = (app: express.Router) => {
  app.use(bodyParser.json({ strict: false }));
  app.use(bodyParser.urlencoded({ extended: true }));
};
