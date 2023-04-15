const express = require("express");

const userController = require("../../controllers/user-controller");
const {
  authRequestValidators,
  emailVerification,
} = require("../../middlewares/index");

const router = express.Router();

router.post(
  "/signup",
  [
    authRequestValidators.validateUserAuth,
    emailVerification.emailVerificationSender,
  ],
  userController.create
);
router.post(
  "/signin",
  [authRequestValidators.validateUserAuth],
  userController.signIn
);

router.get("/verify/:token", userController.validateEmail);

router.get("/isAuthenticated", userController.isAuthenticated);

router.get(
  "/isAdmin",
  [authRequestValidators.validateIsAdminRequest],
  userController.isAdmin
);

router.get("/ping", (req, res) => {
  return res.status(200).json({
    message: "pinged",
  });
});
module.exports = router;
