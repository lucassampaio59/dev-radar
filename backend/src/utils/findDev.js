const axios = require('axios');
const Dev = require('../models/Dev');

module.exports = function findDev(github_username) {
  return Dev.findOne({ github_username });
}
