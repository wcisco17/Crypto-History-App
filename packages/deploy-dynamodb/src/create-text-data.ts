import { convertToUnixEpoch } from '@crypto-api/db/src/util.js';
import { DynamoDB, PutItemCommand, PutItemCommandOutput } from '@crypto-aws/client';
import { getHistoricalCryptoCompareNewsData, getHistoricalNewsApiData } from '@crypto-api/db';
import { S1FullCryptoName, S3FullCryptoName } from '@crypto-api/db/src/global.types';

type INewsApiData = {
  id: number
  name: string
  content: string
  currencySymbol: string
  articalTimeStamp: number
}

export async function createTextData(client: DynamoDB, coinName: string, limit: string, date: string, hour: string, convertTime: number, coinCompare: S3FullCryptoName):
  Promise<any> {
  let newApiData: INewsApiData[] = [];

  const historicalNewsData = await getHistoricalNewsApiData({
    limit,
    time_start: date,
    time_end: '',
    symbol: { newsApi: coinName as S1FullCryptoName }
  });

  if (historicalNewsData.status == 'ok')
    for (const data of historicalNewsData.articles) {
      newApiData.push({
        id: convertToUnixEpoch(data.publishedAt.toString()),
        name: data.title,
        content: data.content,
        currencySymbol: coinName,
        articalTimeStamp: convertTime
      });
    }

  const cryptoCompareNewsData = await getHistoricalCryptoCompareNewsData({
    time_start: date,
    symbol: { coinCompare }
  });

  for (const data of cryptoCompareNewsData.Data) {
    newApiData.push({
      id: data.published_on,
      name: data.title,
      content: data.body,
      currencySymbol: coinName,
      articalTimeStamp: convertTime
    });
  }

  return newApiData.map(async data => {
    await client.send(new PutItemCommand({
      TableName: 'CryptoNewsAPI',
      Item: {
        CryptoSymbolID: { S: data.currencySymbol },
        ArticleTimeStamp: { N: convertTime.toString() },
        ArticleID: { S: data.id.toString() },
        Content: { S: data.content }
      }
    }));
  });
}