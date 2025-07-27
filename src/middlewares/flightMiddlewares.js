const { StatusCodes } = require("http-status-codes");
const AppError = require("../utils/errors/appError");
const { ErrorResponse } = require("../utils/common");

function validateCreateRequest(req,res,next){
    const { flightNumber, departureAirportCode, arrivalAirportCode,  departureTime, arrivalTime, airplaneId, price, boardingGate, remainingSeats} = req.body;

    if (flightNumber && departureAirportCode && arrivalAirportCode && departureTime && arrivalTime && airplaneId && price  && remainingSeats) {
        next();
    }else{
        ErrorResponse.message = 'Something went wrong while creating an flight';
        let explanation = [];
        if(!flightNumber) explanation.push('flightNumber not found in the incoming request');
        if(!departureAirportCode) explanation.push('departureAirportCode not found in the incoming request');
        if(!arrivalAirportCode) explanation.push('arrivalAirportCode not found in the incoming request');
        if(!departureTime) explanation.push('departureTime not found in the incoming request');
        if(!arrivalTime) explanation.push('arrivalTime not found in the incoming request');
        if(!airplaneId) explanation.push('airplaneId not found in the incoming request');
        if(!price) explanation.push('price not found in the incoming request');
        if(!remainingSeats) explanation.push('remainingSeats not found in the incoming request');
        ErrorResponse.error = new AppError(explanation,StatusCodes.BAD_REQUEST);
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
}

function validateUpdateRequest(req,res,next){
    if(!req.body || !req.body.numberOfSeats){
        ErrorResponse.error = new AppError(['Number of seats is not found in incoming request'], StatusCodes.BAD_REQUEST);
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
    next();
}

module.exports = {
    validateCreateRequest,
    validateUpdateRequest
}