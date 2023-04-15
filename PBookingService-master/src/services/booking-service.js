const { default: axios } = require("axios");

const { FLIGHT_SERVICE_PATH } = require("../config/serverConfig");
const { BookingRepository } = require("../repository/index");
const { ServiceError } = require("../utils/errors");

class BookingService {
  constructor() {
    this.bookingRepository = new BookingRepository();
  }

  async createBooking(data) {
    try {
      // console.log(data);
      const flightId = data.flightId;
      let getFlightRequestURL = `${FLIGHT_SERVICE_PATH}/flightservice/api/v1/flights/${flightId}`;
      const response = await axios.get(getFlightRequestURL);
      const flightData = response.data.data;
      let priceOfTheFlight = flightData.price;
      if (data.noOfSeats > flightData.totalSeats) {
        throw new ServiceError(
          "Something went wrong in the booking process",
          "Insufficient Seats"
        );
      }
      const totalCost = priceOfTheFlight * data.noOfSeats;
      const bookingPayload = { ...data, totalCost };
      const booking = await this.bookingRepository.create(bookingPayload);
      let updateFlightRequestURL = `${FLIGHT_SERVICE_PATH}/flightservice/api/v1/flights/${booking.flightId}`;
      await axios.patch(updateFlightRequestURL, {
        totalSeats: flightData.totalSeats - booking.noOfSeats,
      });
      const finalbooking = await this.bookingRepository.update(booking.id, {
        status: "Booked",
      });
      // res.data.headers["Content-Type"];
      return finalbooking;
    } catch (error) {
      console.log(error);
      if (error.name == "Repository Error" || error.name == "ValidationError") {
        throw error;
      }
      throw new ServiceError();
    }
  }

  async getAllBookings() {
    try {
      const bookings = await this.bookingRepository.getAllBookings();
      return bookings;
    } catch (error) {
      throw new AppError(
        "RepositoryError",
        "Cannot GetAll Bookings",
        "There was some issue Fetching the bookings, please try again later",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
}

module.exports = BookingService;
