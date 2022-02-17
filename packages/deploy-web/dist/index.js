import regeneratorRuntime from"regenerator-runtime";import dotenv from'dotenv';import{uploadS3Files}from'./uploadS3.js';import{loadS3Client}from'@crypto-aws/client';function asyncGeneratorStep(gen,resolve,reject,_next,_throw,key,arg){try{var info=gen[key](arg);var value=info.value}catch(error){reject(error);return}if(info.done){resolve(value)}else{Promise.resolve(value).then(_next,_throw)}}function _asyncToGenerator(fn){return function(){var self=this,args=arguments;return new Promise(function(resolve,reject){var gen=fn.apply(self,args);function _next(value){asyncGeneratorStep(gen,resolve,reject,_next,_throw,"next",value)}function _throw(err){asyncGeneratorStep(gen,resolve,reject,_next,_throw,"throw",err)}_next(undefined)})}}dotenv.config();function deletePreviousContent(client,previousContent){return _deletePreviousContent.apply(this,arguments)}function _deletePreviousContent(){_deletePreviousContent=_asyncToGenerator(regeneratorRuntime.mark(function _callee(client,previousContent){return regeneratorRuntime.wrap(function _callee$(_ctx){while(1)switch(_ctx.prev=_ctx.next){case 0:_ctx.next=2;return client.deleteObjects(previousContent,function(err,res){if(err)console.warn("Error [deletePreviousContent] cause: ".concat(err.message));console.log("Successfully deleted item")}).promise();case 2:return _ctx.abrupt("return",_ctx.sent);case 3:case"end":return _ctx.stop()}},_callee)}));return _deletePreviousContent.apply(this,arguments)}function getPreviousWebsiteVersion(client){return _getPreviousWebsiteVersion.apply(this,arguments)}function _getPreviousWebsiteVersion(){_getPreviousWebsiteVersion=_asyncToGenerator(regeneratorRuntime.mark(function _callee1(client){return regeneratorRuntime.wrap(function _callee$(_ctx1){while(1)switch(_ctx1.prev=_ctx1.next){case 0:_ctx1.next=2;return client.listObjects({Bucket:process.env.AWS_S3_BUCKET},function(){var _ref=_asyncToGenerator(regeneratorRuntime.mark(function _callee(err,res){var contents;return regeneratorRuntime.wrap(function _callee$(_ctx){while(1)switch(_ctx.prev=_ctx.next){case 0:if(err)console.warn("Error [getWebsite] ".concat(err===null||err===void 0?void 0:err.message));contents=typeof res.Contents==='undefined'?[]:res.Contents;_ctx.next=4;return deletePreviousContent(client,{Bucket:process.env.AWS_S3_BUCKET,Delete:{Objects:contents.map(function(param){var Key=param.Key;return{Key:Key}})}});case 4:case"end":return _ctx.stop()}},_callee)}));return function(err,res){return _ref.apply(this,arguments)}}()).promise();case 2:return _ctx1.abrupt("return",_ctx1.sent);case 3:case"end":return _ctx1.stop()}},_callee1)}));return _getPreviousWebsiteVersion.apply(this,arguments)}function uploadWebsiteToS3(client){return _uploadWebsiteToS3.apply(this,arguments)}function _uploadWebsiteToS3(){_uploadWebsiteToS3=_asyncToGenerator(regeneratorRuntime.mark(function _callee(client){var publicFile,buildStructure,_iteratorNormalCompletion,_didIteratorError,_iteratorError,_iterator,_step,files,upload;return regeneratorRuntime.wrap(function _callee$(_ctx){while(1)switch(_ctx.prev=_ctx.next){case 0:publicFile='/Users/williamssissoko/WebstormProjects/crypto-history-app/apps/web/dist';buildStructure=uploadS3Files(publicFile,'dist',process.env.AWS_S3_BUCKET);_ctx.prev=2;_iteratorNormalCompletion=true,_didIteratorError=false,_iteratorError=undefined;_ctx.prev=4;_iterator=buildStructure[Symbol.iterator]();case 6:if(_iteratorNormalCompletion=(_step=_iterator.next()).done){_ctx.next=15;break}files=_step.value;_ctx.next=10;return client===null||client===void 0?void 0:client.upload({Bucket:files.Bucket,Body:files.Body,Key:files.Key,ContentType:files.ContentType}).promise();case 10:upload=_ctx.sent;if(upload)console.log("Successfully uploaded item");case 12:_iteratorNormalCompletion=true;_ctx.next=6;break;case 15:_ctx.next=21;break;case 17:_ctx.prev=17;_ctx.t0=_ctx["catch"](4);_didIteratorError=true;_iteratorError=_ctx.t0;case 21:_ctx.prev=21;_ctx.prev=22;if(!_iteratorNormalCompletion&&_iterator.return!=null){_iterator.return()}case 24:_ctx.prev=24;if(!_didIteratorError){_ctx.next=27;break}throw _iteratorError;case 27:return _ctx.finish(24);case 28:return _ctx.finish(21);case 29:_ctx.next=34;break;case 31:_ctx.prev=31;_ctx.t1=_ctx["catch"](2);console.warn("Error [uploadWebsiteToS3] ".concat(_ctx.t1));case 34:case"end":return _ctx.stop()}},_callee,null,[[2,31],[4,17,21,29],[22,,24,28]])}));return _uploadWebsiteToS3.apply(this,arguments)}function deployCloudfront(){return _deployCloudfront.apply(this,arguments)}function _deployCloudfront(){_deployCloudfront=_asyncToGenerator(regeneratorRuntime.mark(function _callee(){return regeneratorRuntime.wrap(function _callee$(_ctx){while(1)switch(_ctx.prev=_ctx.next){case 0:case"end":return _ctx.stop()}},_callee)}));return _deployCloudfront.apply(this,arguments)}function deployWebsite(){return _deployWebsite.apply(this,arguments)}function _deployWebsite(){_deployWebsite=_asyncToGenerator(regeneratorRuntime.mark(function _callee(){var s3Client,deletePreviousContent1,uploadS3;return regeneratorRuntime.wrap(function _callee$(_ctx){while(1)switch(_ctx.prev=_ctx.next){case 0:_ctx.next=2;return loadS3Client();case 2:s3Client=_ctx.sent;_ctx.next=5;return getPreviousWebsiteVersion(s3Client);case 5:deletePreviousContent1=_ctx.sent;_ctx.next=8;return uploadWebsiteToS3(s3Client);case 8:uploadS3=_ctx.sent;return _ctx.abrupt("return",Promise.all([s3Client,deletePreviousContent1,uploadS3]));case 10:case"end":return _ctx.stop()}},_callee)}));return _deployWebsite.apply(this,arguments)}deployWebsite()