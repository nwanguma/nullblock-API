const Joi = require("joi");

const registerValidationSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  username: Joi.string().min(3).max(20).required(),
  firstname: Joi.string().min(3).max(20).required(),
  lastname: Joi.string().min(3).max(20).required(),
  password: Joi.string()
    .pattern(
      new RegExp(
        "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
      )
    )
    .message({
      "string.pattern.base":
        "Invalid password. Password must be a minimum of 8 characters, must contain at least one uppercase letter, one digit and one special characters",
    })
    .required(),
  passwordConfirmation: Joi.string()
    .pattern(
      new RegExp(
        "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
      )
    )
    .message({
      "string.pattern.base":
        "Invalid password. Password must be a minimum of 8 characters, must contain at least one uppercase letter, one digit and one special characters",
    })
    .required(),
  country: Joi.string().required(),
});

const loginValidationSchema = Joi.object().keys({
  id: Joi.string().required(),
  password: Joi.string().required(),
});

const passwordChangeValidationSchema = Joi.object().keys({
  password: Joi.string().required(),
  newPassword: Joi.string()
    .required()
    .pattern(
      new RegExp(
        "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
      )
    ),
  passwordConfirmation: Joi.string()
    .required()
    .pattern(
      new RegExp(
        "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
      )
    ),
});

module.exports = {
  registerValidationSchema,
  loginValidationSchema,
  passwordChangeValidationSchema,
};
