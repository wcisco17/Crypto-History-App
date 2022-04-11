const AWS = require("aws-sdk");

const dynamodb = new AWS.DynamoDB();

exports.handler = async (event) => {
  let connectionId = event.requestContext.connectionId;
  let response;

  let params = {
    TableName: "WebsocketClients",
    Key: {
      ConnectionId: { S: connectionId },
      SK: { S: "User" }
    }
  };

  try {
    await dynamodb.deleteItem(params).promise();
    response = {
      statusCode: 200,
      body: JSON.stringify(`Successfully Connected with Id: ${connectionId}`)
    };
  } catch (err) {
    console.error(
      `[Error] Reason`, err
    );

    response = {
      statusCode: 200,
      body: JSON.stringify(`Successfully Connected with Id: ${connectionId}`)
    };
  }

  return response;
};
