const User = require("../models/user");
const { wrapAsync } = require("../utils");

const registerUser = wrapAsync(async (req, res, next) => {
  const {
    email,
    username,
    firstname,
    lastname,
    phone,
    country,
    password,
    password_confirmation,
  } = req.body;

  if (password !== password_confirmation)
    throw new Error("Passwords do not match", 400);

  const newUser = new User({
    email,
    username,
    firstname,
    lastname,
    phone,
    country,
    password,
    password_confirmation,
  });

  await newUser.save();

  res.status(201).send({
    success: true,
    message: "User created successfully!",
  });
});

const getAllUsers = wrapAsync(async (req, res, next) => {
  const result = await User.find();

  res.status(200).send({
    success: true,
    data: {
      data: result,
    },
  });
});

const loginUser = wrapAsync(async (req, res, next) => {
  const { id, password } = req.body;

  const user = await User.findUserByCredentials(id, password);
  const token = await user.generateAuthToken();

  res.cookie("token", token, { httpOnly: true });

  res.status(200).send({
    success: true,
    data: {
      data: user,
    },
  });
});

const logoutUser = wrapAsync(async (req, res, next) => {
  const token = req.token;
  const user = req.user;

  await user.deleteAuthToken(token);

  res.status(200).send({
    success: true,
    message: "Logged out successfully!",
  });
});

const logoutAllDevices = wrapAsync(async (req, res, next) => {
  const token = req.token;
  const user = req.user;

  await user.deleteAllAuthTokens(token);

  res.status(200).send({
    success: true,
    message: "Logged out successfully!",
  });
});

const getCurrentUser = wrapAsync(async (req, res, next) => {
  res.status(200).send({
    success: true,
    data: {
      data: req.user,
    },
  });
});

const getUserById = wrapAsync(async (req, res, next) => {
  const id = req.params.id;

  const user = await User.findOne({ _id: id });

  res.send({
    success: true,
    data: {
      data: user,
    },
  });
});

module.exports = {
  registerUser,
  getAllUsers,
  loginUser,
  logoutUser,
  logoutAllDevices,
  getCurrentUser,
  getUserById,
};
