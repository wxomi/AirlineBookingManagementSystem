const express = require("express");
const { Sequelize } = require("sequelize");

const { PORT, DB_SYNC } = require("./config/serverConfig");
const apiRoutes = require("./routes/index");
const { User, Role } = require("./models/index");

const db = require("./models/index");

const app = express();

const prepareAndStartServer = async () => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
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

  app.use("/authservice/api", apiRoutes);
  app.listen(PORT, async () => {
    console.log(`Server Started Successfully at ${PORT} .`);
    // const u1 = await User.findByPk(1);
    // const r1 = await Role.findByPk(1);
    // u1.addRole(r1);
    // const user = await r1.getUsers();
    // console.log(user);
    if (DB_SYNC) {
      db.sequelize.sync({ alter: true });
    }
  });
};

prepareAndStartServer();
