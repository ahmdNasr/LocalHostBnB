const { StayService } = require("../services");

async function postOfferStay(req, res) {
  try {
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
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      error: { message: error.message },
    });
  }
}

module.exports = {
  postOfferStay,
};
