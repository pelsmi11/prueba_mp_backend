import { Router } from 'express'
import validatorHandler from '../middlewares/validator.handler.js';
import { getFiscalSchema, createFiscalSchema, updateFiscalSchema } from '../schemas/fiscal.schema.cjs';
import { createFiscal, deleteFiscal, getFiscal, getFiscals, updateFiscal } from '../controllers/fiscal.controller.js';
const router = Router();

router.get('/', getFiscals);
router.get('/:id', validatorHandler(getFiscalSchema, 'params'), getFiscal);
router.post('/', validatorHandler(createFiscalSchema, 'body'), createFiscal);
router.put('/:id', validatorHandler(getFiscalSchema,'params'), validatorHandler(updateFiscalSchema, 'body'),updateFiscal);
router.delete('/:id',validatorHandler(getFiscalSchema,'params'), deleteFiscal);

export default router;
