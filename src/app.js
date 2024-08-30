import express from 'express';
import cors from 'cors';
import pkg from '../package.json' assert { type: 'json' };
import routerApi from './routes/index.js';
import morgan from 'morgan';
import passport from './utils/auth/index.js';
import { config } from './config/config.cjs';
import {
  logErrors,
  errorHandler,
  boomErrorHandler,
  ormErrorHandler,
} from './middlewares/error.handler.js';

const app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(passport.initialize());

const whitelist = [`${config.urlFrontend}`];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('no permitido'));
    }
  },
};

app.use(cors(options));

app.get('/api/v1/', (req, res) => {
  res.json({
    name: pkg.name,
    author: pkg.author,
    description: pkg.description,
    version: pkg.version,
  });
});

routerApi(app);

app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

export default app;
