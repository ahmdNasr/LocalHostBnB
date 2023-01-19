const { loginUser } = require("./use-cases/login-user.js");

const UserService = {
  loginUser,
};

module.exports = {
  UserService,
};
