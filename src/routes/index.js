import { Router } from 'express';
import passport from '../utils/auth/index.js';
import usersRouter from './user.routes.js'
import authRouter from './auth.routes.js';
import casesRouter from './case.routes.js';
import fiscalRouter from './fiscal.routes.js';

function routerApi(app) {
  const router = Router();
  app.use('/api/v1', router);
  router.use('/users', passport.authenticate('jwt', {session: false}), usersRouter);
  router.use('/fiscals', passport.authenticate('jwt', {session: false}), fiscalRouter);
  router.use('/auth', authRouter);
  router.use('/cases', passport.authenticate('jwt', {session: false}), casesRouter);
}

export default routerApi;
