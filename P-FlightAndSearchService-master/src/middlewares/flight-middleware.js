const { ClientErrorsCodes } = require("../utils/error-code");
const validateCreateFlights = (req, res, next) => {
  if (
    !req.body.flightNumber ||
    !req.body.airplaneId ||
    !req.body.departureAirportId ||
    !req.body.arrivalAirportId ||
    !req.body.arrivalTime ||
    !req.body.departureTime ||
    !req.body.price
  ) {
    return res.status(ClientErrorsCodes.BAD_REQUEST).json({
      data: {},
      success: false,
      message: "Invalid req body for create Flight",
      err: "Missing mandatory properties to create a Flight",
    });
  }
  next();
};

module.exports = {
  validateCreateFlights,
};
