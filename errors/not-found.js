const CustomErrorApi = require("./custom-error");
const { StatusCodes } = require("http-status-codes");

class NotFoundError extends CustomErrorApi {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}

module.exports = NotFoundError;
