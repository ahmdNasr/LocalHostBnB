const express = require("express");
const { userController } = require("../controllers");

const userApp = express.Router();

userApp.post("/login", userController.postLogin);

module.exports = userApp;
