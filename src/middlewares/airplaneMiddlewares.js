const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../utils/common");
const AppError = require("../utils/errors/appError");

function validateCreateRequest(req,res,next){
    if(!req.body.modelName){
        ErrorResponse.message = 'Something went wrong while creating airplane';
        ErrorResponse.error = new AppError(['Model name not found in the incoming request'],StatusCodes.BAD_REQUEST);
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
    next();
}

function validateUpdateRequest(req,res,next){
    if(!req.body || !req.body.capacity){
        ErrorResponse.message = 'Something went wrong while updating airplane';
        ErrorResponse.error = new AppError(['Capacity not found in the incoming request'],StatusCodes.BAD_REQUEST);
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
    next();
}

module.exports = {
    validateCreateRequest,
    validateUpdateRequest
}