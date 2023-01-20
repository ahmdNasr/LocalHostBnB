const { loginUser } = require("./use-cases/login-user.js");
const { registerUser } = require("./use-cases/register-user.js");

const UserService = {
  loginUser,
  registerUser,
};

module.exports = {
  UserService,
};
