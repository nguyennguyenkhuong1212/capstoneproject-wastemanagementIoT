const express = require("express");
const { BinController } = require("../controllers");

const router = express.Router();

router
  .route("/getAllBins")
  .get(BinController.getAllBins);

router
  .route("/createBin")
  .post(BinController.createBin);

router
  .route("/getBinByName")
  .get(BinController.getBinByName);

router
  .route("/updateBin")
  .put(BinController.updateBin);

module.exports = router;