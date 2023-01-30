const { Stay } = require("../../models");

async function listStays({ hostId, profileStaysOnly }) {
  const query = profileStaysOnly ? { hostId } : {};
  const stays = await Stay.find(query).exec();
  return stays;
}

module.exports = {
  listStays,
};
