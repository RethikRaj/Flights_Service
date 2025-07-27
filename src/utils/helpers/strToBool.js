function stringToBoolean(str){
    if (typeof str === 'boolean'){
        return str;
    }else if(typeof str === 'string'){
        return !(['false', '0', 'no'].includes(str.toLowerCase()));
    }
    return true;
}

module.exports = {
    stringToBoolean
}