"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var node_fetch_1 = __importDefault(require("node-fetch"));
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
var url_1 = require("url");
var path_2 = require("path");
var client_1 = require("@crypto-aws/client");
var process = __importStar(require("process"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1["default"].config({
    path: '.env.local'
});
// @ts-ignore
var __filename = (0, url_1.fileURLToPath)(import.meta.url);
var __dirname = (0, path_2.dirname)(__filename);
(function () { return __awaiter(void 0, void 0, void 0, function () {
    function getSyntheticData() {
        return __awaiter(this, void 0, void 0, function () {
            var result, getSyntheticData_1, data, e_1, content;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!testFileExist) return [3 /*break*/, 7];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 5, , 6]);
                        console.log('reading from [api]...');
                        return [4 /*yield*/, (0, node_fetch_1["default"])(process.env.SYTHETIC_API, {
                                method: 'get'
                            })];
                    case 2:
                        getSyntheticData_1 = _a.sent();
                        if (!getSyntheticData_1.ok) return [3 /*break*/, 4];
                        return [4 /*yield*/, getSyntheticData_1.json()];
                    case 3:
                        data = _a.sent();
                        // write to file
                        fs_1["default"].writeFileSync(testFileName, JSON.stringify(data));
                        result = data;
                        _a.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        e_1 = _a.sent();
                        result = undefined;
                        throw new Error("[getSyntheticData] Reason: ".concat(e_1));
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        console.log('reading safely from file...');
                        content = fs_1["default"].readFileSync(testFileName);
                        result = JSON.parse(content.toString('utf-8'));
                        _a.label = 8;
                    case 8: return [2 /*return*/, result];
                }
            });
        });
    }
    function pushToS3(client, testData, trainingData) {
        if (client) {
            var params = [];
            params.push({
                Bucket: process.env.AWS_S3_BUCKET_SYTHETIC_DATA,
                Key: 'test_data.json',
                Body: JSON.stringify(testData)
            }, {
                Bucket: process.env.AWS_S3_BUCKET_SYTHETIC_DATA,
                Key: 'training_data.json',
                Body: JSON.stringify(trainingData)
            });
            params.map(function (param) {
                client.putObject(param, function (err, data) {
                    if (err)
                        throw new Error("[pushToS3] Reason: ".concat(err));
                    if (data)
                        console.info("Successfully added ".concat(param.Key));
                });
            });
        }
    }
    var file, testFileName, testFileExist, testData, trainingLength, trainingSetData, i, isReady, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                file = __dirname.replace('dist', 'src');
                testFileName = path_1["default"].join(file, 'data/test_data.json');
                testFileExist = fs_1["default"].existsSync(testFileName);
                return [4 /*yield*/, getSyntheticData()];
            case 1:
                testData = _b.sent();
                if (!testData) return [3 /*break*/, 3];
                trainingLength = testData.target.length * 0.30;
                trainingSetData = {
                    start: testData.start,
                    target: new Array(trainingLength)
                };
                for (i = trainingLength; i < testData.target.length; i++)
                    trainingSetData.target[i] = (testData.target[i]);
                // filter out some null values
                trainingSetData.target = trainingSetData.target.filter(function (item) { return item != null; });
                isReady = testFileExist && trainingSetData.target.length >= trainingLength;
                if (!isReady) return [3 /*break*/, 3];
                _a = pushToS3;
                return [4 /*yield*/, (0, client_1.loadS3Client)()];
            case 2:
                _a.apply(void 0, [_b.sent(), testData, trainingSetData]);
                _b.label = 3;
            case 3: return [2 /*return*/];
        }
    });
}); })();
