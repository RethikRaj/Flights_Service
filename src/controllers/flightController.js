const { StatusCodes } = require('http-status-codes');
const { FlightService } = require('../services');
const { SuccessResponse, ErrorResponse } = require('../utils/common');


async function createFlight(req,res){
    try {
        const { flightNumber, departureAirportCode, arrivalAirportCode,  departureTime, arrivalTime, airplaneId, price, boardingGate, totalSeats } = req.body;

        const flight = await FlightService.createFlight({
            flightNumber,
            departureAirportCode,
            arrivalAirportCode,
            departureTime,
            arrivalTime,
            airplaneId,
            price,
            boardingGate,
            totalSeats
        });
        SuccessResponse.data = flight;
        return res.status(StatusCodes.CREATED).json(SuccessResponse)
    } catch (error) {
        ErrorResponse.message = 'Something went wrong while creating an flight';
        ErrorResponse.error = error;
        return res.status(error.statusCode).json(ErrorResponse);
    }
}

module.exports = {
    createFlight
}