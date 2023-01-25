const express = require("express");
const { userController } = require("../controllers");
const { makeAuthMiddleware } = require("../middleware/doAuth");

const userApp = express.Router();

userApp.post("/login", userController.postLogin);
userApp.post("/register", userController.postRegister);
userApp.post(
  "/refresh-token",
  makeAuthMiddleware({ tokenType: "refresh" }),
  userController.postRefreshToken
);

module.exports = userApp;
