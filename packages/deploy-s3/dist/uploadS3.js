"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.uploadS3Files = void 0;
var fs_1 = require("fs");
var path_1 = __importDefault(require("path"));
var mime_types_1 = __importDefault(require("mime-types"));
var isDir = function (dir) { return (0, fs_1.lstatSync)(dir).isDirectory(); };
function uploadS3Files(fileName, dir, AWS_S3_BUCKET) {
    var buildStructure = [];
    (0, fs_1.readdirSync)(fileName).map(function (pb, j) {
        var pubDir = path_1["default"].join(fileName, pb);
        if (isDir(pubDir)) {
            uploadS3Files(path_1["default"].join(pubDir), dir, AWS_S3_BUCKET); // recursively get all the files ignoring the directory
        }
        else {
            try {
                var allFiles = (0, fs_1.readFileSync)(pubDir, 'utf8');
                var mainDir = pubDir.match(dir);
                // @ts-ignore
                var bucketS3Path = pubDir.substring(mainDir.index).replace("".concat(mainDir[0], "/"), '');
                buildStructure.push({
                    Bucket: AWS_S3_BUCKET,
                    Key: "".concat(bucketS3Path),
                    Body: allFiles,
                    ContentType: mime_types_1["default"].lookup(bucketS3Path)
                });
            }
            catch (e) {
                console.error("Error reading file, process terminated (Reason): ".concat(e));
                throw e;
            }
        }
    });
    return buildStructure;
}
exports.uploadS3Files = uploadS3Files;
