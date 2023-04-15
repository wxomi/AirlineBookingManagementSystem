const CrudRepository = require("./crud-repository");
const { Airplane } = require("../models/index");

class AirplaneRepository extends CrudRepository {
  constructor() {
    super(Airplane);
  }
  async getAirplane(id) {
    try {
      const airplane = await Airplane.findByPk(id);
      return airplane;
    } catch (error) {
      console.log("Something went wrong in the repository layer");
      throw { error };
    }
  }
}

module.exports = AirplaneRepository;
