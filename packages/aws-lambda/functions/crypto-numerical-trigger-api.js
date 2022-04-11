const AWS = require("aws-sdk");

const db = new AWS.DynamoDB();

exports.handler = async (event, p) => {
  let response;

  const params = {
    TableName: "CryptoCurrency",
  };

  const getItems = await db.scan(params, (err, data) => {
    if (err) {
      response = {
        statusCode: 404,
        body: JSON.stringify(`Error [getItems] Reason: ${err}`)
      };
    }

    if (data) {
      response = {
        statusCode: 200,
        body: JSON.stringify(data.Items)
      };
    }
  }).promise()

  return response;
};
