const express = require("express");
const { authenticate, inputValidation } = require("../middleware");

const {
  getAllUsers,
  registerUser,
  loginUser,
  logoutUser,
  logoutAllDevices,
  getCurrentUser,
  getUserById,
} = require("../controllers/user");

const {
  registerValidationSchema,
  loginValidationSchema,
} = require("../validation/schemas");

const router = express.Router();

router.get("/", authenticate, getAllUsers);
router.get("/me", authenticate, getCurrentUser);
router.post(
  "/auth/register",
  inputValidation(registerValidationSchema),
  registerUser
);
router.post("/auth/login", inputValidation(loginValidationSchema), loginUser);
router.delete("/auth/logout", authenticate, logoutUser);
router.delete("/auth/logoutAll", authenticate, logoutAllDevices);
router.get("/:id", authenticate, getUserById);

module.exports = router;
