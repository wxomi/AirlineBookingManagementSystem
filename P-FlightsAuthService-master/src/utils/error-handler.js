const { StatusCodes } = require("http-status-codes");
class AppErrors extends Error {
  constructor(
    name = "AppError",
    message = "Something went wrong",
    description = "Something went wrong",
    statusCode = StatusCodes.INTERNAL_SERVER_ERROR
  ) {
    super();
    this.message = message;
    this.name = name;
    this.explaination = description;
    this.statusCode = statusCode;
  }
}

module.exports = AppErrors;
