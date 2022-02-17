import regeneratorRuntime from"regenerator-runtime";import{PutItemCommand}from'@crypto-aws/client';import{getHistoricalCoinAPIData,getHistoricalCryptoCompareOHLCVData}from'@crypto-api/db';import{convertToUnixEpoch}from'@crypto-api/db/src/util.js';function _arrayLikeToArray(arr,len){if(len==null||len>arr.length)len=arr.length;for(var i=0,arr2=new Array(len);i<len;i++)arr2[i]=arr[i];return arr2}function _arrayWithHoles(arr){if(Array.isArray(arr))return arr}function asyncGeneratorStep(gen,resolve,reject,_next,_throw,key,arg){try{var info=gen[key](arg);var value=info.value}catch(error){reject(error);return}if(info.done){resolve(value)}else{Promise.resolve(value).then(_next,_throw)}}function _asyncToGenerator(fn){return function(){var self=this,args=arguments;return new Promise(function(resolve,reject){var gen=fn.apply(self,args);function _next(value){asyncGeneratorStep(gen,resolve,reject,_next,_throw,"next",value)}function _throw(err){asyncGeneratorStep(gen,resolve,reject,_next,_throw,"throw",err)}_next(undefined)})}}function _defineProperty(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true})}else{obj[key]=value}return obj}function _iterableToArrayLimit(arr,i){var _i=arr==null?null:typeof Symbol!=="undefined"&&arr[Symbol.iterator]||arr["@@iterator"];if(_i==null)return;var _arr=[];var _n=true;var _d=false;var _s,_e;try{for(_i=_i.call(arr);!(_n=(_s=_i.next()).done);_n=true){_arr.push(_s.value);if(i&&_arr.length===i)break}}catch(err){_d=true;_e=err}finally{try{if(!_n&&_i["return"]!=null)_i["return"]()}finally{if(_d)throw _e}}return _arr}function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function _objectSpread(target){for(var i=1;i<arguments.length;i++){var source=arguments[i]!=null?arguments[i]:{};var ownKeys=Object.keys(source);if(typeof Object.getOwnPropertySymbols==="function"){ownKeys=ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym){return Object.getOwnPropertyDescriptor(source,sym).enumerable}))}ownKeys.forEach(function(key){_defineProperty(target,key,source[key])})}return target}function _slicedToArray(arr,i){return _arrayWithHoles(arr)||_iterableToArrayLimit(arr,i)||_unsupportedIterableToArray(arr,i)||_nonIterableRest()}function _unsupportedIterableToArray(o,minLen){if(!o)return;if(typeof o==="string")return _arrayLikeToArray(o,minLen);var n=Object.prototype.toString.call(o).slice(8,-1);if(n==="Object"&&o.constructor)n=o.constructor.name;if(n==="Map"||n==="Set")return Array.from(n);if(n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return _arrayLikeToArray(o,minLen)}var input={time_start:'2022-02-10',time_end:'2022-02-11',limit:'10'};var transformOHLCVData=function(coinApi,coinCompare){var ohlcvOuput=[];if(coinApi.length>=1){var ref;var _iteratorNormalCompletion=true,_didIteratorError=false,_iteratorError=undefined;try{for(var _iterator=coinApi[Symbol.iterator](),_step;!(_iteratorNormalCompletion=(_step=_iterator.next()).done);_iteratorNormalCompletion=true){var coin=_step.value;ohlcvOuput.push({coinApi:{PriceHigh:coin.price_high.toString(),TimeStart:coin.time_period_start.toString(),TimeEnd:coin.time_period_end.toString(),PriceOpen:coin.price_open.toString(),PriceClose:coin.price_close.toString(),VolumeTraded:coin.volume_traded.toString()}})}}catch(err){_didIteratorError=true;_iteratorError=err}finally{try{if(!_iteratorNormalCompletion&&_iterator.return!=null){_iterator.return()}}finally{if(_didIteratorError){throw _iteratorError}}}if((coinCompare===null||coinCompare===void 0?void 0:(ref=coinCompare.Data)===null||ref===void 0?void 0:ref.length)>=1){var _iteratorNormalCompletion1=true,_didIteratorError1=false,_iteratorError1=undefined;try{for(var _iterator1=coinCompare.Data[Symbol.iterator](),_step1;!(_iteratorNormalCompletion1=(_step1=_iterator1.next()).done);_iteratorNormalCompletion1=true){var coin1=_step1.value;ohlcvOuput.push({coinCompare:{TimeStart:coin1.time.toString(),Close:coin1.close.toString(),High:coin1.high.toString(),Low:coin1.low.toString(),Open:coin1.open.toString()}})}}catch(err){_didIteratorError1=true;_iteratorError1=err}finally{try{if(!_iteratorNormalCompletion1&&_iterator1.return!=null){_iterator1.return()}}finally{if(_didIteratorError1){throw _iteratorError1}}}}return ohlcvOuput}};export function createTimestamp(client,coinName,coinapi,coinCompare){return _createTimestamp.apply(this,arguments)}function _createTimestamp(){_createTimestamp=_asyncToGenerator(regeneratorRuntime.mark(function _callee(client,coinName,coinapi,coinCompare){var ref,ref1,convertTime,ohlcvCoinApiData,ref2,ohlcvCryptoCompare,ohlcv,data1,updateDbInput,updateItemResult;return regeneratorRuntime.wrap(function _callee$(_ctx){while(1)switch(_ctx.prev=_ctx.next){case 0:;convertTime=convertToUnixEpoch(input.time_start);_ctx.next=4;return getHistoricalCoinAPIData(_objectSpread({},input,{historical:'OHLCV',symbol:{coinapi:coinapi},period_id:'1HRS'}));case 4:ohlcvCoinApiData=_ctx.sent;if(!(((ref=ohlcvCoinApiData)===null||ref===void 0?void 0:(ref1=ref.error)===null||ref1===void 0?void 0:ref1.length)>1)){_ctx.next=8;break};throw Error("Calling [ohlcvCoinApiData] issue: ".concat((ref2=ohlcvCoinApiData)===null||ref2===void 0?void 0:ref2.error));case 8:_ctx.next=10;return getHistoricalCryptoCompareOHLCVData(_objectSpread({},input,{symbol:{coinCompare:coinCompare}}));case 10:ohlcvCryptoCompare=_ctx.sent;if(!((ohlcvCryptoCompare===null||ohlcvCryptoCompare===void 0?void 0:ohlcvCryptoCompare.Response)==='Error')){_ctx.next=13;break}throw Error("Calling [ohlcvCryptoCompare] issue: ".concat(ohlcvCryptoCompare===null||ohlcvCryptoCompare===void 0?void 0:ohlcvCryptoCompare.Message));case 13:ohlcv=transformOHLCVData(ohlcvCoinApiData,ohlcvCryptoCompare);data1=JSON.stringify({ohlcv:ohlcv});updateDbInput={TableName:'CryptoCurrency',Item:{PK:{S:"Crypto_".concat(coinName)},SK:{S:"TimeStamp_".concat(convertTime.toString())},Data:{S:data1}}};_ctx.next=18;return client.send(new PutItemCommand(updateDbInput));case 18:updateItemResult=_ctx.sent;return _ctx.abrupt("return",Promise.all([ohlcvCoinApiData,ohlcvCryptoCompare,updateItemResult]).then(function(data){var _data=_slicedToArray(data,3),updateItemResultData=_data[2];if(updateItemResultData.$metadata.httpStatusCode==200)console.log("Successfully retrieved data: [".concat(updateDbInput.Item.PK.S,"]"));return updateItemResult}).catch(function(err){console.error("Error [createTimestamp] - ".concat(err));throw err}));case 20:case"end":return _ctx.stop()}},_callee)}));return _createTimestamp.apply(this,arguments)}