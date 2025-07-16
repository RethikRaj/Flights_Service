const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../utils/common");
const AppError = require("../utils/errors/appError");

function validateCreateOrUpdateRequest(req,res,next){
    if(!req.body || !req.body.name){
        ErrorResponse.message = 'Something went wrong while creating or updating city';
        ErrorResponse.error = new AppError(['City name not found in the incoming request in the correct form'], StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }else if(typeof req.body.name !== 'string') {
        ErrorResponse.error = new AppError(['City name must be a string'], StatusCodes.BAD_REQUEST)
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
    next();
}

module.exports = {
    validateCreateOrUpdateRequest
}