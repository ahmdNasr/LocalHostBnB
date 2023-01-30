const { Stay } = require("../../models");

async function listStays({ hostId }) {
  if (hostId) {
    const stays = await Stay.find({ hostId }).exec();
    return stays;
  } else {
    const stays = await Stay.find().exec();
    return stays;
  }
}

module.exports = {
  listStays,
};
