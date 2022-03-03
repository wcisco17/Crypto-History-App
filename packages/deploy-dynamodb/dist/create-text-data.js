import regeneratorRuntime from"regenerator-runtime";import{convertToUnixEpoch}from'@crypto-api/db/src/util.js';import{PutItemCommand}from'@crypto-aws/client';import{getHistoricalCryptoCompareNewsData,getHistoricalNewsApiData}from'@crypto-api/db';function asyncGeneratorStep(gen,resolve,reject,_next,_throw,key,arg){try{var info=gen[key](arg);var value=info.value}catch(error){reject(error);return}if(info.done){resolve(value)}else{Promise.resolve(value).then(_next,_throw)}}function _asyncToGenerator(fn){return function(){var self=this,args=arguments;return new Promise(function(resolve,reject){var gen=fn.apply(self,args);function _next(value){asyncGeneratorStep(gen,resolve,reject,_next,_throw,"next",value)}function _throw(err){asyncGeneratorStep(gen,resolve,reject,_next,_throw,"throw",err)}_next(undefined)})}}export function createTextData(client,coinName,limit,date,hour,convertTime,coinCompare){return _createTextData.apply(this,arguments)}function _createTextData(){_createTextData=_asyncToGenerator(regeneratorRuntime.mark(function _callee1(client,coinName,limit,date,hour,convertTime,coinCompare){var newApiData,historicalNewsData,_iteratorNormalCompletion,_didIteratorError,_iteratorError,_iterator,_step,data2,cryptoCompareNewsData,_iteratorNormalCompletion1,_didIteratorError1,_iteratorError1,_iterator1,_step1,data1;return regeneratorRuntime.wrap(function _callee$(_ctx1){while(1)switch(_ctx1.prev=_ctx1.next){case 0:newApiData=[];_ctx1.next=3;return getHistoricalNewsApiData({limit:limit,time_start:date,time_end:'',symbol:{newsApi:coinName}});case 3:historicalNewsData=_ctx1.sent;_iteratorNormalCompletion=true,_didIteratorError=false,_iteratorError=undefined;if(!(historicalNewsData.status=='ok')){_ctx1.next=22;break}_ctx1.prev=6;for(_iterator=historicalNewsData.articles[Symbol.iterator]();!(_iteratorNormalCompletion=(_step=_iterator.next()).done);_iteratorNormalCompletion=true){data2=_step.value;newApiData.push({id:convertToUnixEpoch(data2.publishedAt.toString()),name:data2.title,content:data2.content,currencySymbol:coinName,articalTimeStamp:convertTime})}_ctx1.next=14;break;case 10:_ctx1.prev=10;_ctx1.t0=_ctx1["catch"](6);_didIteratorError=true;_iteratorError=_ctx1.t0;case 14:_ctx1.prev=14;_ctx1.prev=15;if(!_iteratorNormalCompletion&&_iterator.return!=null){_iterator.return()}case 17:_ctx1.prev=17;if(!_didIteratorError){_ctx1.next=20;break}throw _iteratorError;case 20:return _ctx1.finish(17);case 21:return _ctx1.finish(14);case 22:_ctx1.next=24;return getHistoricalCryptoCompareNewsData({time_start:date,symbol:{coinCompare:coinCompare}});case 24:cryptoCompareNewsData=_ctx1.sent;_iteratorNormalCompletion1=true,_didIteratorError1=false,_iteratorError1=undefined;_ctx1.prev=26;for(_iterator1=cryptoCompareNewsData.Data[Symbol.iterator]();!(_iteratorNormalCompletion1=(_step1=_iterator1.next()).done);_iteratorNormalCompletion1=true){data1=_step1.value;newApiData.push({id:data1.published_on,name:data1.title,content:data1.body,currencySymbol:coinName,articalTimeStamp:convertTime})}_ctx1.next=34;break;case 30:_ctx1.prev=30;_ctx1.t1=_ctx1["catch"](26);_didIteratorError1=true;_iteratorError1=_ctx1.t1;case 34:_ctx1.prev=34;_ctx1.prev=35;if(!_iteratorNormalCompletion1&&_iterator1.return!=null){_iterator1.return()}case 37:_ctx1.prev=37;if(!_didIteratorError1){_ctx1.next=40;break}throw _iteratorError1;case 40:return _ctx1.finish(37);case 41:return _ctx1.finish(34);case 42:newApiData.map(function(){var _ref=_asyncToGenerator(regeneratorRuntime.mark(function _callee(data){return regeneratorRuntime.wrap(function _callee$(_ctx){while(1)switch(_ctx.prev=_ctx.next){case 0:_ctx.next=2;return client.send(new PutItemCommand({TableName:'CryptoNewsAPI',Item:{CryptoSymbolID:{S:data.currencySymbol},ArticleTimeStamp:{N:convertTime.toString()},ArticleID:{S:data.id.toString()},Content:{S:data.content}}})).catch(function(err){return console.error("Error creating [newsAPIData]",err)});case 2:case"end":return _ctx.stop()}},_callee)}));return function(data){return _ref.apply(this,arguments)}}());case 43:case"end":return _ctx1.stop()}},_callee1,null,[[6,10,14,22],[15,,17,21],[26,30,34,42],[35,,37,41]])}));return _createTextData.apply(this,arguments)}