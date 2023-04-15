const { AirportService } = require("../services/index");
const { SuccessCodes, ServerErrorsCodes } = require("../utils/error-code");

const airportService = new AirportService();

const create = async (req, res) => {
  try {
    const airport = await airportService.create(req.body);
    return res.status(SuccessCodes.CREATED).json({
      data: airport,
      success: true,
      message: "Successfully created a Airport",
      err: {},
    });
  } catch (error) {
    console.log(error);
    return res.status(ServerErrorsCodes.INTERNAL_SERVER_ERROR).json({
      data: {},
      success: false,
      message: "Not able to create a airport",
      err: error,
    });
  }
};

const destroy = async (req, res) => {
  try {
    const response = await airportService.destroy(req.params.id);
    return res.status(SuccessCodes.OK).json({
      data: response,
      success: true,
      message: "Successfully deleted a Airport",
      err: {},
    });
  } catch (error) {
    console.log(error);
    return res.status(ServerErrorsCodes.INTERNAL_SERVER_ERROR).json({
      data: {},
      success: false,
      message: "Not able to delete the airport",
      err: error,
    });
  }
};

const getAirportsByCityId = async (req, res) => {
  try {
    const airports = await airportService.getAirportByCityId(req.params.cityId);
    return res.status(SuccessCodes.OK).json({
      data: airports,
      success: true,
      message: "Successfully fetched all the airports",
      err: {},
    });
  } catch (error) {
    console.log(error);
    return res.status(ServerErrorsCodes.INTERNAL_SERVER_ERROR).json({
      data: {},
      success: false,
      message: `Not able to get airports with CityID ${req.params.cityId}`,
      err: error,
    });
  }
};

const getAll = async (req, res) => {
  try {
    const airports = await airportService.getAll(req.query);
    return res.status(SuccessCodes.OK).json({
      data: airports,
      success: true,
      message: "Successfully fetched all the airports",
      err: {},
    });
  } catch (error) {
    console.log(error);
    return res.status(ServerErrorsCodes.INTERNAL_SERVER_ERROR).json({
      data: {},
      success: false,
      message: "Not able to get All the airports",
      err: error,
    });
  }
};

const get = async (req, res) => {
  try {
    const response = await airportService.get(req.params.id);
    return res.status(SuccessCodes.OK).json({
      data: response,
      success: true,
      message: "Successfully fetched a Airport",
      err: {},
    });
  } catch (error) {
    console.log(error);
    return res.status(ServerErrorsCodes.INTERNAL_SERVER_ERROR).json({
      data: {},
      success: false,
      message: "Not able to get the airport",
      err: error,
    });
  }
};

const update = async (req, res) => {
  try {
    const response = await airportService.update(req.params.id, req.body);
    return res.status(SuccessCodes.OK).json({
      data: response,
      success: true,
      message: "Successfully updated a Airport",
      err: {},
    });
  } catch (error) {
    console.log(error);
    return res.status(ServerErrorsCodes.INTERNAL_SERVER_ERROR).json({
      data: {},
      success: false,
      message: "Not able to update the airport",
      err: error,
    });
  }
};

module.exports = {
  create,
  update,
  getAirportsByCityId,
  getAll,
  get,
  destroy,
};
