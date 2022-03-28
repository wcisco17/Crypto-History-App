"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.convertToDate = void 0;
var dotenv_1 = __importDefault(require("dotenv"));
var moment_1 = __importDefault(require("moment"));
dotenv_1["default"].config({
    path: '.env.local'
});
var convertToDate = function (input) {
    return moment_1["default"].unix(input).format('YYYY-MM-DD');
};
exports.convertToDate = convertToDate;
__exportStar(require("./src/numerical"), exports);
__exportStar(require("./src/text-data"), exports);
__exportStar(require("./src/dynamo-db.types"), exports);
__exportStar(require("./src/text-data.types"), exports);
__exportStar(require("./src/numerical.types"), exports);
