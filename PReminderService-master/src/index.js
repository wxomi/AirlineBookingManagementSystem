const express = require("express");
const jobs = require("./utils/job");
const apiRoutes = require("./routes/index");
const EmailService = require("./services/email-service");

const { createChannel, subscribeMessage } = require("./utils/messageQueue");
const { PORT, REMINDER_BINDING_KEY } = require("./config/serverConfig");
// const db = require("./models/index");
// const { Sequelize } = require("sequelize");

const setupAndStartServer = async () => {
  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use("/api", apiRoutes);

  const channel = await createChannel();
  subscribeMessage(channel, EmailService.subscribeEvents, REMINDER_BINDING_KEY);

  app.listen(PORT, () => {
    jobs();
    // db.sequelize.sync({ alter: true });

    console.log("Server started at Port: ", PORT);
  });
};

setupAndStartServer();
