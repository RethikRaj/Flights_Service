const CrudRepository = require("./crudRepository");

const { Flight } = require('../models')

class FlightRepository extends CrudRepository{
    constructor(){
        super(Flight);
    }

    async getAllFlights(customFilterObject, sortFilterObject){
        console.log(customFilterObject);
        const flights = await Flight.findAll({
            where : customFilterObject,
            order : sortFilterObject
        });
        return flights;
    }
}

module.exports = FlightRepository;