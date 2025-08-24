const {Sequelize} = require('sequelize');
const CrudRepository = require("./crudRepository");
const { Flight, Airplane, Airport, City, sequelize} = require('../models');
const { stringToBoolean } = require('../utils/helpers/strToBool');
const { addRowLock } = require('./queries');

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
        const txn = await sequelize.transaction();
        try{
            // Adding row lock so that at a time two or more cant update seats
            await sequelize.query(addRowLock(flightId), {transaction : txn});
            
            const flight = await Flight.findByPk(flightId, {transaction : txn});
            decrease = stringToBoolean(decrease); // to handle datas in json format and url-encoded format
            if (decrease){
                await flight.decrement('remainingSeats', { by : numberOfSeats, transaction : txn});
            }else{
                await flight.increment('remainingSeats', { by : numberOfSeats, transaction : txn});
            }
            await flight.reload({transaction : txn}); // to get updated value of flight
            await txn.commit();
            return flight;
        }catch(error){
            await txn.rollback();
            throw error;
        }
    }
}

module.exports = FlightRepository;