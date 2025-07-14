const { StatusCodes } = require('http-status-codes');
const { AirplaneService } = require('../services');
const { Logger } = require('../config');
const { SuccessResponse, ErrorResponse } = require('../utils/common');


async function createAirplane(req,res){
    try {
        const { modelName , capacity } = req.body;

        const response = await AirplaneService.createAirplane({
            modelName, 
            capacity
        });

        SuccessResponse.message = 'Successfully created an airplane';
        SuccessResponse.data = response;

        return res.status(StatusCodes.CREATED).json(SuccessResponse)

    } catch (error) {
        ErrorResponse.message = 'Something went wrong while creating an airplane';
        ErrorResponse.error = error;
        res.status(error.statusCode).json(ErrorResponse);
    }
}

module.exports = {
    createAirplane
}