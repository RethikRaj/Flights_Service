const { StatusCodes } = require('http-status-codes');
const { FlightRepository } = require('../repositories');
const AppError = require('../utils/errors/appError');

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

module.exports = {
    createFlight
}