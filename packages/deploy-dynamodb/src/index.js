"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
var client_1 = require("@crypto-aws/client");
var create_crypto_js_1 = require("./create-crypto.js");
var inquirer_util_js_1 = require("./inquirer-util.js");
var create_numerical_js_1 = require("./create-numerical.js");
var util_js_1 = require("@crypto-api/db/src/util.js");
var create_text_data_js_1 = require("./create-text-data.js");
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var commandActions, client, initCommands, writeTypes, typesOfWrite, pickCoins, coinName, coinName, coinApi, coinCompare, amount, date, hour, hourIdx_1, min, endMin, _loop_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                commandActions = Object.values(inquirer_util_js_1.DynamoActionsConfiguration);
                return [4 /*yield*/, (0, client_1.loadDynamoDBClient)()];
            case 1:
                client = _a.sent();
                return [4 /*yield*/, (0, inquirer_util_js_1.createCommands)({
                        type: 'list',
                        message: 'Which [DynamoDB] commands should I excecute?',
                        actions: commandActions
                    })];
            case 2:
                initCommands = _a.sent();
                if (!initCommands.includes('write')) return [3 /*break*/, 12];
                writeTypes = Object.values(inquirer_util_js_1.TypesOfWrite);
                return [4 /*yield*/, (0, inquirer_util_js_1.createCommands)({
                        type: 'list',
                        message: 'Write New Coin OR Update Timestamp Key?',
                        actions: writeTypes
                    })];
            case 3:
                typesOfWrite = _a.sent();
                pickCoins = [
                    'bitcoin', 'xrp', 'dogecoin', 'ethereum', 'bch', 'polygon', 'tether'
                ];
                if (!typesOfWrite.includes('new-coin')) return [3 /*break*/, 5];
                return [4 /*yield*/, (0, inquirer_util_js_1.createCommands)({
                        type: 'list',
                        message: 'For which Coin?',
                        actions: pickCoins
                    })];
            case 4:
                coinName = _a.sent();
                return [2 /*return*/, (0, create_crypto_js_1.createCryptoItem)(client, coinName)];
            case 5:
                if (!typesOfWrite.includes('time-stamp')) return [3 /*break*/, 12];
                return [4 /*yield*/, (0, inquirer_util_js_1.createCommands)({
                        type: 'list',
                        message: 'For which Coin?',
                        actions: __spreadArray([], pickCoins, true)
                    })];
            case 6:
                coinName = _a.sent();
                coinApi = void 0;
                coinCompare = void 0;
                switch (coinName) {
                    case 'bitcoin':
                        coinApi = 'BITSTAMP_SPOT_BTC_USD';
                        coinCompare = 'BTC';
                        break;
                    case 'xrp':
                        coinApi = 'BITSTAMP_SPOT_XRP_USD';
                        coinCompare = 'XRP';
                        break;
                    case 'dogecoin':
                        coinApi = 'BITSTAMP_SPOT_DOGE_USD';
                        coinCompare = 'DOGE';
                        break;
                    case 'ethereum':
                        coinApi = 'BITSTAMP_SPOT_ETH_USD';
                        coinCompare = 'ETH';
                        break;
                    case 'bch':
                        coinApi = 'BITSTAMP_SPOT_BCH_USD';
                        coinCompare = 'BCH';
                        break;
                    case 'polygon':
                        coinApi = 'BITSTAMP_SPOT_POLYGON_USD';
                        coinCompare = 'POLYGON';
                        break;
                }
                return [4 /*yield*/, (0, inquirer_util_js_1.createCommands)({
                        type: 'input',
                        message: 'How many would you like to PUT? [condition: every number is added per hour]'
                    })];
            case 7:
                amount = _a.sent();
                return [4 /*yield*/, (0, inquirer_util_js_1.createCommands)({
                        type: 'input',
                        message: 'Which date would you like to PULL your data from? [REQUIRED FORMAT: yyyy-MM-ddTHH:mm:ss.fffffff]'
                    })];
            case 8:
                date = _a.sent();
                return [4 /*yield*/, (0, inquirer_util_js_1.createCommands)({
                        type: 'input',
                        message: 'Which hour should we start from?'
                    })];
            case 9:
                hour = _a.sent();
                hourIdx_1 = 0;
                amount = Number(amount);
                min = 10;
                endMin = 60;
                _loop_1 = function () {
                    var time, minText, hourText, currentTime, convertTime, numerical, text_data;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                minText = void 0;
                                hourText = void 0;
                                currentTime = Number(hour) + hourIdx_1;
                                if (currentTime < 10)
                                    hourText = "0".concat(currentTime);
                                else if (currentTime >= 10)
                                    hourText = "".concat(currentTime);
                                if (min < 10)
                                    minText = "0".concat(min);
                                else if (min >= 10)
                                    minText = "".concat(min);
                                time = "".concat(date, "T").concat(hourText, ":").concat(minText, ":00");
                                convertTime = (0, util_js_1.convertToUnixEpoch)(time);
                                return [4 /*yield*/, (0, create_numerical_js_1.createNumerical)({
                                        client: client,
                                        coinName: coinName,
                                        coinapi: coinApi,
                                        coinCompare: coinCompare,
                                        limit: amount.toString(),
                                        time: time,
                                        hour: hour,
                                        convertTime: convertTime
                                    })];
                            case 1:
                                numerical = _b.sent();
                                return [4 /*yield*/, (0, create_text_data_js_1.createTextData)(client, coinName, amount.toString(), date, hour, convertTime, coinCompare)];
                            case 2:
                                text_data = _b.sent();
                                Promise.all([text_data, numerical]).then(function (_a) {
                                    var _ = _a[0], __ = _a[1];
                                    console.log("".concat(hourIdx_1, " Successfully added both [numericalResult & testResult] with dates: ").concat(time));
                                })["catch"](console.log);
                                min++;
                                if (min == endMin) {
                                    min = 0;
                                    hourIdx_1++;
                                }
                                return [2 /*return*/];
                        }
                    });
                };
                _a.label = 10;
            case 10:
                if (!(hourIdx_1 < amount && min < endMin)) return [3 /*break*/, 12];
                return [5 /*yield**/, _loop_1()];
            case 11:
                _a.sent();
                return [3 /*break*/, 10];
            case 12: return [2 /*return*/];
        }
    });
}); })();
