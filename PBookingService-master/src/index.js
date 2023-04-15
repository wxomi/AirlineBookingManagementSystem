const express = require("express");
const app = express();

const { PORT, DB_SYNC } = require("./config/serverConfig");
const apiRoutes = require("./routes/index");
const db = require("./models/index");
const { Sequelize } = require("sequelize");

const setupAndStartServer = async () => {
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
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use("/bookingservice/api", apiRoutes);

  app.listen(PORT, async () => {
    console.log(`Server Started on Port:  ${PORT}`);

    if (DB_SYNC) {
      db.sequelize.sync({ alter: true });
    }
  });
};

setupAndStartServer();

//Todo Implementing Rabbitmq such that whenever someone creates a booking it will get message that ticket s'been created and working reminder also
//Todo Also do isverified Check Everywhere
