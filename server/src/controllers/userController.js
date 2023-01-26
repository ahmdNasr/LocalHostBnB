const { UserService } = require("../services");
const { catchErrors } = require("./catchError.js");

const postRegister = catchErrors(async (req, res) => {
  const userInfos = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    profilePicture: req.body.profilePicture,
    bio: req.body.bio,
  };

  const result = await UserService.registerUser(userInfos);
  return res.json({
    status: "ok",
    result,
  });
});

const postLogin = catchErrors(async (req, res) => {
  const credentials = {
    email: req.body.email,
    password: req.body.password,
  };

  const result = await UserService.loginUser(credentials);
  return res.json({
    status: "ok",
    result,
  });
});

const postRefreshToken = catchErrors(async (req, res) => {
  const userId = req.verifiedUserClaims.sub;
  const result = await UserService.refreshToken({ userId });
  return res.json({
    status: "ok",
    result,
  });
});

module.exports = {
  postLogin,
  postRegister,
  postRefreshToken,
};
