const AWS = require("aws-sdk");

const db = new AWS.DynamoDB();

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


/**
 *
 * @param message {string}
 * @return {Promise<Array<*>|null>}
 */
async function getCryptoCurrencies(message) {
  /*** @type {Array<*> | null}*/
  let cryptos;
  if (message === "get-crypto-currencies") {
    try {
      const params = { TableName: "CryptoCurrency" };
      const cryptoCurrencies = await db.scan(params).promise();
      cryptos = cryptoCurrencies.Items;
    } catch (err) {
      cryptos = null;
    }
  }

  return cryptos;
}

exports.handler = async (event) => {
  const domainName = event.requestContext.domainName;
  const stage = event.requestContext.stage;
  const message = JSON.parse(event.body).message;

  let cryptoItems = await getCryptoCurrencies(message);

  let response;
  const clientConnections = await getConnectionIds();

  const postCalls = clientConnections != null && clientConnections.map(async clients => {
    const connectionId = clients.ConnectionId.S;

    /*** @type {Array<*> | string} */
    let responseMessage = cryptoItems != null ? cryptoItems : "No data returned";
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
    }

    await Promise.all(postCalls);
  } catch (e) {
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

  return response;
};
