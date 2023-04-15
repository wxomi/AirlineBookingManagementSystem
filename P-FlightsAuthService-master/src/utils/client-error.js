const AppError = require("./error-handler");

class ClientError extends AppError {
  constructor(name, meesage, description, statusCode) {
    super(name, meesage, description, statusCode);
  }
}

module.exports = ClientError;
