const { StatusCodes } = require('http-status-codes');
const { AirplaneService } = require('../services');
const { Logger } = require('../config');


async function createAirplane(req,res){
    try {
        const { modelName , capacity } = req.body;

        const response = await AirplaneService.createAirplane({
            modelName, 
            capacity
        });


        return res.status(StatusCodes.CREATED).json({
            success: true,
            message: 'Successfully created an airplane',
            error: {},
            data: response,
        })

    } catch (error) {
        Logger.error("Something went wrong in the create airplane controller")
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: 'Something went wrong while creating an airplane',
            error: error,
            data: {}
        })
    }
}

module.exports = {
    createAirplane
}