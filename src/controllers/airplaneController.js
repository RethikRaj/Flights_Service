const { StatusCodes } = require('http-status-codes');
const { AirplaneService } = require('../services');
const { Logger } = require('../config');
const { SuccessResponse, ErrorResponse } = require('../utils/common');


async function createAirplane(req,res){
    try {
        const { modelName , capacity } = req.body;

        const airplane = await AirplaneService.createAirplane({
            modelName, 
            capacity
        });

        SuccessResponse.message = 'Successfully created an airplane';
        SuccessResponse.data = airplane;

        return res.status(StatusCodes.CREATED).json(SuccessResponse)

    } catch (error) {
        ErrorResponse.message = 'Something went wrong while creating an airplane';
        ErrorResponse.error = error;
        return res.status(error.statusCode).json(ErrorResponse);
    }
}

async function getAllAirplanes(req,res){
    try {
        const airplanes = await AirplaneService.getAllAirplanes();
        SuccessResponse.data = airplanes;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(error.statusCode).json(ErrorResponse);
    }
}

async function getAirplane(req,res){
    try {
        const airplane = await AirplaneService.getAirplane(req.params.id);
        SuccessResponse.data = airplane;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(error.statusCode).json(ErrorResponse);
    }
}

module.exports = {
    createAirplane,
    getAllAirplanes,
    getAirplane
}