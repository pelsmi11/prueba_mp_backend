import { Router } from 'express';
import validatorHandler from './../middlewares/validator.handler.js';
import { createUserSchema } from '../schemas/user.schema.cjs';
import { postEmail, postNewPass, postLogin } from '../schemas/auth.schema.cjs';
import { changePassword, recovery, signIn, signUp, verifyToken } from '../controllers/auth.controller.js';

const router = Router();

router.post('/login',
  validatorHandler(postLogin,'body'),
  signIn);

router.post('/register', validatorHandler(createUserSchema, 'body'), signUp);

router.post('/recovery', validatorHandler(postEmail, 'body'), recovery);

router.post('/change-password', validatorHandler(postNewPass, 'body'), changePassword );

router.post('/verify', verifyToken)

export default router;

