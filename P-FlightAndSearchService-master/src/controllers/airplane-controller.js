const AirplaneRepository = require("../repository/airplane-repository");
const { SuccessCodes, ServerErrorsCodes } = require("../utils/error-code");

const airplaneRepository = new AirplaneRepository();

const getAll = async (req, res) => {
  try {
    const flight = await airplaneRepository.getAll();
    return res.status(SuccessCodes.CREATED).json({
      data: flight,
      success: true,
      err: {},
      message: "Successfully fethed All flights",
    });
  } catch (error) {
    console.log(error);
    return res.status(ServerErrorsCodes.INTERNAL_SERVER_ERROR).json({
      data: {},
      success: false,
      message: "Not able to fetch All Flight",
      err: error,
    });
  }
};

module.exports = {
  getAll,
};
