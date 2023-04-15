// const { Op } = require("sequelize");

// const { CrudRepository } = require("./index");
const CrudRepository = require("./crud-repository");
const { Airport } = require("../models/index");

class AirportRepository extends CrudRepository {
  constructor() {
    super(Airport);
  }
  // async createAirport(data) {
  //   try {
  //     console.log(data);
  //     const airport = await Airport.bulkCreate(data);
  //     return airport;
  //   } catch (error) {
  //     console.log("Something went wrong in the repository layer");
  //     throw { error };
  //   }
  // }

  // async deleteAirport(airportId) {
  //   try {
  //     await Airport.destroy({
  //       where: {
  //         id: airportId,
  //       },
  //     });
  //     return true;
  //   } catch (error) {
  //     console.log("Something went wrong in the repository layer");
  //     throw { error };
  //   }
  // }

  // async updateAirport(airportId, data) {
  //Data obj {name: prauagraj}
  //   try {
  // The below approach will also works but will not return updated object
  // if we are using Pg then returning: true can be used, else not
  // const airport = await Airport.update(data, {
  //   where: {
  //     id: airportId,
  //   },
  // });
  // For getting updated data in mysql we use the below approach
  //     const airport = await Airport.findByPk(airportId);
  //     airport.name = data.name;
  //     await airport.save();
  //     return airport;
  //   } catch (error) {
  //     console.log("Something went wrong in the repository layer");
  //     throw { error };
  //   }
  // }

  // async getAirport(airportId) {
  //   try {
  //     const airport = await Airport.findByPk(airportId);
  //     return airport;
  //   } catch (error) {
  //     console.log("Something went wrong in the repository layer");
  //     throw { error };
  //   }
  // }

  // async getAllAirports({ name }) {
  //   // filter can be empty also
  //   try {
  //     if (name) {
  //       const airports = await Airport.findAll({
  //         where: {
  //           name: {
  //             [Op.startsWith]: name,
  //           },
  //         },
  //       });
  //       return airports;
  //     }
  //     const airports = await Airport.findAll();
  //     return airports;
  //   } catch (error) {
  //     console.log("Something went wrong in the repository layer");
  //     throw { error };
  //   }
  // }
  // async getAirportByCityId(cityId) {
  //   try {
  //     const airports = await Airport.findAll({
  //       where: {
  //         cityId: cityId,
  //       },
  //       include: [City],
  //     });
  //     return airports;
  //   } catch (error) {
  //     console.log("Something went wrong at Service Layer");
  //     throw { error };
  //   }
  // }
}

module.exports = AirportRepository;
