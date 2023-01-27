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

module.exports = userRouter;
