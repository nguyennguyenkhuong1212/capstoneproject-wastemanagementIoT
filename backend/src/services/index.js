// src/services/index.js
const ResponseService = require('./response/response.service');
const BinService = require('./bin/bin.service');
const TwilioService = require('./twilio.service');

module.exports = {
  ResponseService,
  BinService,
  TwilioService,
};
