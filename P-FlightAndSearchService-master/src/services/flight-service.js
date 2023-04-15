const { FlightRepository, AirplaneRepository } = require("../repository/index");
const { compareTime } = require("../utils/helper");

class FlightService {
  constructor() {
    this.airplaneRepository = new AirplaneRepository();
    this.FlightRepository = new FlightRepository();
  }

  async createFlight(data) {
    try {
      if (compareTime(data.arrivalTime, data.departureTime)) {
        throw { error: "Arrival time can not be less than Departure time" };
      }
      const airplane = await this.airplaneRepository.getAirplane(
        data.airplaneId
      );
      const flight = await this.FlightRepository.createFlight({
        ...data,
        totalSeats: airplane.capacity,
      });
      return flight;
    } catch (error) {
      console.log("Something went wrong in the service layer");
      throw { error };
    }
  }

  async getFlightData(data) {
    try {
      const flights = await this.FlightRepository.getAllFlights(data);
      return flights;
    } catch (error) {
      console.log("Something went wrong in the service layer");
      throw { error };
    }
  }

  async getFlight(flightId) {
    try {
      const flight = await this.FlightRepository.getFlight(flightId);
      return flight;
    } catch (error) {
      console.log("Something went wrong in the service layer");
      throw { error };
    }
  }

  async updateFlight(flightId, data) {
    try {
      const response = await this.FlightRepository.updateFlight(flightId, data);
      return response;
    } catch (error) {
      console.log("Something went wrong in the service layer");
      throw { error };
    }
  }
}

module.exports = FlightService;

// {
//   flightNumber,
//   airplaneId,
//   departureAirportId,
//   arrivalAirportId,
//   arrivalTime,
//   departureTime,
//   price,
//   totalSeats -> airplane
// }
