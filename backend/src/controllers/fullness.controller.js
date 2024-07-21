// src/controllers/fullnessController.js
const { TwilioService } = require('../services');

const getFullnessData = (req, res) => {
  const fullness = TwilioService.getFullness();
  res.json({ fullness });
};

module.exports = {
  getFullnessData,
};
