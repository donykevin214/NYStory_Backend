require('module-alias/register');

import cors from 'cors';
import debug from 'debug';
import express from 'express';
import { createServer as createHttpServer } from 'http';
import morgan from 'morgan';
import config from '~/config';
import { router } from '~/routes'
const log = debug('app:main');

export async function start() {
  const app = express();
  const http = createHttpServer(app);

  if (config.cors.enabled) {
    log('enable CORS');
    app.use(cors(config.cors.options));
  } else {
    app.use(cors())
  }

  if (config.morgan.enabled) {
    log('enable morgan');
    app.use(morgan(config.morgan.type));
  }

  app.use(express.static('public'));
  app.set('trust proxy', true) // req.ip will return the real IP address even if behind proxy.

  app.use(express.json({ limit: '10kb' }));
  app.use(express.urlencoded({ extended: true, limit: '10kb' }));
  app.use(router);

  app.get('/*', (req, res) => {
    res.status(404).json({
      success: false,
      message: 'API does not exist!',
    });
  });

  app.post('/*', (req, res) => {
    res.status(404).json({
      success: false,
      message: 'API does not exist!',
    });
  });


  return http;
}
