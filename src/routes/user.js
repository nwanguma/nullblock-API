//Todo - Add verification & passowrd reset when sendgrid is enabled for email.

const express = require("express");
const { authenticate, payloadValidation } = require("../middleware");

const {
  getAllUsers,
  registerUser,
  loginUser,
  logoutUser,
  logoutAllDevices,
  getCurrentUser,
  getUserById,
  changeUserPassword,
} = require("../controllers/user");

const {
  registerValidationSchema,
  loginValidationSchema,
  passwordChangeValidationSchema,
} = require("../validation/schemas");

const router = express.Router();

router.get("/", authenticate, getAllUsers);
router.get("/me", authenticate, getCurrentUser);
router.post(
  "/auth/register",
  payloadValidation(registerValidationSchema),
  registerUser
);
router.patch(
  "/auth/password/change",
  payloadValidation(passwordChangeValidationSchema),
  authenticate,
  changeUserPassword
);
router.post("/auth/login", payloadValidation(loginValidationSchema), loginUser);
router.delete("/auth/logout", authenticate, logoutUser);
router.delete("/auth/logoutAll", authenticate, logoutAllDevices);
router.get("/:id", authenticate, getUserById);

module.exports = router;
