const { Stay } = require("../../models");

async function showStay({ stayId }) {
  const stay = await Stay.findById(stayId).exec();
  if (!stay) {
    throw new Error("Stay not found");
  }
  return stay;
}

module.exports = {
  showStay,
};
