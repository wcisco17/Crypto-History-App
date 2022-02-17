"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.__esModule = true;
exports.createTimestamp = void 0;
var client_1 = require("@crypto-aws/client");
var db_1 = require("@crypto-api/db");
var util_js_1 = require("@crypto-api/db/src/util.js");
var input = {
    time_start: '2022-02-10',
    time_end: '2022-02-11',
    limit: '10'
};
var transformOHLCVData = function (coinApi, coinCompare) {
    var _a;
    var ohlcvOuput = [];
    if (coinApi.length >= 1) {
        for (var _i = 0, coinApi_1 = coinApi; _i < coinApi_1.length; _i++) {
            var coin = coinApi_1[_i];
            ohlcvOuput.push({
                coinApi: {
                    PriceHigh: coin.price_high.toString(),
                    TimeStart: coin.time_period_start.toString(),
                    TimeEnd: coin.time_period_end.toString(),
                    PriceOpen: coin.price_open.toString(),
                    PriceClose: coin.price_close.toString(),
                    VolumeTraded: coin.volume_traded.toString()
                }
            });
        }
        if (((_a = coinCompare === null || coinCompare === void 0 ? void 0 : coinCompare.Data) === null || _a === void 0 ? void 0 : _a.length) >= 1) {
            for (var _b = 0, _c = coinCompare.Data; _b < _c.length; _b++) {
                var coin = _c[_b];
                ohlcvOuput.push({
                    coinCompare: {
                        TimeStart: coin.time.toString(),
                        Close: coin.close.toString(),
                        High: coin.high.toString(),
                        Low: coin.low.toString(),
                        Open: coin.open.toString()
                    }
                });
            }
        }
        return ohlcvOuput;
    }
};
function createTimestamp(client, coinName, coinapi, coinCompare) {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function () {
        var convertTime, ohlcvCoinApiData, ohlcvCryptoCompare, ohlcv, data, updateDbInput, updateItemResult;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    convertTime = (0, util_js_1.convertToUnixEpoch)(input.time_start);
                    return [4 /*yield*/, (0, db_1.getHistoricalCoinAPIData)(__assign(__assign({}, input), { historical: 'OHLCV', symbol: { coinapi: coinapi }, period_id: '1HRS' }))];
                case 1:
                    ohlcvCoinApiData = _d.sent();
                    if (((_b = (_a = ohlcvCoinApiData) === null || _a === void 0 ? void 0 : _a.error) === null || _b === void 0 ? void 0 : _b.length) > 1) {
                        throw Error("Calling [ohlcvCoinApiData] issue: ".concat((_c = ohlcvCoinApiData) === null || _c === void 0 ? void 0 : _c.error));
                    }
                    return [4 /*yield*/, (0, db_1.getHistoricalCryptoCompareOHLCVData)(__assign(__assign({}, input), { symbol: { coinCompare: coinCompare } }))];
                case 2:
                    ohlcvCryptoCompare = _d.sent();
                    if ((ohlcvCryptoCompare === null || ohlcvCryptoCompare === void 0 ? void 0 : ohlcvCryptoCompare.Response) === 'Error') {
                        throw Error("Calling [ohlcvCryptoCompare] issue: ".concat(ohlcvCryptoCompare === null || ohlcvCryptoCompare === void 0 ? void 0 : ohlcvCryptoCompare.Message));
                    }
                    ohlcv = transformOHLCVData(ohlcvCoinApiData, ohlcvCryptoCompare);
                    data = JSON.stringify({
                        ohlcv: ohlcv
                    });
                    updateDbInput = {
                        TableName: 'CryptoCurrency',
                        Item: {
                            PK: { S: "Crypto_".concat(coinName) },
                            SK: { S: "TimeStamp_".concat(convertTime.toString()) },
                            Data: { S: data }
                        }
                    };
                    return [4 /*yield*/, client.send(new client_1.PutItemCommand(updateDbInput))];
                case 3:
                    updateItemResult = _d.sent();
                    return [2 /*return*/, Promise.all([ohlcvCoinApiData, ohlcvCryptoCompare, updateItemResult])
                            .then(function (data) {
                            var updateItemResultData = data[2];
                            // if updated item is successful
                            if (updateItemResultData.$metadata.httpStatusCode == 200)
                                console.log("Successfully retrieved data: [".concat(updateDbInput.Item.PK.S, "]"));
                            return updateItemResult;
                        })["catch"](function (err) {
                            console.error("Error [createTimestamp] - ".concat(err));
                            throw err;
                        })];
            }
        });
    });
}
exports.createTimestamp = createTimestamp;
