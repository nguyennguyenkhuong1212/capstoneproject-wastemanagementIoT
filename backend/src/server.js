// import express
const express = require("express");
const path = require("path");
const bodyParser = require('body-parser');

const app = express();

// Import env
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ path: path.join(__dirname, "../.env") });
}

// Import 3rd party libraries
const cors = require("cors");
const helmet = require("helmet");

// Import resources
const { PORT } = require("./config/constant/Env");
const { BinRouter } = require("./routers");
const { ResponseService } = require("./services");
const Error = require("./config/constant/Error");
const { globalErrorHandler } = require("./middlewares");

app.use(cors());
app.use(helmet());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/bin", BinRouter);

app.use("*", (req, res, next) => {
  next(
    ResponseService.newError(
      Error.UrlNotFound.errCode,
      Error.UrlNotFound.errMessage
    )
  );
});

app.use(globalErrorHandler);

require("./config/init.mongo");

const port = PORT || 8080;

app.listen(port, () => {
  console.log(`Server listening on port ${port}.`);
});