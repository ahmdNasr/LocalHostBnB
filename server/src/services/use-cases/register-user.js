const { User } = require("../../models");
const { createHash, createRandomSalt } = require("../utilities/createHash");

async function registerUser({
  firstName,
  lastName,
  email,
  password,
  profilePicture,
  bio,
}) {
  // connectToDatabase aufrufen
  const foundUser = await User.findOne({ email }).exec();
  if (foundUser) {
    throw new Error("User with this Email already exists");
  }
  const passwordSalt = createRandomSalt();
  const passwordHash = createHash(`${password}${passwordSalt}`);
  const newUser = await User.create({
    firstName,
    lastName,
    email,
    passwordHash,
    passwordSalt,
    profilePicture,
    bio,
  });
  return {
    _id: newUser._id,
    firstName: newUser.firstName,
    lastName: newUser.lastName,
    email: newUser.email,
    profilePicture: newUser.profilePicture,
    bio: newUser.bio,
  };
}

module.exports = {
  registerUser,
};
