const { StatusCodes } = require('http-status-codes');
const { AirportRepository } = require('../repositories');
const AppError = require('../utils/errors/appError');

const airportRepository = new AirportRepository();

async function createAirport(data){
    try {
        const airport = await airportRepository.create(data);
        return airport;
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
        throw new AppError(['Cannot create an airport'], StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAllAirports(){
    try {
        const airports = await airportRepository.getAll();
        console.log(airports)
        return airports;
    } catch (error) {
        throw new AppError(["Error while fetching data of all the airports"], StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAirport(id){
    try {
        const airport = await airportRepository.get(id);
        return airport;
    } catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError(['The airport you requested is not present'], error.statusCode);
        }
        throw new AppError(["Error while fetching data of the airport"], StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function deleteAirport(id){
    try {
        const response = await airportRepository.destroy(id);
        return response;
    } catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError(['The airport you requested to delete is not present'], error.statusCode);
        }
        else if(error.name == 'SequelizeDatabaseError'){
            throw new AppError([error.parent.sqlMessage], StatusCodes.BAD_REQUEST);
        }
        throw new AppError(["Error while deleting airport"], StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function updateAirport(id, data){
    try {
        const response = await airportRepository.update(id,data);
        return response;
    } catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError(['The airport you requested to update is not present'], error.statusCode);
        }
        else if(error.name == 'SequelizeDatabaseError'){
            throw new AppError([error.parent.sqlMessage], StatusCodes.BAD_REQUEST);
        }
        throw new AppError(['Error while updating the airport'], StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports = {
    createAirport,
    getAllAirports,
    getAirport,
    deleteAirport,
    updateAirport
}