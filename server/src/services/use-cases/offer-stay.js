const { Stay } = require("../../models");

async function offerStay({
  title,
  description,
  hostId,
  price,
  location,
  highlights,
  pictures,
}) {
  console.log({
    title,
    description,
    hostId,
    price,
    location,
    highlights,
    pictures,
  });
  const stay = await Stay.create({
    title,
    description,
    hostId,
    price,
    location,
    highlights,
    pictures,
  });
  return stay;
}

module.exports = {
  offerStay,
};
