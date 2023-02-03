const express = require("express");
const { stayController } = require("../controllers");
const { makeAuthMiddleware } = require("../middleware/doAuth");

const stayRouter = express.Router();

stayRouter.get(
  "/",
  makeAuthMiddleware({ tokenType: "access" }),
  stayController.getListStays
);

stayRouter.get(
  "/:stayId",
  makeAuthMiddleware({ tokenType: "access" }),
  stayController.getShowStay
);
// stayRouter.get("/",
//   makeAuthMiddleware({ tokenType: "access" })
//   stayController
// );

stayRouter.post(
  "/",
  makeAuthMiddleware({ tokenType: "access" }),
  stayController.postOfferStay
);

module.exports = stayRouter;
