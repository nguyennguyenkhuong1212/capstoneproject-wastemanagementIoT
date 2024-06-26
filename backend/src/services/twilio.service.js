// src/services/twilio.service.js
const twilio = require('twilio');
require('dotenv').config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const apiKey = process.env.TWILIO_API_KEY;
const apiSecret = process.env.TWILIO_API_SECRET;
const client = twilio(apiKey, apiSecret, { accountSid });

let latestFullness = 0;
const maxDistance = 15; // Maximum distance for the bin

const parseFullnessFromMessage = (messageBody) => {
  const distance = parseInt(messageBody, 10);
  if (!isNaN(distance)) {
    // Calculate fullness percentage based on maxDistance
    return Math.min(100, Math.max(0, ((maxDistance - distance) / maxDistance) * 100));
  }
  return null;
};

const fetchLatestFullness = async () => {
  try {
    const messages = await client.messages.list({ limit: 1 });
    if (messages.length > 0) {
      const message = messages[0];
      const fullness = parseFullnessFromMessage(message.body);
      if (fullness !== null) {
        latestFullness = fullness;
      }
    }
  } catch (error) {
    console.error('Error fetching messages:', error);
  }
};

const getFullness = () => latestFullness;

setInterval(fetchLatestFullness, 10000);

module.exports = {
  getFullness,
};
