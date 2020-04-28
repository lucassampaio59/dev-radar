const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');
const findDev = require('../utils/findDev');
const trimDev = require('../utils/trimDev');

module.exports = {
  async index(req, res) {
    const devs = await Dev.find();

    return res.json(devs);
  },

  async store(req, res) {
    const { github_username, techs, latitude, longitude } = req.body;

    let dev = await findDev(github_username);

    if (!dev) {
      const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
  
      const { name = login, avatar_url, bio } = apiResponse.data;
    
      const techsArray = parseStringAsArray(techs);
    
      const location = {
        type: 'Point',
        coordinates: [longitude, latitude],
      };
    
      dev = await Dev.create({
        github_username,
        name,
        avatar_url,
        bio,
        techs: techsArray,
        location,
      })
    }

    return res.json(dev);
  },

  async update(req, res) {
    const { github_username } = req.query;

    let dev = await findDev(github_username);

    if(!dev) {
      return res.status(401).json({ error: `Dev with username ${github_username} not found` });
    }

    let devUpdate = {};
    
    if (req.body) devUpdate = req.body;

    if (req.body.github_username) {
      return res.status(401).json({ error: "Unauthorized operation" });
    }

    devUpdate = trimDev(devUpdate);

    if (req.body.techs) {
      const techsArray = parseStringAsArray(devUpdate.techs);
      devUpdate.techs = techsArray;
    }

    if (req.body.latitude && req.body.longitude) {
      const location = {
        type: 'Point',
        coordinates: [devUpdate.longitude, devUpdate.latitude],
      };
      devUpdate.location = location;
    }

    dev = await Dev.updateOne({github_username}, devUpdate)

    return res.status(200).json({ message: `Dev with username ${github_username} updated successfully` });

  },

  async destroy(req, res) {
    const { github_username } = req.params;
    let dev = await findDev(github_username);

    if (!dev) {
      return res.status(401).json({ error: `Dev with username ${github_username} not found` });
    }
    
    dev = await Dev.deleteOne({
      github_username: github_username,
    })

    return res.status(200).json({ message: `Dev with username ${github_username} deleted successfully` });
  }
}