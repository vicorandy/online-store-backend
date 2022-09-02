const CustomErrorApi = require("./custom-error");
const { StatusCodes } = require("http-status-codes");

class BadReuestError extends CustomErrorApi {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

module.exports = BadReuestError;
