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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.getHistoricalCryptoCompareNewsData = exports.getHistoricalNewsApiData = void 0;
var cross_fetch_1 = __importDefault(require("cross-fetch"));
var constant_js_1 = require("./constant.js");
var util_js_1 = require("./util.js");
/*
  @api - News API Historical Data
 */
function getHistoricalNewsApiData(_a) {
    var time_end = _a.time_end, time_start = _a.time_start, limit = _a.limit, symbol = _a.symbol;
    return __awaiter(this, void 0, void 0, function () {
        var url, res, data, e_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    url = constant_js_1.NEWS_API_ORG_URL + "?q=" + symbol.newsApi + "&pageSize=" + limit + "&from=" + time_start + "&to=" + time_end + "&sortBy=popularity";
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, (0, cross_fetch_1["default"])(url, {
                            method: "GET",
                            headers: {
                                "X-Api-Key": constant_js_1.NEW_API_ORG_KEY
                            }
                        })];
                case 2:
                    res = _b.sent();
                    return [4 /*yield*/, res.json()];
                case 3:
                    data = _b.sent();
                    return [2 /*return*/, data];
                case 4:
                    e_1 = _b.sent();
                    throw new Error("[News_API Failed] - Failed " + e_1);
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.getHistoricalNewsApiData = getHistoricalNewsApiData;
function getHistoricalCryptoCompareNewsData(_a) {
    var time_start = _a.time_start, symbol = _a.symbol;
    return __awaiter(this, void 0, void 0, function () {
        var time, url, newsData, data, e_2;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    time = (0, util_js_1.convertToUnixEpoch)(time_start).toString();
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 4, , 5]);
                    url = constant_js_1.CRYPTO_COMPARE_URL + "/data/v2/news/?feeds=cryptocompare,cointelegraph,coindesk&?lang=EN&lTs=" + time + "&categories=" + symbol.coinCompare;
                    return [4 /*yield*/, (0, cross_fetch_1["default"])(url, {
                            method: 'GET',
                            headers: {
                                authorization: "Apikey " + constant_js_1.CRYPTO_COMPARE_KEY
                            }
                        })];
                case 2:
                    newsData = _b.sent();
                    return [4 /*yield*/, newsData.json()];
                case 3:
                    data = _b.sent();
                    return [2 /*return*/, data];
                case 4:
                    e_2 = _b.sent();
                    throw new Error("[Crypto_Compare Failed] - Failed " + e_2);
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.getHistoricalCryptoCompareNewsData = getHistoricalCryptoCompareNewsData;
