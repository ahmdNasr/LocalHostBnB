const { Stay, User } = require("../../models");

async function listStays({ hostId, loggedInUserId, filter }) {
  const makeQueryFromFilter = (filter) => {
    return {
      title: { $regex: filter.location },
      description: { $regex: filter.location },
      location: { $regex: filter.location },
      price: { $gte: filter.priceMin, $lte: filter.priceMax },

      // filter.dateStart, filter.dateEnd
      // reservations: [{ startDate, endDate }, { startDate, endDate }]

      //   now ==========================================> future
      // stay1      ===============      =========          ====
      // stay2   ===      =====   =====     ===========
      // stay3   =========             ======
      // filter                     ??????

      // option 1 - no overlap
      // ======
      //       ======
      // option 4 - no overlap
      //         ======
      // ======

      // reservation: {
      //   $all: [{
      //     // match no overlap
      //     $elemMatch: {
      //       $or: [
      //         { endDate: { $lt: filter.dateStart } },
      //         { startDate: { $gt: filter.dateEnd } },
      //       ],
      //     },
      //   }],
      // },
    };
  };

  const query = typeof hostId !== "undefined" ? { hostId } : {}; //makeQueryFromFilter(filter);
  const _stays = await Stay.find(query).exec(); // hostId can be from token, from query, or undefined!

  console.log({ query, _stays: _stays.length });

  const noOverlapWithDateFilter = (reservation) =>
    reservation.endDate < filter.dateStart ||
    reservation.startDate > filter.dateEnd;
  const stays =
    filter.dateStart || filter.dateEnd
      ? _stays.filter((stay) =>
          stay.reservations.every(noOverlapWithDateFilter)
        )
      : _stays;

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
      isYourStay: stay.hostId.toString() === loggedInUserId,
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
