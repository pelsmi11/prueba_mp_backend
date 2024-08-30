const Joi = require('joi');

const id = Joi.number().integer();
const fiscalId = Joi.number().integer().required();
const description = Joi.string().required();
const state = Joi.string().valid('terminado', 'en proceso').required();

const createCaseSchema = Joi.object({
  fiscalId: fiscalId.required(),
  description: description.required(),
  state: state.required()
});

const updateCaseSchema = Joi.object({
  fiscalId: fiscalId,
  description: description,
  state: state
});

const getCaseSchema = Joi.object({
  id: id.required(),
});

module.exports = { createCaseSchema, updateCaseSchema, getCaseSchema };
