import { DynamoDB, PutItemCommand, PutItemCommandInput, PutItemCommandOutput } from '@crypto-aws/client';
import { CoinMarketCapApiReturnType, CoinMarketCapResult, getLatestCoinMarketCapCryptoQuote } from '@crypto-api/db';
import { S1FullCryptoName } from '@crypto-api/db/src/global.types';

export async function createCryptoItem(client: DynamoDB, coinName: S1FullCryptoName): Promise<PutItemCommandOutput | undefined> {
  let cryptoCoin: unknown = await getLatestCoinMarketCapCryptoQuote({
    symbol: {
      coinmarketcap: coinName
    }
  });

  if ((cryptoCoin as Pick<CoinMarketCapResult, 'status'>).status?.error_message.length >= 1) {
    throw new Error(`Reason: ${(cryptoCoin as Pick<CoinMarketCapResult, 'status'>).status?.error_message}`);
  }

  let cryptoCoinExist = (cryptoCoin as CoinMarketCapApiReturnType);

  const data = {
    Name: { S: cryptoCoinExist.name },
    Slug: { S: cryptoCoinExist.slug },
    CurrentPrice: { S: cryptoCoinExist.quote.USD.price.toString() },
    PercentChange30d: { S: cryptoCoinExist.quote.USD.percent_change_30d.toString() },
    LastUpdated: { S: cryptoCoinExist.last_updated.toString() }
  };

  const input = {
    TableName: 'CryptoCurrency',
    Item: {
      CryptoSymbolID: { S: coinName },
      SK: { S: 'Profile' },
      ...data
    }
  } as PutItemCommandInput;

  const putItemResult = await client.send(new PutItemCommand(input));

  return Promise.all([cryptoCoin, putItemResult])
    .then((data) => {
      const [coinMarketCapData, putItemData] = data;
      if ((coinMarketCapData as CoinMarketCapApiReturnType).id) {
        console.log(`Successfully retrieved data: [${cryptoCoinExist.name}]`);
      }

      if (putItemData?.$metadata.httpStatusCode == 200) {
        console.log(`Successfully added item in ${input.TableName}`);
      }
      return putItemData;
    })
    .catch(err => {
      console.error(`Error in [createCryptoItem] reason: `, JSON.stringify(err));
      throw err;
    });
}