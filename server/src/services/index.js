const { listStays } = require("./use-cases/list-stays.js");
const { loginUser } = require("./use-cases/login-user.js");
const { offerStay } = require("./use-cases/offer-stay.js");
const { refreshToken } = require("./use-cases/refresh-token.js");
const { registerUser } = require("./use-cases/register-user.js");
const { showStay } = require("./use-cases/show-stay.js");
const { showProfile } = require("./use-cases/show-profile.js");
const { editProfile } = require("./use-cases/edit-profile.js");
const { forgotPassword } = require("./use-cases/forgot-password.js");
const { resetPassword } = require("./use-cases/reset-password.js");

const UserService = {
  loginUser,
  registerUser,
  refreshToken,
  forgotPassword,
  resetPassword,
  showProfile,
  editProfile,
};

const StayService = {
  offerStay,
  listStays,
  showStay,
};

module.exports = {
  UserService,
  StayService,
};
