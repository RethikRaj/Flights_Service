const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../utils/common");
const AppError = require("../utils/errors/appError");

function validateCreateRequest(req,res,next){
    if(!req.body){
        ErrorResponse.message = 'Something went wrong while creating airport';
        ErrorResponse.error = new AppError(['Body not found in the incoming request'],StatusCodes.BAD_REQUEST);
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
    else if(req.body.name && req.body.code && req.body.cityId){
        next();
    }
    else{
        ErrorResponse.message = 'Something went wrong while creating airport';
        let explanation = [];
        if(!req.body.name){
            explanation.push('airport name not found in the incoming request');
        }
        if(!req.body.code){
            explanation.push('airport code not found in the incoming request');
        }
        if(!req.body.cityId){
            explanation.push('cityId not found in the incoming request')
        }

        ErrorResponse.error = new AppError(explanation,StatusCodes.BAD_REQUEST);
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    } 
}

function validateUpdateRequest(req,res,next){
    // any one of name, code , address is enough
    if(!req.body && !req.body.name && !req.body.code && !req.body.address){
        ErrorResponse.message = 'Something went wrong while updating airport';
        ErrorResponse.error = new AppError(['None of the parameters : [ name , code , address ] is present in the incoming request'],StatusCodes.BAD_REQUEST);
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
    next();
}

module.exports = {
    validateCreateRequest,
    validateUpdateRequest
}