import { DynamoDB, PutItemCommand, PutItemCommandInput, PutItemCommandOutput } from '@crypto-aws/client';
import {
  IHistoricalDataInput,
  S1FullCryptoName,
  S2FullCryptoName,
  S3FullCryptoName
} from '@crypto-api/db/src/global.types';
import {
  CoinAPIReturnHistoricalOHLCVData,
  CryptoCompareOHLCVResult,
  getHistoricalCoinAPIData,
  getHistoricalCryptoCompareOHLCVData, TimeUnit
} from '@crypto-api/db';
import { convertToUnixEpoch } from '@crypto-api/db/src/util.js';

const input = {
  time_start: '2022-02-10',
  time_end: '2022-02-11',
  limit: '10'
} as Pick<IHistoricalDataInput, 'time_end' | 'time_start' | 'limit'>;

type IOHLCV = {
  TimeStart?: string;
  TimeEnd?: string;

  Close?: string;
  High?: string;
  Open?: string;
  Low?: string;

  PriceHigh?: string;
  PriceOpen?: string;
  PriceClose?: string;
  VolumeTraded?: string;
}

const transformOHLCVData = (coinApi: CoinAPIReturnHistoricalOHLCVData[], coinCompare: CryptoCompareOHLCVResult) => {
  let ohlcvOuput = [];

  if (coinApi.length >= 1) {
    for (const coin of coinApi) {
      ohlcvOuput.push({
        coinApi: {
          PriceHigh: coin.price_high.toString(),
          TimeStart: coin.time_period_start.toString(),
          TimeEnd: coin.time_period_end.toString(),
          PriceOpen: coin.price_open.toString(),
          PriceClose: coin.price_close.toString(),
          VolumeTraded: coin.volume_traded.toString()
        } as IOHLCV
      });
    }

    if (coinCompare?.Data?.length >= 1) {
      for (const coin of coinCompare.Data) {
        ohlcvOuput.push({
          coinCompare: {
            TimeStart: coin.time.toString(),
            Close: coin.close.toString(),
            High: coin.high.toString(),
            Low: coin.low.toString(),
            Open: coin.open.toString()
          } as IOHLCV
        });
      }
    }
    return ohlcvOuput;
  }

};

export async function createTimestamp(client: DynamoDB, coinName: S1FullCryptoName, coinapi: S2FullCryptoName, coinCompare: S3FullCryptoName): Promise<PutItemCommandOutput | undefined> {
  const convertTime = convertToUnixEpoch(input.time_start);

  // [OHLCV Data]
  const ohlcvCoinApiData = await getHistoricalCoinAPIData({
    ...input,
    historical: 'OHLCV',
    symbol: { coinapi },
    period_id: '1HRS'
  });

  if ((ohlcvCoinApiData as { error: string })?.error?.length > 1) {
    throw Error(`Calling [ohlcvCoinApiData] issue: ${(ohlcvCoinApiData as { error: string })?.error}`);
  }

  const ohlcvCryptoCompare = await getHistoricalCryptoCompareOHLCVData({
    ...input,
    symbol: { coinCompare },
    // aggregate: '2'
  });

  if (ohlcvCryptoCompare?.Response === 'Error') {
    throw Error(`Calling [ohlcvCryptoCompare] issue: ${ohlcvCryptoCompare?.Message}`);
  }

  const ohlcv = transformOHLCVData((ohlcvCoinApiData as CoinAPIReturnHistoricalOHLCVData[]), ohlcvCryptoCompare);

  const data = JSON.stringify({
    ohlcv
  });

  const updateDbInput = {
    TableName: 'CryptoCurrency',
    Item: {
      PK: { S: `Crypto_${coinName}` },
      SK: { S: `TimeStamp_${convertTime.toString()}` },
      Data: { S: data }
    }
  } as PutItemCommandInput;

  const updateItemResult = await client.send(new PutItemCommand(updateDbInput));

  return Promise.all([ohlcvCoinApiData, ohlcvCryptoCompare, updateItemResult])
    .then((data) => {
      const [, , updateItemResultData] = data;
      // if updated item is successful
      if (updateItemResultData.$metadata.httpStatusCode == 200)
        console.log(`Successfully retrieved data: [${updateDbInput.Item.PK.S}]`);

      return updateItemResult;
    })
    .catch(err => {
      console.error(`Error [createTimestamp] - ${err}`);
      throw err;
    });
}