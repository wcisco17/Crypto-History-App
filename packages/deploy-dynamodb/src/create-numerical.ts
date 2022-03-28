import { DynamoDB, PutItemCommand } from '@crypto-aws/client';
import { S1FullCryptoName, S2FullCryptoName, S3FullCryptoName } from '@crypto-api/db/src/global.types';
import {
  CoinAPIReturnHistoricalQuotesData,
  getHistoricalCoinAPIData,
  getHistoricalCryptoCompareOHLCVData
} from '@crypto-api/db';

type ICreateNumerical = { client: DynamoDB, coinName: S1FullCryptoName, coinapi: S2FullCryptoName, coinCompare: S3FullCryptoName, limit: string, time: string, hour: string, convertTime: number }

export async function createNumerical({
  client,
  coinName,
  coinapi,
  coinCompare,
  limit,
  time,
  hour,
  convertTime
}: ICreateNumerical) {

  const orderbooks: CoinAPIReturnHistoricalQuotesData[] | { error: string } = await getHistoricalCoinAPIData({
    limit,
    time_start: time,
    time_end: '',
    symbol: { coinapi },
    historical: 'quotes'
  });
  if ((orderbooks as { error: string }).error?.length >= 1) throw Error(`[orderbooks] ${(orderbooks as { error: string }).error}`);
  else
    (orderbooks as CoinAPIReturnHistoricalQuotesData[]).map(async orderbook => {
        await client.send(new PutItemCommand({
          TableName: 'CryptoOrderBooks',
          Item: {
            CryptoSymbolID: { S: coinName },
            PriceTimeStamp: { N: convertTime.toString() },
            BidSize: { N: orderbook.bid_size.toString() },
            BidPrice: { N: orderbook.bid_price.toString() },
            AsksSize: { N: orderbook.ask_size.toString() },
            AsksPrice: { N: orderbook.ask_price.toString() },
            DataType: { S: 'orderbooks' }
          }
        }));
      }
    );

  const ohlcvCryptoCompare = await getHistoricalCryptoCompareOHLCVData({
    limit,
    time_start: convertTime.toString(),
    symbol: { coinCompare }
  });
  if (ohlcvCryptoCompare?.Message?.length >= 1) throw new Error(`[ohlcvCryptoCompare] ${ohlcvCryptoCompare?.Message}`);
  else
    // Get OHLCV Data from Crypto Compare
  {
    ohlcvCryptoCompare.Data.map(async coin => {
      await client.send(new PutItemCommand({
          TableName: 'CryptoPrices',
          Item: {
            CryptoSymbolID: { S: coinName },
            PriceTimeStamp: { N: convertTime.toString() },
            TimeStamp: { N: coin.time.toString() },
            Close: { N: coin.close.toString() },
            High: { N: coin.high.toString() },
            Low: { N: coin.low.toString() },
            Open: { N: coin.open.toString() },
            DataType: { S: 'ohlcv' }
          }
        })
      );
    });
  }
}