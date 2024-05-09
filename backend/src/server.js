// import express
const express = require("express");
const path = require("path");

const app = express();

// Import env
require("dotenv").config({ path: path.join(__dirname, "../.env") });

// Import 3rd party libraries
const cors = require("cors");

// Import resources
const { PORT } = require("./config/constant/Env");

const port = PORT || 8080;

app.listen(port, () => {
  console.log(`Server listening on port ${port}.`);
});