const AWS = require("aws-sdk");

const db = new AWS.DynamoDB();
const s3 = new AWS.S3();

async function getOriginalSytheticData() {
  let params = {
    Bucket: 'allsynthetic',
    Key: 'test_data.json'
  };
  const putObjects = await s3.getObject(params).promise();
  return putObjects.Body;
}

/**
 *
 * @return {Promise<Array<*> | null>}
 */
async function getConnectionIds() {
  /*** @type {Array<*> | null}*/
  let connectionIds;
  try {
    let params = { TableName: "WebsocketClients" };
    const connectionDB = await db.scan(params).promise();
    connectionIds = connectionDB.Items;
  } catch (err) {
    connectionIds = null;
  }

  return connectionIds;
}

/**
 *
 * @param id
 * @return {Promise<boolean>}
 */
async function deleteConnectionIds(id) {
  /** @type {boolean} **/
  let isDeleted = false;
  try {
    let params = {
      TableName: "WebsocketClients",
      Key: {
        ConnectionId: { S: id },
        SK: { S: "User" }
      }
    };

    const deleteIds = await db.deleteItem(params).promise();
    isDeleted = deleteIds.$response.ok;
  } catch (err) {
    isDeleted = false;
  }

  return isDeleted;
}

async function getCryptoInfo(query) {
  return (await db.query({ TableName: "CryptoCurrency", ...query })).promise();
}

/**
 * @param query  {{}}
 * @return {Promise<DynamoDB.QueryOutput & {$response: Response<DynamoDB.QueryOutput, Error & {code: string, message: string, retryable?: boolean, statusCode?: number, time: Date, hostname?: string, region?: string, retryDelay?: number, requestId?: string, extendedRequestId?: string, cfId?: string, originalError?: Error}>}>}
 */
async function getPrices(query) {
  return (await db.query({ TableName: "CryptoPrices", ...query }).promise());
}

/**
 *
 * @param query {{}}
 * @return {Promise<DynamoDB.QueryOutput & {$response: Response<DynamoDB.QueryOutput, Error & {code: string, message: string, retryable?: boolean, statusCode?: number, time: Date, hostname?: string, region?: string, retryDelay?: number, requestId?: string, extendedRequestId?: string, cfId?: string, originalError?: Error}>}>}
 */
async function getOrderbooks(query) {
  return (await db.query({ TableName: "CryptoOrderBooks", ...query })).promise();
}

/**
 *
 * @param query {{}}
 * @return {Promise<DynamoDB.QueryOutput & {$response: Response<DynamoDB.QueryOutput, Error & {code: string, message: string, retryable?: boolean, statusCode?: number, time: Date, hostname?: string, region?: string, retryDelay?: number, requestId?: string, extendedRequestId?: string, cfId?: string, originalError?: Error}>}>}
 */
async function getCryptoNewsAnalysis(query) {
  return (await db.query({ TableName: "CryptoNewsAnalysis", ...query })).promise();
}

/**
 *
 * @param query {{}}
 * @return {Promise<DynamoDB.QueryOutput & {$response: Response<DynamoDB.QueryOutput, Error & {code: string, message: string, retryable?: boolean, statusCode?: number, time: Date, hostname?: string, region?: string, retryDelay?: number, requestId?: string, extendedRequestId?: string, cfId?: string, originalError?: Error}>}>}
 */
async function getCryptoNews(query) {
  return (await db.query({ TableName: "CryptoNewsAPI", ...query })).promise();
}

/**
 *
 * @param s {string}
 * @return {Promise<DynamoDB.QueryOutput & {$response: Response<DynamoDB.QueryOutput, Error & {code: string, message: string, retryable?: boolean, statusCode?: number, time: Date, hostname?: string, region?: string, retryDelay?: number, requestId?: string, extendedRequestId?: string, cfId?: string, originalError?: Error}>}>}
 */
async function getSyntheticData(s) {
  let cryptoItems = ["ethereum-1646684400", "bitcoin-1646687000", "synthetic-1585166400"];
  let symbol = cryptoItems.find((items) => {
    let itemIdx = items.match("-").index + 1;
    let numericalValues = items.slice(itemIdx);
    return items === `${s}-${numericalValues}`;
  });

  return (await db.query({
    TableName: "CryptoPricesAnalysis",
    KeyConditionExpression: "CryptoSymbolID = :p_id",
    Limit: 2,
    ExpressionAttributeValues: {
      ":p_id": {
        "S": symbol
      }
    }
  })).promise();
}

exports.handler = async (event) => {
  const domainName = event.requestContext.domainName;
  const stage = event.requestContext.stage;
  /*** @type string*/
  const message = JSON.parse(event.body).message; //exp: get-crypto-prices-ethereum

  let response;

  if (message.length >= 17 && message.slice(0, 17) === "get-crypto-prices") {
    let symbol = message.slice(18);
    let query = {
      KeyConditionExpression: "CryptoSymbolID = :p_id",
      Limit: 2,
      ExpressionAttributeValues: {
        ":p_id": {
          "S": symbol
        }
      }
    };

    const currencyInfo = await getCryptoInfo(query);
    const priceItems = await getPrices(query);
    const orderbooksItems = await getOrderbooks(query);
    const syntheticItems = await getSyntheticData(symbol);
    const pureSyntheticData = await getSyntheticData("synthetic");
    const sentimentItems = await getCryptoNewsAnalysis(query);
    const cryptoItems = await getCryptoNews(query);
    const clientConnections = await getConnectionIds();
    const syntheticData = await getOriginalSytheticData();

    const postCalls = clientConnections != null && clientConnections.map(async clients => {
      let resultData = {};
      const connectionId = clients.ConnectionId.S;
      const [pr, or, syn, sen, cry, cur, pures] = [
        priceItems.$response.httpResponse,
        orderbooksItems.$response.httpResponse,
        syntheticItems.$response.httpResponse,
        sentimentItems.$response.httpResponse,
        cryptoItems.$response.httpResponse,
        currencyInfo.$response.httpResponse,
        pureSyntheticData.$response.httpResponse
      ];

      if (
        pr.statusCode !== 200 ||
        or.statusCode !== 200 ||
        syn.statusCode !== 200 ||
        sen.statusCode !== 200 ||
        cry.statusCode !== 200 ||
        cur.statusCode !== 200 ||
        pures.statusCode !== 200
      ) resultData = {};
      else resultData = {
        currencyInfo: [...currencyInfo.Items],
        prices: [...priceItems.Items],
        orderbooks: [...orderbooksItems.Items],
        syntheticData: [...syntheticItems.Items],
        sentimentAnalysis: [...sentimentItems.Items],
        newsAPI: [...cryptoItems.Items],
        pureSyntheticData: [...pureSyntheticData.Items],
        allSyntheticData: syntheticData.toString('utf-8')
      };

      let responseMessage = Object.keys(resultData).length > 0 ? resultData : "No data returned";

      const api = new AWS.ApiGatewayManagementApi({
        apiVersion: "2018-11-29",
        endpoint: `${domainName}/${stage}`
      });

      const params = {
        ConnectionId: connectionId,
        Data: JSON.stringify(responseMessage)
      };

      await api.postToConnection(params).promise();
    });

    try {
      response = {
        statusCode: 200,
        body: JSON.stringify(`Successfully postedCall`)
      };
      await Promise.all(postCalls);
    } catch (e) {
      console.log({
        Error: `Reason: ${e}`
      });
      response = {
        statusCode: 500,
        body: JSON.stringify(`Error Reason: ${e}`)
      };

      clientConnections.map(async clients => {
        const connectionId = clients.ConnectionId.S;
        const isDelete = await deleteConnectionIds(connectionId);
        if (isDelete) console.info(`Successfully delete connectionId`);
      });
    }
  } else {
    response = {
      statusCode: 500,
      body: JSON.stringify(`Please include the [get-crypto-prices]`)
    };
  }

  return response;
};










