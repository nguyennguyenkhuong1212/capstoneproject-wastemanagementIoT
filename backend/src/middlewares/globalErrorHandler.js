/* eslint-disable no-param-reassign */
const { ResponseService } = require("../services");
const Error = require("../config/constant/Error");
const handleCastErrorDB = () => {
  return ResponseService.newError(
    Error.CastError.errCode,
    Error.CastError.errMessage
  );
};

const handleDuplicateFieldsDB = () => {
  return ResponseService.newError(
    Error.DuplicateFieldError.errCode,
    Error.DuplicateFieldError.errMessage
  );
};

const sendErrorDev = (err, res) => {
  console.log(err);
  res.body = {
    errCode: err.errCode,
    errMessage: err.message,
  };
  res.status(err.statusCode).json({
    code: 1,
    message: "Unsuccessfully",
    statusCode: err.statusCode,
    errCode: err.errCode,
    errMessage: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  // Should not enable logging in Production
  console.log(err);
  res.body = {
    errCode: err.errCode,
    errMessage: err.message,
  };
  //
  res.status(err.statusCode).json({
    code: 1,
    message: "Unsuccessfully",
    statusCode: err.statusCode,
    errCode: err.errCode,
    errMessage: err.message,
  });
};

module.exports = (err, req, res, next) => {

  if (err.name === "CastError") err = handleCastErrorDB();
  if (err.code === 11000) err = handleDuplicateFieldsDB();

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res);
  } 
  else if (process.env.NODE_ENV === "production") {
    sendErrorProd(err, res);
  }
};