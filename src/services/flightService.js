const { StatusCodes } = require('http-status-codes');
const { FlightRepository } = require('../repositories');
const AppError = require('../utils/errors/appError');
const { Op }= require('sequelize');

const flightRepository = new FlightRepository();

async function createFlight(data){
    try {
        const flight = await flightRepository.create(data);
        return flight;
    } catch (error) {
        // console.log(error);
        if (error.name == 'SequelizeValidationError' || error.name == 'SequelizeUniqueConstraintError'){
            let explanation = [];
            error.errors.forEach((err)=>{
                explanation.push(err.message);
            })
            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        }
        else if (error.name == 'SequelizeDatabaseError'){
            throw new AppError([error.parent.sqlMessage], StatusCodes.BAD_REQUEST);
        }
        throw new AppError(['Cannot create a flight'], StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAllFlights(queryObject){
    /*
        queryObject = {
            trips : 'BLR-MAA',
            price : '1000-2000',
            travellers : '2',
            tripDate : '2025-05-01',
            sort : 'price_DESC,arrivalTime_ASC'
        }
    */
    const customFilter = {};
    let sortFilter = [];

    if(queryObject.trips){
        
        const [departureAirportCode, arrivalAirportCode] = queryObject.trips.split('-');
        if (departureAirportCode == arrivalAirportCode){
            throw new AppError(['Departure and arrival airport cannot be same'], StatusCodes.BAD_REQUEST);
        }
        customFilter.departureAirportCode = departureAirportCode;
        customFilter.arrivalAirportCode = arrivalAirportCode;
    }

    if(queryObject.price){
        const [minPrice, maxPrice] = queryObject.price.split('-');
        customFilter.price = {
            [Op.between] : [minPrice, ((maxPrice == undefined) ? 30000 : maxPrice)]
        }
    }

    if(queryObject.travellers){
        customFilter.remainingSeats = {
            [Op.gte] : queryObject.travellers
        }
    }

    if(queryObject.tripDate){
        const startOfDay = new Date(`${queryObject.tripDate}T00:00:00.000Z`);
        const endOfDay = new Date(`${queryObject.tripDate}T23:59:59.999Z`);
        customFilter.departureTime = {
            [Op.between] : [startOfDay, endOfDay]
        }
    }

    if(queryObject.sort){
        const parameters = queryObject.sort.split(',');
        sortFilter = parameters.map((param)=>{
            return param.split('_')
        });
    }

    // console.log(customFilter);
    // console.log(sortFilter);

    try {
        const flights = await flightRepository.getAllFlights(customFilter, sortFilter);
        return flights;
    } catch (error) {
        console.log(error);
        throw new AppError(["Error while fetching data of all the flights"], StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getFlight(id){
    try {
        const flight = await flightRepository.get(id);
        return flight;
    } catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError(['The airport you requested is not present'], error.statusCode);
        }
        throw new AppError(["Error while fetching data of the airport"], StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports = {
    createFlight,
    getAllFlights,
    getFlight
}