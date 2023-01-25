const { loginUser } = require("./use-cases/login-user.js");
const { refreshToken } = require("./use-cases/refresh-token.js");
const { registerUser } = require("./use-cases/register-user.js");

const UserService = {
  loginUser,
  registerUser,
  refreshToken,
};

module.exports = {
  UserService,
};
