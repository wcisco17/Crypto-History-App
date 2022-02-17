"use strict";
exports.__esModule = true;
exports.convertToUnixEpoch = void 0;
var convertToUnixEpoch = function (input) {
    return Math.floor(new Date(input).getTime() / 1000.0);
};
exports.convertToUnixEpoch = convertToUnixEpoch;
