// this function talks to sagemaker and triggers an update to make a prediction. We make a prediction
// based upon the previous data and the current.
const AWS = require("aws-sdk");

// aws-sdk
const sagemaker = new AWS.SageMakerRuntime();
const s3 = new AWS.S3();
const db = new AWS.DynamoDB();

// supported symbol
const endpointEthereum = "ethereum-numerical-endpoint";
const endpointBitcoin = "bitcoin-numerical-endpoint";
const endpointSynthetic = "synthetic-endpoint";

function coinSwitch(coin) {
  let endpoint;
  switch (coin) {
    case "ethereum":
      endpoint = endpointEthereum;
      break;
    case "bitcoin":
      endpoint = endpointBitcoin;
      break;
    case "synthetic":
      endpoint = endpointSynthetic;
      break;
    default:
      endpoint = "not-found";
  }

  return endpoint;
}

/***
 *
 * @param bucketName {string}
 * @param bucketPath {string}
 * @return {Promise<{body: string, statusCode: number}>}
 */
async function getPredictionsFromS3Bucket(bucketName, bucketPath) {
  const coin = bucketPath.slice(0, bucketPath.match("/").index);
  const timeStampId = bucketPath.slice((bucketPath.match("/").index + 1)).replace(".json", "");

  const cryptoCurrencyEndpoint = coinSwitch(coin);

  let response;
  let result;
  let transformed;

  const params = {
    Bucket: bucketName,
    Key: bucketPath
  };

  const getItem = await s3.getObject(params, async (err, data) => {
    if (err) throw new Error(`[getBucket] Reason: ${err}`);
    if (data) result = JSON.parse(data.Body.toString("utf-8"));
  }).promise();

  const requiredNumOfSamples = result.configuration.num_samples >= 50;
  if (requiredNumOfSamples) {
    let paramsEndpoint = {
      EndpointName: cryptoCurrencyEndpoint,
      Body: JSON.stringify(result),
      ContentType: "application/json",
      Accept: "application/json"
    };

    const createEndpoint = await sagemaker.invokeEndpoint(paramsEndpoint, (err, data) => {
      if (err) {
        response = {
          statusCode: 500,
          body: JSON.stringify(`Error: Reason ${err}`)
        };
      }
      if (data) {
        /***
         *
         * @type {{
         *   predictions: [
         *     {
         *       mean: number[],
         *       quantiles: { 0.1: number[], 0.9: number[] },
         *       samples: number[][]
         *     }
         *   ]
         * }}
         */
        let transformedData = JSON.parse(data.Body.toString("utf-8"));
        transformed = transformedData.predictions[0];
      }
    }).promise();
    let updated = [];
    for (let i = 0; i < transformed.mean.length; i++) {
      let mean = transformed.mean[i];
      let quantilesZERO_NINE = transformed.quantiles["0.9"][i];
      let quantilesZERO_ONE = transformed.quantiles["0.1"][i];

      const cryptoParam = {
        TableName: "CryptoPricesAnalysis",
        Item: {
          CryptoSymbolID: { S: `${coin}-${timeStampId}` },
          ID: { N: i.toString() + Number(timeStampId).toString() },
          Mean: { N: mean.toString() },
          QuantilesZeroNine: { N: quantilesZERO_NINE.toString() },
          QuantilesZeroOne: { N: quantilesZERO_ONE.toString() }
        }
      };
      updated.push(cryptoParam);
    }

    for (const update of updated) {
      const updatePriceAnalysisTable = await db.putItem(update, (err, data) => {
        if (err) {
          response = {
            statusCode: 500,
            body: JSON.stringify(`Error: Reason ${err}`)
          };
        }

        if (data) {
          response = {
            statusCode: 200,
            body: JSON.stringify(`Success adding table items!`)
          };
        }
      }).promise();
    }

  }
  else {
    response = {
      statusCode: 404,
      body: JSON.stringify("Not enough samples for data set.")
    };
  }

  console.log(response);
  return response;
}

exports.handler = async (event) => {
  const records = event.Records;

  for (const record of records) {
    const isInsert = record.eventName === "ObjectCreated:Put";

    if (isInsert) {
      const bucketPath = record.s3.object.key;
      const bucketName = record.s3.bucket.name;

      const data = await getPredictionsFromS3Bucket(bucketName, bucketPath);
    }
  }
};
