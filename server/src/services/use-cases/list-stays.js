const { Stay } = require("../../models");

async function listStays() {
  const stays = await Stay.find().exec();
  return stays;
}

module.exports = {
  listStays,
};
