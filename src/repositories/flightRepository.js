const {Sequelize} = require('sequelize');
const CrudRepository = require("./crudRepository");
const { Flight, Airplane, Airport, City} = require('../models');
const { stringToBoolean } = require('../utils/helpers/strToBool');

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

    async updateSeats(flightId, numberOfSeats, decrease = true){
        const flight = await Flight.findByPk(flightId);
        decrease = stringToBoolean(decrease); // to handle datas in json format and url-encoded format
        if (decrease){
            await flight.decrement('remainingSeats', { by : numberOfSeats});
        }else{
            await flight.increment('remainingSeats', { by : numberOfSeats});
        }
        await flight.reload(); // to get updated value of flight
        return flight;
    }
}

module.exports = FlightRepository;