const axios = require('axios');
const Dev = require('../models/Dev');

module.exports = function trimDev(dev) {
  let devUpdate = {};

  console.log(dev)

  if (dev.name) devUpdate.name = dev.name.trim();
  if (dev.bio) devUpdate.bio = dev.bio.trim();
  if (dev.avatar_url) devUpdate.avatar_url = dev.avatar_url.trim();
  if (dev.techs) devUpdate.techs = dev.techs.trim();
  if (dev.latitude) devUpdate.latitude = dev.latitude.trim();
  if (dev.longitude) devUpdate.longitude = dev.longitude.trim();

  return devUpdate;
}
