const multer = require("multer");
const express = require("express");
const { userController } = require("../controllers");
const { makeAuthMiddleware } = require("../middleware/doAuth");

const userRouter = express.Router();

userRouter.post("/login", userController.postLogin);
userRouter.post("/register", userController.postRegister);
userRouter.post(
  "/refresh-token",
  makeAuthMiddleware({ tokenType: "refresh" }),
  userController.postRefreshToken
);

userRouter.post("/logout", (req, res) => {
  req.session.refreshToken = null; // delete refresh token
  res.json({ status: "ok", result: {} });
});

userRouter.get(
  "/profile",
  makeAuthMiddleware({ tokenType: "access" }),
  userController.getShowProfile
);

userRouter.put(
  "/profile",
  makeAuthMiddleware({ tokenType: "access" }),
  multer({ dest: "imageUploads" }).single("profilePicture"), // multipart/form-data!
  userController.putEditProfile
);

userRouter.post("/forgot-password", userController.postForgotPassword);
userRouter.post(
  "/reset-password",
  makeAuthMiddleware({ tokenType: "password-reset" }),
  userController.postResetPassword
);

module.exports = userRouter;
