const { StatusCodes } = require("http-status-codes");

class ValidationError extends Error {
  constructor(error) {
    let explaination = [];
    error.errors.forEach((err) => {
      explaination.push(err.message);
    });
    super();
    this.name = "Validation Error";
    this.message = "Not able to Validate the data sent in the request";
    this.explaination = explaination;
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

module.exports = ValidationError;
