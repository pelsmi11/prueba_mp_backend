const Joi = require('joi');

const email = Joi.string().email({ tlds: { allow: false } });
const token = Joi.string();
const password = Joi.string().min(8);
const newPassword = Joi.string().min(8);

const postLogin = Joi.object({
  email: email.required(),
  password: password.required()
});

const postEmail = Joi.object({
    email: email.required()
  });

  const postNewPass = Joi.object({
    token: token.required(),
    newPassword: newPassword.required()
  })

  module.exports = { postEmail, postNewPass, postLogin };
