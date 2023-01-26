const { loginUser } = require("./use-cases/login-user.js");
const { offerStay } = require("./use-cases/offer-stay.js");
const { refreshToken } = require("./use-cases/refresh-token.js");
const { registerUser } = require("./use-cases/register-user.js");

const UserService = {
  loginUser,
  registerUser,
  refreshToken,
};

const StayService = {
  offerStay,
};

module.exports = {
  UserService,
  StayService,
};
