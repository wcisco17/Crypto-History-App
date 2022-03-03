"use strict";
exports.__esModule = true;
exports.convertToUnixEpoch = void 0;
var convertToUnixEpoch = function (input) {
    var result = Math.floor(new Date(input).getTime() / 1000.0);
    if (isNaN(result)) {
        throw new Error("Invalid Date Format");
    }
    else
        return result;
};
exports.convertToUnixEpoch = convertToUnixEpoch;
