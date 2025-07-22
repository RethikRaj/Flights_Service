const { StatusCodes } = require('http-status-codes');
const { FlightService } = require('../services');
const { SuccessResponse, ErrorResponse } = require('../utils/common');


async function createFlight(req,res){
    try {
        const { flightNumber, departureAirportCode, arrivalAirportCode,  departureTime, arrivalTime, airplaneId, price, boardingGate, remainingSeats } = req.body;

        const flight = await FlightService.createFlight({
            flightNumber,
            departureAirportCode,
            arrivalAirportCode,
            departureTime,
            arrivalTime,
            airplaneId,
            price,
            boardingGate,
            remainingSeats
        });
        SuccessResponse.data = flight;
        return res.status(StatusCodes.CREATED).json(SuccessResponse)
    } catch (error) {
        ErrorResponse.message = 'Something went wrong while creating an flight';
        ErrorResponse.error = error;
        return res.status(error.statusCode).json(ErrorResponse);
    }
}

async function getAllFlights(req, res){
    try {
        /* req.query = {
            trips : 'BLR-MAA'
        }
        */
        const flights = await FlightService.getAllFlights(req.query);
        SuccessResponse.data = flights;
        return res.status(StatusCodes.OK).json(SuccessResponse)
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(error.statusCode).json(ErrorResponse);
    }
}

module.exports = {
    createFlight,
    getAllFlights
}