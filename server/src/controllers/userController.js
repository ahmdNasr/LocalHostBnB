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

  const { accessToken, refreshToken } = await UserService.loginUser(
    credentials
  );

  if (refreshToken) {
    // save refresh token into cookie
    req.session.refreshToken = refreshToken;
  }

  return res.json({
    status: "ok",
    result: { accessToken, refreshToken },
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
