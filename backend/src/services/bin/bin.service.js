const { BinModel } = require("../../models");
const ResponseService = require("../response/response.service");
const Error = require("../../config/constant/Error");

const createBin = async (name, address, fullness) => {
    const binToBeCreated = new BinModel({
        name,
        address,
        fullness
      });
    
    const result = await binToBeCreated.save();
    return result;
}

const updateBin = async (id, newInfo) => {
    const binToBeUpdated = { 
      _id: id
    }
    const result = await BinModel.findOneAndUpdate(binToBeUpdated, newInfo);
    console.log(result);
    return result;
}

const getAllBins = async () => {
    const result = await BinModel.find({});
    console.log(result);
    return result;
}

const getBinByName = async (name) => {
    const result = await BinModel.findOne({ name });
    console.log(result);
    return result;
}

module.exports = {
  createBin,
  updateBin,
  getAllBins,
  getBinByName,
};