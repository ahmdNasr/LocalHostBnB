const { UserService } = require("../services");

async function postRegister(req, res) {
  try {
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
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      error: { message: error.message },
    });
  }
}

async function postLogin(req, res) {
  try {
    const credentials = {
      email: req.body.email,
      password: req.body.password,
    };

    const result = await UserService.loginUser(credentials);
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
  postLogin,
  postRegister,
};
