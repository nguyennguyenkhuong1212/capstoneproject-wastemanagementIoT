const { ResponseService, BinService } = require("../services");
const Error = require("../config/constant/Error");
const { catchAsync } = require("../utils");

const getAllBins = catchAsync(async (req, res) => {
  const bins = await BinService.getAllBins();
  res.body = ResponseService.newSucess({ bins });
  res.status(200).json(res.body);
});

const createBin = catchAsync(async (req, res) => {
  const { name, address, fullness } = req.body;  
  const bin = await BinService.getBinByName(name);
  if (bin) {
    res.body = {
      errCode: Error.BinAlreadyExists.errCode,
      errMessage: Error.BinAlreadyExists.errMessage,
    };
    res.status(400).json({
      error: {
        errCode: Error.BinAlreadyExists.errCode,
        message: Error.BinAlreadyExists.errMessage
      }
    });
    throw ResponseService.newError(
      Error.BinAlreadyExists.errCode,
      Error.BinAlreadyExists.errMessage
    );
  }
  const result = await BinService.createBin(name, address, fullness);
  res.status(200).json(ResponseService.newSucess(result));
});

const updateBin = catchAsync(async (req, res) => {
  const { id, newInfo } = req.body;

  if (newInfo.name){
    const bin = await BinService.getBinByName(newInfo.name);
    if (bin) {
      res.body = {
        errCode: Error.BinAlreadyExists.errCode,
        errMessage: Error.BinAlreadyExists.errMessage,
      };
      res.status(400).json({
        error: {
          errCode: Error.BinAlreadyExists.errCode,
          message: Error.BinAlreadyExists.errMessage
        }
      });
      throw ResponseService.newError(
        Error.BinAlreadyExists.errCode,
        Error.BinAlreadyExists.errMessage
      );
    }
  }
  
  const result = await BinService.updateBin(id, newInfo);
  res.status(200).json(ResponseService.newSucess(result));
});

const getBinByName = catchAsync(async (req, res) => {
  const { name } = req.query;
  console.log(name);

  const result = await BinService.getBinByName(name);
  res.status(200).json(ResponseService.newSucess(result));
});


module.exports = { 
  getAllBins, 
  createBin,
  updateBin,
  getBinByName
};