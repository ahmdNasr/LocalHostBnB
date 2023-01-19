async function loginUser({ email, password }) {
  console.log("inside loginUser service", { email, password });
  return { accessToken: "", refreshToken: "" };
}

module.exports = {
  loginUser,
};
