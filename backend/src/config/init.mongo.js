const mongoose = require("mongoose");
const { MONGO_URL } = require("./constant/Env");

mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to Mongoose successfully!"))
  .catch((err) => console.error(`Mongo Error: connect:::`, err));

module.exports = mongoose;