const mongoose = require("mongoose");

const binSchema = new mongoose.Schema(
  {
    name: {
        type: String,
        required: true,
        unique: true,
    },
    address: {
        type: String,
        required: true
    },
    fullness: {
        type: Number,
        default: 0
    },
    lat: {
      type: Number,
      default: 0
    },
    lng: {
      type: Number,
      default: 0
    }
  }
);

module.exports = mongoose.model("Bin", binSchema);