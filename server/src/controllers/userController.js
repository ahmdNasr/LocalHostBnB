const { UserService } = require("../services");

async function postLogin(req, res) {
  try {
    const credentials = {
      email: req.body.email,
      password: req.body.password,
    };

    const result = await UserService.loginUser(credentials);
    return {
      status: "ok",
      result,
    };
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
};
