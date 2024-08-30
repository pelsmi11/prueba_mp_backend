import {Router} from 'express'
import { createCaseSchema, getCaseSchema, updateCaseSchema } from '../schemas/case.schema.cjs';
import { createCase, getCases, getCase, updateCase, deleteCase } from '../controllers/cases.controller.js'
import validatorHandler from '../middlewares/validator.handler.js';
const router = Router();

router.get('/', getCases);
router.get('/:id', validatorHandler(getCaseSchema, 'params'), getCase );
router.post('/',validatorHandler(createCaseSchema, 'body'), createCase );
router.put('/:id', validatorHandler(getCaseSchema, 'params'),validatorHandler(updateCaseSchema, 'body'), updateCase );
router.delete('/:id', validatorHandler(getCaseSchema, 'params'), deleteCase);

export default router;
