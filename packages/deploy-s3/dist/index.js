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
var dotenv_1 = __importDefault(require("dotenv"));
var uploadS3_js_1 = require("./uploadS3.js");
var client_1 = require("@crypto-aws/client");
dotenv_1["default"].config();
function deletePreviousContent(client, previousContent) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, client.deleteObjects(previousContent, function (err, res) {
                        if (err)
                            console.warn("Error [deletePreviousContent] cause: ".concat(err.message));
                        console.log("Successfully deleted item");
                    }).promise()];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function getPreviousWebsiteVersion(client) {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, client.listObjects({
                        Bucket: process.env.AWS_S3_BUCKET
                    }, function (err, res) { return __awaiter(_this, void 0, void 0, function () {
                        var contents;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (err)
                                        console.warn("Error [getWebsite] ".concat(err === null || err === void 0 ? void 0 : err.message));
                                    contents = typeof res.Contents === 'undefined' ? [] : res.Contents;
                                    return [4 /*yield*/, deletePreviousContent(client, {
                                            Bucket: process.env.AWS_S3_BUCKET,
                                            Delete: {
                                                Objects: contents.map(function (_a) {
                                                    var Key = _a.Key;
                                                    return ({
                                                        Key: Key
                                                    });
                                                })
                                            }
                                        })];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); }).promise()];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function uploadWebsiteToS3(client) {
    return __awaiter(this, void 0, void 0, function () {
        var publicFile, buildStructure, _i, buildStructure_1, files, upload, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    publicFile = '/Users/williamssissoko/WebstormProjects/crypto-history-app/apps/web/dist';
                    buildStructure = (0, uploadS3_js_1.uploadS3Files)(publicFile, 'dist', process.env.AWS_S3_BUCKET);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 6, , 7]);
                    _i = 0, buildStructure_1 = buildStructure;
                    _a.label = 2;
                case 2:
                    if (!(_i < buildStructure_1.length)) return [3 /*break*/, 5];
                    files = buildStructure_1[_i];
                    return [4 /*yield*/, (client === null || client === void 0 ? void 0 : client.upload({
                            Bucket: files.Bucket,
                            Body: files.Body,
                            Key: files.Key,
                            ContentType: files.ContentType
                        }).promise())];
                case 3:
                    upload = _a.sent();
                    if (upload)
                        console.log("Successfully uploaded item");
                    _a.label = 4;
                case 4:
                    _i++;
                    return [3 /*break*/, 2];
                case 5: return [3 /*break*/, 7];
                case 6:
                    e_1 = _a.sent();
                    console.warn("Error [uploadWebsiteToS3] ".concat(e_1));
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    });
}
function deployWebsite() {
    return __awaiter(this, void 0, void 0, function () {
        var s3Client, deletePreviousContent, uploadS3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, client_1.loadS3Client)()];
                case 1:
                    s3Client = _a.sent();
                    return [4 /*yield*/, getPreviousWebsiteVersion(s3Client)];
                case 2:
                    deletePreviousContent = _a.sent();
                    return [4 /*yield*/, uploadWebsiteToS3(s3Client)];
                case 3:
                    uploadS3 = _a.sent();
                    return [2 /*return*/, Promise.all([
                            s3Client,
                            deletePreviousContent,
                            uploadS3
                        ])];
            }
        });
    });
}
deployWebsite();
