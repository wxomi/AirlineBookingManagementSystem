const { Op } = require("sequelize");

const { City } = require("../models/index");

class CityRepository {
  async createCity(data) {
    try {
      const city = await City.create(data, {
        // option object
        returning: true,
      });
      return city;
    } catch (error) {
      console.log("Something went wrong in the repository layer");
      throw { error };
    }
  }

  async deleteCity(cityId) {
    try {
      await City.destroy({
        where: {
          id: cityId,
        },
      });
      return true;
    } catch (error) {
      console.log("Something went wrong in the repository layer");
      throw { error };
    }
  }

  async updateCity(cityId, data) {
    //Data obj {name: prauagraj}
    try {
      // The below approach will also works but will not return updated object
      // if we are using Pg then returning: true can be used, else not
      // const city = await City.update(data, {
      //   where: {
      //     id: cityId,
      //   },
      // });
      // For getting updated data in mysql we use the below approach
      const city = await City.findByPk(cityId);
      city.name = data.name;
      await city.save();
      return city;
    } catch (error) {
      console.log("Something went wrong in the repository layer");
      throw { error };
    }
  }

  async getCity(cityId) {
    try {
      const city = await City.findByPk(cityId);
      return city;
    } catch (error) {
      console.log("Something went wrong in the repository layer");
      throw { error };
    }
  }

  async getAllCities({ name }) {
    // filter can be empty also
    try {
      if (name) {
        const cities = await City.findAll({
          where: {
            name: {
              [Op.startsWith]: name,
            },
          },
        });
        return cities;
      }
      const cities = await City.findAll();
      return cities;
    } catch (error) {
      console.log("Something went wrong in the repository layer");
      throw { error };
    }
  }
}

module.exports = CityRepository;
