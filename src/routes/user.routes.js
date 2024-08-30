import { Router } from 'express'
import { deleteUser, getUser, getUsers, updateUser } from '../controllers/users.controller.js'
import validatorHandler from '../middlewares/validator.handler.js';
import { getUserSchema, updateUserSchema } from '../schemas/user.schema.cjs';
const router = Router();

router.get('/', getUsers);
router.get('/:id', validatorHandler(getUserSchema, 'params'), getUser);
router.put('/:id', validatorHandler(getUserSchema,'params'),validatorHandler(updateUserSchema, 'body'), updateUser)
router.delete('/:id',validatorHandler(getUserSchema,'params'),deleteUser)

export default router;
