const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const { PORT, DB_SYNC } = require("./config/serverConfig");
const db = require("./models/index");
const ApiRoutes = require("./routes/index");
const { Sequelize } = require("sequelize");
// const config = require("./config/config.json");
const env = process.env.NODE_ENV || "development";
const config = require("./config/config.json")[env];

const setupAndStartServer = async () => {
  //create the express direct
  const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    {
      host: config.host,
      port: config.port,
      dialect: config.dialect,
      dialectOptions: config.dialectOptions,
    }
  );

  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
  const app = express();
  app.listen(PORT, async () => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use("/flightservice/api", ApiRoutes);
    if (DB_SYNC) {
      db.sequelize.sync({ alter: true }); //synchronize all models
    }
    // const city = await City.findOne({
    //   where: {
    //     id: 15,
    //   },
    // });
    //getAirport func only works after synchronizing the db
    // const airports = await city.getAirports();
    console.log(`Server Started Successfully at ${PORT} .`);
  });
};

setupAndStartServer();
