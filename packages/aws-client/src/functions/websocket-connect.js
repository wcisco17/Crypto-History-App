const AWS = require("aws-sdk");

const dynamodb = new AWS.DynamoDB();

exports.handler = async (event) => {
  let connectionId = event.requestContext.connectionId;
  let response;

  let params = {
    TableName: "WebsocketClients",
    Item: {
      ConnectionId: { S: connectionId },
      SK: { S: "User" }
    }
  };

  try {
    await dynamodb.putItem(params).promise();
    response = {
      statusCode: 200,
      body: JSON.stringify(`Successfully Connected with Id: ${connectionId}`)
    };

  } catch (err) {
    console.error(
      `[Error]: `, err
    );
    response = {
      statusCode: 500,
      Body: JSON.stringify(`Internal Server Error - Reason: ${err}`)
    };
  }

  return response;
};
