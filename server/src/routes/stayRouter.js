const express = require("express");
const { stayController } = require("../controllers");
const { makeAuthMiddleware } = require("../middleware/doAuth");

const stayRouter = express.Router();

stayRouter.post(
  "/",
  makeAuthMiddleware({ tokenType: "access" }),
  stayController.postOfferStay
);

module.exports = stayRouter;
