const { Stay } = require("../../models");

async function listStays({ hostId, profileStaysOnly }) {
  const stays = await Stay.find(profileStaysOnly ? { hostId } : {}).exec();
  return stays;
}


module.exports = {
  listStays,
};
