const { User } = require("../../models");

async function showProfile({ userId }) {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User not Found");
  }
  return {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    profilePicture: user.profilePicture,
    bio: user.bio,
    ratingsByHosts: user.ratingsByHosts,
  };
}

module.exports = { showProfile };
