const CustomErrorApi = require("./custom-error");
const { StatusCodes } = require("http-status-codes");

class AuthenticationError extends CustomErrorApi {
  constructor(message) {
    super(message);
    this.statusCodes = StatusCodes.UNAUTHORIZED;
  }
}
module.exports = AuthenticationError;
