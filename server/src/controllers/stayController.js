const { StayService } = require("../services");
const { catchErrors } = require("./catchError.js");

const postOfferStay = catchErrors(async (req, res) => {
  const stayInfos = {
    title: req.body.title,
    description: req.body.description,
    hostId: req.verifiedUserClaims.sub, // Take userId of "logged in" user (aka form his verified Token)
    price: req.body.price,
    location: req.body.location,
    highlights: req.body.highlights,
    pictures: req.body.pictures,
  };

  const result = await StayService.offerStay(stayInfos);
  return res.json({
    status: "ok",
    result,
  });
});

const getListStays = catchErrors(async (req, res) => {
  const profileStaysOnly = req.query.onlyMyStays === "yes";
  const hostId = profileStaysOnly
    ? req.verifiedUserClaims.sub
    : req.query.hostId;
  const loggedInUserId = req.verifiedUserClaims.sub;
  const result = await StayService.listStays({ hostId, loggedInUserId });
  return res.json({
    status: "ok",
    result,
  });
});

const getShowStay = catchErrors(async (req, res) => {
  const stayId = req.params.stayId;
  const result = await StayService.showStay({ stayId });
  return res.json({
    status: "ok",
    result,
  });
});

module.exports = {
  postOfferStay,
  getListStays,
  getShowStay,
};
