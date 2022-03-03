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
exports.__esModule = true;
exports.createNumerical = void 0;
var client_1 = require("@crypto-aws/client");
var db_1 = require("@crypto-api/db");
function createNumerical(_a) {
    var _b, _c;
    var client = _a.client, coinName = _a.coinName, coinapi = _a.coinapi, coinCompare = _a.coinCompare, limit = _a.limit, time = _a.time, hour = _a.hour, convertTime = _a.convertTime;
    return __awaiter(this, void 0, void 0, function () {
        var orderbooks, ohlcvCryptoCompare;
        var _this = this;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0: return [4 /*yield*/, (0, db_1.getHistoricalCoinAPIData)({
                        limit: limit,
                        time_start: time,
                        time_end: '',
                        symbol: { coinapi: coinapi },
                        historical: 'quotes'
                    })];
                case 1:
                    orderbooks = _d.sent();
                    if (((_b = orderbooks.error) === null || _b === void 0 ? void 0 : _b.length) >= 1)
                        throw Error("[orderbooks] ".concat(orderbooks.error));
                    else
                        Promise.all(orderbooks.map(function (orderbook) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, client.send(new client_1.PutItemCommand({
                                            TableName: 'CryptoOrderBooks',
                                            Item: {
                                                CryptoSymbolID: { S: coinName },
                                                PriceTimeStamp: { N: convertTime.toString() },
                                                BidSize: { N: orderbook.bid_size.toString() },
                                                BidPrice: { N: orderbook.bid_price.toString() },
                                                AsksSize: { N: orderbook.ask_size.toString() },
                                                AsksPrice: { N: orderbook.ask_price.toString() },
                                                DataType: { S: 'orderbooks' }
                                            }
                                        }))];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); }));
                    return [4 /*yield*/, (0, db_1.getHistoricalCryptoCompareOHLCVData)({
                            limit: limit,
                            time_start: convertTime.toString(),
                            symbol: { coinCompare: coinCompare }
                        })];
                case 2:
                    ohlcvCryptoCompare = _d.sent();
                    if (((_c = ohlcvCryptoCompare === null || ohlcvCryptoCompare === void 0 ? void 0 : ohlcvCryptoCompare.Message) === null || _c === void 0 ? void 0 : _c.length) >= 1)
                        throw new Error("[ohlcvCryptoCompare] ".concat(ohlcvCryptoCompare === null || ohlcvCryptoCompare === void 0 ? void 0 : ohlcvCryptoCompare.Message));
                    else 
                    // Get OHLCV Data from Crypto Compare
                    {
                        Promise.all(ohlcvCryptoCompare.Data.map(function (coin) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, client.send(new client_1.PutItemCommand({
                                            TableName: 'CryptoPrices',
                                            Item: {
                                                CryptoSymbolID: { S: coinName },
                                                PriceTimeStamp: { N: convertTime.toString() },
                                                TimeStamp: { N: coin.time.toString() },
                                                Close: { N: coin.close.toString() },
                                                High: { N: coin.high.toString() },
                                                Low: { N: coin.low.toString() },
                                                Open: { N: coin.open.toString() },
                                                DataType: { S: 'ohlcv' }
                                            }
                                        }))];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); }));
                    }
                    return [2 /*return*/];
            }
        });
    });
}
exports.createNumerical = createNumerical;
