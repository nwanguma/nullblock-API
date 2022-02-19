const Joi = require("joi");

const registerValidationSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  username: Joi.string().min(3).max(20).required(),
  firstname: Joi.string().min(3).max(20).required(),
  lastname: Joi.string().min(3).max(20).required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
  password_confirmation: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .required(),
  country: Joi.string().required(),
});

const loginValidationSchema = Joi.object().keys({
  id: Joi.string().required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
});

module.exports = {
  registerValidationSchema,
  loginValidationSchema,
};
