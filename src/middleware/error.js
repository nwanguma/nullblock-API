const handleErrors = (err, req, res, next) => {
  const { name, message = "An Error Occurred", status, statusCode = 400 } = err;

  res.status(statusCode).send({
    error: true,
    message,
  });
};

module.exports = handleErrors;
