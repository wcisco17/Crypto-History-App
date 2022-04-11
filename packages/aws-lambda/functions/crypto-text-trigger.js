const AWS = require("aws-sdk");

const comprehend = new AWS.Comprehend();
const dynamodb = new AWS.DynamoDB();

function getText(newsApiRes) {
  let Text;
  let CryptoSymbolID;
  let ArticleTimeStamp;

  for (const news of newsApiRes) {
    if (news.eventName === "INSERT") {
      const content = news.dynamodb.NewImage.Content.S;

      CryptoSymbolID = news.dynamodb.Keys.CryptoSymbolID.S;
      ArticleTimeStamp = news.dynamodb.Keys.ArticleTimeStamp.N;
      Text = content;
    }
  }

  let params = {
    LanguageCode: 'en',
    Text
  };

  return [params, CryptoSymbolID, ArticleTimeStamp];
}

function getSentimentScore(data) {
  let sentiment = data.Sentiment.toLowerCase();
  let itemKey = Object.keys(data.SentimentScore)
      .find(key => key.toLowerCase() === sentiment);

  return data.SentimentScore[itemKey];
}

function updateTable(CryptoSymbolID, ArticleTimeStamp, INFO) {
  const Sentiment = INFO.Sentiment;
  const SentimentScore = getSentimentScore(INFO);

  const params = {
    TableNamew: "CryptoNewsAnalysis",
    Item: {
      CryptoSymbolID: {
        S: CryptoSymbolID
      },
      ArticleTimeStamp: {
        N: ArticleTimeStamp.toString()
      },
      Sentiment: {
        S: Sentiment
      },
      SentimentScore: {
        N: SentimentScore.toString()
      }
    }
  };

  return dynamodb.putItem(params, (err, data) => {
    if (err) {
      return {
        statusCode: 404,
        body: `Error when calling [putItem] - reason ${err}`
      };
    }

    if (data) {
      return {
        statusCode: 200,
        body: JSON.stringify({
          success: true
        })
      };
    }
  }).promise();
}

exports.handler = (event, context) => {
  const newsApiRes = event.Records;

  // get the text from our dynamodb table destructure other data set
  const [params, CryptoSymbolID, ArticleTimeStamp] = getText(newsApiRes);

  comprehend.detectSentiment(params, (err, INFO) => {
    if (err) console.log("Error : ", err);

    if (INFO != null) {
      // update our CryptoNewsAnalysis table
      return updateTable(CryptoSymbolID, ArticleTimeStamp, INFO);
    }
  });
};
