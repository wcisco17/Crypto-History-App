"use strict";
exports.__esModule = true;
exports.mergeFiles = exports.AWS_S3_BUCKET = void 0;
var fs_1 = require("fs");
var path_1 = require("path");
exports.AWS_S3_BUCKET = "courseworkwebsite";
var isDir = function (dir) { return (0, fs_1.lstatSync)(dir).isDirectory(); };
// @TODO need to refactor to hashmap
function mergeFiles(fileName, buildStructure) {
    (0, fs_1.readdirSync)(fileName).map(function (pb, j) {
        var pubDir = path_1["default"].join(fileName, pb);
        if (isDir(pubDir)) {
            mergeFiles(path_1["default"].join(pubDir), buildStructure); // recursively get all the files ignoring the directory
        }
        else {
            try {
                var allFiles = (0, fs_1.readFileSync)(pubDir, "utf8");
                //@ts-ignore
                var index = pubDir.match("public").index;
                var bucketS3Path = pubDir.substring(index, pubDir.length);
                buildStructure.push({
                    Bucket: exports.AWS_S3_BUCKET,
                    Key: bucketS3Path,
                    Body: allFiles
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
exports.mergeFiles = mergeFiles;
