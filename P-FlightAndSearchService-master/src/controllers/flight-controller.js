const { FlightService } = require("../services/index");
const { SuccessCodes, ServerErrorsCodes } = require("../utils/error-code");

const flightservice = new FlightService();

const create = async (req, res) => {
  try {
    const flightRequestData = {
      flightNumber: req.body.flightNumber,
      airplaneId: req.body.airplaneId,
      departureAirportId: req.body.departureAirportId,
      arrivalAirportId: req.body.arrivalAirportId,
      arrivalTime: req.body.arrivalTime,
      departureTime: req.body.departureTime,
      price: req.body.price,
    };
    const flight = await flightservice.createFlight(flightRequestData);
    return res.status(SuccessCodes.CREATED).json({
      data: flight,
      success: true,
      err: {},
      message: "Successfully created a flight",
    });
  } catch (error) {
    console.log(error);
    return res.status(ServerErrorsCodes.INTERNAL_SERVER_ERROR).json({
      data: {},
      success: false,
      message: "Not able to create a Flight",
      err: error,
    });
  }
};

const getAll = async (req, res) => {
  try {
    const response = await flightservice.getFlightData(req.query);
    return res.status(SuccessCodes.CREATED).json({
      data: response,
      success: true,
      message: "Successfully fetched the Flights",
      err: {},
    });
  } catch (error) {
    console.log(error);
    return res.status(ServerErrorsCodes.INTERNAL_SERVER_ERROR).json({
      data: {},
      success: false,
      message: "Not able to fetch a Flights",
      err: error,
    });
  }
};

const get = async (req, res) => {
  try {
    const response = await flightservice.getFlight(req.params.id);
    return res.status(SuccessCodes.OK).json({
      data: response,
      success: true,
      message: "Successfully fetched the Flight",
      err: {},
    });
  } catch (error) {
    console.log(error);
    return res.status(ServerErrorsCodes.INTERNAL_SERVER_ERROR).json({
      data: {},
      success: false,
      message: "Not able to fetch a Flight",
      err: error,
    });
  }
};

const update = async (req, res) => {
  try {
    const response = await flightservice.updateFlight(req.params.id, req.body);
    return res.status(SuccessCodes.OK).json({
      data: response,
      success: true,
      message: "Successfully updated the Flight",
      err: {},
    });
  } catch (error) {
    console.log(error);
    return res.status(ServerErrorsCodes.INTERNAL_SERVER_ERROR).json({
      data: {},
      success: false,
      message: "Not able to update a Flight",
      err: error,
    });
  }
};
module.exports = {
  create,
  getAll,
  get,
  update,
};
