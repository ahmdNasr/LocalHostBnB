const { Stay, User } = require("../../models");

async function listStays({ hostId, profileStaysOnly }) {
  const query = profileStaysOnly ? { hostId } : {};
  // const stays = await Stay.find(query).populate("hostId").exec(); // mongoose Lösung
  const stays = await Stay.find(query).exec();

  const hostIds = stays.map((stay) => stay.hostId);
  const users = await User.find({ _id: { $in: hostIds } });

  // stay vor manual populate: { title, desc, ..., hostId, ... }
  // danach: { title, desc, ..., hostId, ..., host: { _id, firstName, lastName, email, profilePicture }  }
  const staysWithHosts = stays.map((stay) => {
    const hostUser = users.find(
      (user) => user._id.toString() === stay.hostId.toString()
    );
    return {
      ...stay.toObject(),
      host: {
        _id: hostUser._id,
        firstName: hostUser.firstName,
        lastName: hostUser.lastName,
        email: hostUser.email,
        profilePicture: hostUser.profilePicture,
      },
    };
  });
  return staysWithHosts;
}

module.exports = {
  listStays,
};
