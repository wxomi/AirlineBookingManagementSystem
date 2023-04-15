const { StatusCodes } = require("http-status-codes");
const { REMINDER_BINDING_KEY } = require("../config/serverConfig");
const { BookingService } = require("../services/index");
const { createChannel, publishMessage } = require("../utils/messageQueue");

const bookingService = new BookingService();

const sendMessageToQueue = async (data) => {
  const channel = await createChannel();
  data.response = JSON.stringify(data.response).toString();
  const payload = {
    data: {
      subject: `Reminder: Flight Today`,
      content: `Hi ${
        data.email
      } You've a Flight Today , Your ticket no. is ${Math.floor(
        Math.random() * 10000
      )} Details About Flight: ${data.response}`,
      recepientEmail: data.email,
      notificationTime: "2023-04-09T09:19:00.000",
    },
    service: "CREATE_TICKET",
  };
  JSON.stringify(payload);

  publishMessage(channel, REMINDER_BINDING_KEY, JSON.stringify(payload));
  // return res.status(200).json({
  //   message: "Successfully published the event",
  // });
};

const create = async (req, res) => {
  try {
    // console.log(req.body);
    req.body.userId = req.body.data.id;
    const { flightId, noOfSeats, userId } = req.body;
    const response = await bookingService.createBooking({
      flightId,
      noOfSeats,
      userId,
    });
    req.body.data = { ...req.body.data, response };
    sendMessageToQueue(req.body.data);

    return res.status(StatusCodes.OK).json({
      message: "Successfully Completed Booking",
      success: true,
      error: {},
      data: response,
    });
  } catch (error) {
    return res.status(error.statusCode).json({
      message: error.message,
      success: false,
      err: error.explaination,
      data: {},
    });
  }
};

const getAllBookings = async (req, res) => {
  try {
    const response = await bookingService.getAllBookings();

    return res.status(StatusCodes.OK).json({
      message: "Successfully fethced Bookings",
      success: true,
      error: {},
      data: response,
    });
  } catch (error) {
    return res.status(error.statusCode).json({
      message: error.message,
      success: false,
      err: error.explaination,
      data: {},
    });
  }
};
module.exports = {
  sendMessageToQueue,
  create,
  getAllBookings,
};
