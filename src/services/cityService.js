const { StatusCodes } = require("http-status-codes");
const { CityRepository } = require("../repositories");
const AppError = require("../utils/errors/appError");


const cityRepository = new CityRepository();

async function createCity(data){
    try {
        const city = await cityRepository.create(data);
        return city;
    } catch (error) {
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
        throw new AppError(['Cannot create a city'], StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function deleteCity(id){
    try {
        const city = await cityRepository.destroy(id);
        return city;
    } catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND){
            // If the airplane id not present then repository layer throws the appError.
            throw new AppError(['The airplane you requested to delete is not present'], error.statusCode);
        }
        else if(error.name == 'SequelizeDatabaseError'){
            // Happens when in route :id you give something else like /api/v1/cities/abc -> abc is not a valid id
            throw new AppError([error.parent.sqlMessage], StatusCodes.BAD_REQUEST);
        }
        throw new AppError(["Error while deleting airplane"], StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports = {
    createCity,
    deleteCity
}