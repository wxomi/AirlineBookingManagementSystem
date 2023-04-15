const express = require("express");

const {
  create,
  getAllBookings,
} = require("../../controllers/booking-controller");
const {
  checkAuthentication,
} = require("../../middlewares/checkAuthentication");
// const { createChannel } = require("../../utils/messageQueue");

// const channel = await createChannel();

const router = express.Router();

router.post("/bookings", [checkAuthentication], create);
router.get("/bookings", getAllBookings);

router.get("/ping", (req, res) => {
  return res.status(200).json({
    message: "pinged",
  });
});

module.exports = router;
