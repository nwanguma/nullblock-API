const User = require("../models/user");
const { AppError, wrapAsync } = require("../utils");

const authenticate = wrapAsync(async (req, res, next) => {
  const token = req.cookies.token;

  const user = await User.findUserByToken(token);

  if (!user) throw new AppError("User unauthorized!", 403);

  req.user = user;
  req.token = token;

  next();
});

module.exports = authenticate;
