const AWS = require('aws-sdk')

const NUMERICAL_S3_BUCKET = 'numericaldataset'
const PREDICTION_S3_BUCKET = 'predicteddataset'

const LATEST_DATE_BITCOIN = 1646687000
const LATEST_DATE_ETH = 1646684400

// AWS_CLIENTS
const s3 = new AWS.S3();
const db = new AWS.DynamoDB();

// gets the latest date from our date set. (Starting from)
function getLatestDate(cryptoItems) {
  let latestDate;
  if (typeof cryptoItems != 'string') {
    latestDate = Number.MAX_SAFE_INTEGER;
    for (const items of cryptoItems) {
      const date = Number(items.PriceTimeStamp.N);
      if (date < latestDate)
        latestDate = date;
    }
  }
  else {
    latestDate = cryptoItems;
  }

  // convert time to accepted format for Input/Output Interface for the DeepAR Algorithm
  let date = new Date(latestDate * 1000);

  let formatDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000))
    .toISOString()
  formatDate = formatDate.substr(0, formatDate.length - 1)
  formatDate = formatDate.replace('T', ' ').replace('.000', '')

  return formatDate;
}

// We get 30% of the data from our original set
function getTrainingData(cryptoItems) {
  const cryptoItemsLength = cryptoItems.length;
  let trainingJobData = []
  let trainingStartIdx = Math.round(cryptoItemsLength * 0.30);

  for (let i = trainingStartIdx; i < cryptoItemsLength; i++) {
    trainingJobData.push(cryptoItems[i]);
  }

  return trainingJobData;
}

// OHLC Average uses the open, high, low, and close. We use it to calculate the
// overall average of every column
function getOHLCVAverage(cryptoItems) {
  let movingAverage = [];
  cryptoItems.map(data => {
    const average = (Number(data.Close.N) + Number(data.High.N) + Number(data.Open.N) + Number(data.Low.N)) / 4
    movingAverage.push(average)
  });

  return movingAverage;
}

// check if the s3 bucket exist if not push the (previous) items from db inside (crypto-prices).
async function createBucketTrainingJob(symbolId, priceStamp) {
  // we only care about the day.
  let timeStamp = priceStamp.N.toString().substr(0, 5)
  let symbol = symbolId.S;

  let params = {
    TableName: 'CryptoPrices',
    KeyConditionExpression: 'CryptoSymbolID = :p_id',
    ExpressionAttributeValues: {
      ':p_id': {
        'S': symbol
      },
    }
  }

  // list out dynamo table get items based on the symbolId: 'ethereum', priceStampBegins: '1652' (day off)
  const cryptoItems = await db.query(params).promise()

  if (cryptoItems.Items.length >= 1) {

    const filterCryptoItems = cryptoItems.Items.filter((items) => {
      const timeStampItem = items.PriceTimeStamp.N.toString().substr(0, 5);
      if (timeStampItem === timeStamp) return items
    });

    const latestDates = getLatestDate(cryptoItems.Items);
    const testData = getOHLCVAverage(cryptoItems.Items);

    // create a copy of the data
    const other = testData
    const trainingData = getTrainingData(other);

    const BodyTrainingData = {
      "start": latestDates,
      "target": trainingData
    }

    const BodyTestData = {
      "start": latestDates,
      "target": testData
    }

    // create a test_set in s3 numerical_data_set/ethereum/16543/test_set.json
    const putItemTestData = await s3.putObject({
      Bucket: NUMERICAL_S3_BUCKET,
      Key: `${symbol}/${timeStamp}/test_set.json`,
      Body: JSON.stringify(BodyTestData),
      ContentType: 'application/json'
    }).promise()

    // create a training_set in s3 numerical_data_set/ethereum/16543/training_set.json
    const putItemTrainingData = await s3.putObject({
      Bucket: NUMERICAL_S3_BUCKET,
      Key: `${symbol}/${timeStamp}/training_set.json`,
      Body: JSON.stringify(BodyTrainingData),
      ContentType: 'application/json'
    }).promise()

    console.log('Success, createBucketTrainingJob')
  }
}

async function createBucketPrediction(timeStampId, symbolId, latestTimeStamp) {
  let params = {
    TableName: 'CryptoPrices',
    KeyConditionExpression: 'CryptoSymbolID = :p_id AND PriceTimeStamp >= :c_id',
    ExpressionAttributeValues: {
      ':p_id': {
        S: symbolId
      },
      ':c_id': {
        N: latestTimeStamp
      }
    }
  }

  const cryptoItems = await db.query(params).promise()

  if (cryptoItems.Items.length >= 1) {
    const latestDate = getLatestDate(LATEST_DATE_ETH.toString());
    const target = getOHLCVAverage(cryptoItems.Items);

    const Body = {
      "instances": [{"start": latestDate,"target": target}],
      "configuration": {
        "num_samples": target.length,
        "output_types": [
          "mean",
          "quantiles",
          "samples"
        ],
        "quantiles": [
          "0.1",
          "0.9"
        ]
      }
    };

    const putPredictedItems = await s3.putObject({
      Bucket: PREDICTION_S3_BUCKET,
      Key: `${symbolId}/${latestTimeStamp}.json`,
      Body: JSON.stringify(Body),
      ContentType: 'application/json'
    }).promise()

    console.log('Success, in createBucketPrediction');
  }
}

exports.handler = async (event) => {
  const records = event.Records;
  for (const record of records) {
    const isInsert = record.eventName === 'INSERT'

    if (isInsert) {
      const cryptoPrices = record.dynamodb
      let symbolId = cryptoPrices.Keys.CryptoSymbolID.S;
      let timeStampId = cryptoPrices.Keys.PriceTimeStamp.N;

      // check if the priceStamp is March 7th at the latest date - or else we create S3 bucket for the future points.

      let futurePredictionBitcoin = symbolId == 'bitcoin' && timeStampId >= LATEST_DATE_BITCOIN;
      let futurePreductionEthereum = symbolId == 'ethereum' && timeStampId >= LATEST_DATE_ETH;

      if (futurePredictionBitcoin || futurePreductionEthereum) {
        const latestDate = symbolId == 'bitcoin' ? LATEST_DATE_BITCOIN : LATEST_DATE_ETH;
        return createBucketPrediction(timeStampId, symbolId, latestDate.toString());
      }
      else {
        // we call this function only if the date is March 7th and there is more data points that are added
        return createBucketTrainingJob(cryptoPrices.Keys.CryptoSymbolID, cryptoPrices.Keys.PriceTimeStamp);
      }
    }
  }
};
