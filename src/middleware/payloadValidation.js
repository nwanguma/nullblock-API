const { AppError } = require("../utils");

const payloadValidation = (validationSchema) => {
  return (req, res, next) => {
    const { error } = validationSchema.validate(req.body);

    if (error) {
      const errorMessage = error.details[0].message
        .replace('"', "")
        .replace('"', "");

      throw new AppError(errorMessage, 400);
    }

    next();
  };
};

module.exports = payloadValidation;
