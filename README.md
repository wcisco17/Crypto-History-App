# Crypto-History Web app (University Project)

### Course: CST3130 Advanced Web Development with Big Data

Crypto-history is a web app that pulls numerical and text data from external API's on specific crypto-currencies. Our cloud architecture consists of different parts, DynamoDB, S3, Sagemaker, lambda, and API gateway. The architecture diagram is shown below like so

### Architecture
![Screen Shot 2022-04-11 at 2 39 06 PM](https://user-images.githubusercontent.com/35783824/162807175-2ec529f7-a982-4ce7-983e-0fdef9fb1558.png)

## Description

Our external APIs, prices, news, and synthetic come from different sources. Our price data comes from CoinAPI and Coin-compare, the news comes from the news API, and the synthetic data is provided by us students individually. The first step in the diagram showcases a script in crypto-history-app/packages/deploy- dynamodb/src/index.ts; this is our entry program where we get all of our data from the external APIs. When we run the prompt, we must specify the coin data we're pulling; for example, it will give us a choice between Bitcoin, Ethereum, or xrp; after that, we must choose the date we'd like to pull from, then the data is removed and pushed to dynamo DB.


• The other parts of our deployment are our synthetic data located in crypto- history-app/packages/deploy-s3/src/deploy-syntheticdata.ts in our codebase for reference pull and store our data in a file. Once held, we split it by 30%
and push it to S3 (This is the purple in our diagram). After our data is prepared and ready in S3, we train our model, and when our model is ready to go, it triggers a lambda function crypto-history-app/packages/aws- lambda/functions/crypto-numerical-prediction.js located here to predict using our endpoint. In the end, we update the prices-prediction table with our other predictions.
On the other side, when we deploy our price and news data to DynamoDB, it creates many tables depending on the amount you've configured, and two separate triggers are enacted below


• `crypto-history-app/packages/aws-lambda/functions/crypto-numerical- trigger.js` - This file will grab all of the items inside our dynamo DB CrytoPrices table and send it over to an s3 bucket which will hold our data for our machine learning model. We'll then use the data we've transformed and trained the model using Sagemaker. After we've prepared the model, we'll use the endpoint from Sagemaker and trigger a function to update our prices prediction table.

• `crypto-history-app/packages/aws-lambda/functions/crypto-text-trigger.js` This file will trigger if there is an update inside the CryptoNews table and train a model for sentiment analysis using comprehend to detect sentiment for a particular text. Finally, it will update our sentiment analysis table.
On the other side of our diagram, we have another command line pointing to our static resources, which uploads it to S3 and serves the website from our bucket. When a user visits the page, we begin our WebSocket connection trigger, which gets our database's current crypto prices data. The trigger is located here for reference crypto-history-app/packages/aws-lambda/functions/websocket- cryptocurrencies.js. When the user clicks on a specific coin, it updates our action and message (which we persist with local storage). It triggers the crypto-history- app/packages/aws-lambda/functions/websocket-cryptocurrencies-prices.js function, which pushes our data to the client (I set the limit to 150 data points because of a limiting issue in our API).

## Machine learning on our Numerical data

The machine learning algorithm we used for our numerical data is DeepAR, and we used 500 points for our test files and took 30% for our training file. We created a separate S3 bucket once we hit 500 points; this was our “unseen” data. The data points are separated per minute; we then pulled 50+ unseen data points to test our prediction. Unfortunately, it did not give us an accurate forecast. We also ran into an issue plotting our numerical prediction. Nonetheless, we had no trouble plotting our synthetic and numerical data, but effectively, the orange is our “prediction” when zoomed in.


## Website Screenshot
![Screen Shot 2022-04-11 at 2 43 23 PM](https://user-images.githubusercontent.com/35783824/162807834-ce9ee505-85de-4949-830b-7c5a59620918.png)
![Screen Shot 2022-04-11 at 2 43 49 PM](https://user-images.githubusercontent.com/35783824/162807907-22039c3d-7293-4540-9070-d558898ad07a.png)
![Screen Shot 2022-04-11 at 2 44 02 PM](https://user-images.githubusercontent.com/35783824/162807940-5166a036-0c5a-4c42-b38b-d427d4b28842.png)

## Codebase Architecture

- `crypto-history-app/apps`- Contains anything that talks to the client our pulls data.
    - `apps/db` - Communicates with our API endpoint to fetch our data.
    - `apps/web` - Our main frontend.
- `crypto-history-app/packages` - Contains all of aws work
    - `packages/aws-client` - Contains our main aws-clients this package is used to simplify our imports.
    - `packages/aws-lambda` - Contains all of our lambda functions.
    - `packages/deploy-dynamodb` - Pulls data from our `crypto-history- app/apps/db`  and pushes it in each specific table.
    - `packages/deploy-s3` This file deploys our website and our synthetic data.
    - `packages/aws-data/s3`
        - `packages/aws-data/s3/allsynthetic` - Contains the result from our synthetic training.
        - `packages/aws-data/s3/numericaldataset` - Contains the result from our numerical training per coin.
        - `packages/aws-data/s3/predicteddataset`- Contains all of the prediction made by our end-point.
