const {Sequelize} = require('sequelize');
const CrudRepository = require("./crudRepository");
const { Flight, Airplane, Airport, City} = require('../models')

class FlightRepository extends CrudRepository{
    constructor(){
        super(Flight);
    }

    async getAllFlights(customFilterObject, sortFilterObject){
        console.log(customFilterObject);
        const flights = await Flight.findAll({
            where : customFilterObject,
            order : sortFilterObject,
            include : [
                {
                    model : Airplane,
                    as : 'airplaneDetails',
                    required : true
                },
                {               
                    model : Airport,
                    as : 'departureAirport',
                    required : true,
                    on : Sequelize.literal('`departureAirport`.`code` = `Flight`.`departureAirportCode`'),
                    include : [
                        {
                            model : City,
                            as : 'cityDetails',
                            required : true
                        }
                    ]
                },
                {
                    model : Airport,
                    as : 'arrivalAirport',
                    required : true,
                    on : Sequelize.literal('`arrivalAirport`.`code` = `Flight`.`arrivalAirportCode`'),
                    include : [
                        {
                            model : City,
                            as : 'cityDetails',
                            required : true
                        }
                    ]
                }
            ],
        });
        return flights;
    }
}

module.exports = FlightRepository;