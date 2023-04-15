const express = require("express");
const TicketController = require("../../controllers/ticket-controller");

const router = express.Router();

router.post("/tickets", TicketController.create);

router.get("/ping", (req, res) => {
  return res.status(200).json({
    message: "pinged",
  });
});

module.exports = router;
