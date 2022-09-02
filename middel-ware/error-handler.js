const { CustomErrorApi } = require("../errors/index");
const { StatusCodes } = require("http-status-codes");

const errorHandlerMiddelware = function (err, req, res, next) {
  console.log(err);
  if (err instanceof CustomErrorApi) {
    return res.status(err.statusCode).json({ msg: err.message });
  }
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: err });
};

module.exports = errorHandlerMiddelware;
