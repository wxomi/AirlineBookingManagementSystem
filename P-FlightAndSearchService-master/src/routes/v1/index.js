const express = require("express");
const { FlightMiddlewares } = require("../../middlewares/index");
const {
  CityController,
  AirportController,
  FlightController,
  AirplaneController,
} = require("../../controllers/index");

const router = express.Router();
// CRUD CITIES
router.post("/city", CityController.create);
router.delete("/city/:id", CityController.destroy);
router.get("/city/:id", CityController.get);
router.get("/city", CityController.getAll);
router.patch("/city/:id", CityController.update);

//CRUD AIRPORTS
router.post("/airport", AirportController.create);
router.delete("/airport/:id", AirportController.destroy);
router.get("/airport/:id", AirportController.get);
router.get("/airport", AirportController.getAll);
router.patch("/airport/:id", AirportController.update);

//Airplane
router.get("/airplanes", AirplaneController.getAll);

// // //
router.get("/cities/:cityId/airports", AirportController.getAirportsByCityId);
// // //

//CRUD FLIGHT
router.post(
  "/flights",
  [FlightMiddlewares.validateCreateFlights],
  FlightController.create
);
router.get("/flights", FlightController.getAll);
router.get("/flights/:id", FlightController.get);
router.patch("/flights/:id", FlightController.update);

router.get("/ping", (req, res) => {
  return res.status(200).json({
    message: "pinged",
  });
});

module.exports = router;
