import type {
  CoinMarketCapApiReturnType,
  CoinMarketCapResult,
  CryptoCompareOHLCVResult,
  TypeofHistoricalData
} from './numerical.types.js';
import { LIMIT, TimeUnit } from './numerical.types';
import { COIN_MARKET_CAP_KEY, CRYPTO_COMPARE_KEY, CRYPTO_COMPARE_URL, COIN_API_KEY } from './constant.js';
import fetch from 'cross-fetch';
import { IHistoricalDataInput } from './global.types.js';
import { convertToUnixEpoch } from './util.js';
import dotenv from 'dotenv';

dotenv.config();

/*
  @api - Coin API GET Request
 */
type CoinApiInput = IHistoricalDataInput & TypeofHistoricalData

export async function getHistoricalCoinAPIData<T>({
  symbol,
  limit,
  time_start,
  historical,
  time_end,
  period_id
}: CoinApiInput): Promise<T[] | { error: string }> {

  const HISTORICAL_URL = `https://rest.coinapi.io/v1/${historical}/${symbol.coinapi}/history?time_start=${time_start}&limit=${limit}`;
  try {
    const request = await fetch(HISTORICAL_URL, {
      method: 'GET',
      headers: { 'X-CoinAPI-Key': COIN_API_KEY as string }
    });

    let data;

    if (request.status === 500) {
      data = { error: request.statusText };
      console.log(request);
      return data;
    } else {

      let data: unknown = (await request.json());
      if ((data as { error: string }).error?.length >= 1)
        data = { error: (data as { error: string }).error };

      return (data as T[]);
    }
  } catch (e) {
    throw new Error(`[COIN_API FAILED] - Cause: ${e}`);
  }
}

/*
  @api - Coin MarketCap GET Request
  @description getting the latest price of a given exchange
 */

type CoinMarketCapInput = Pick<IHistoricalDataInput, 'symbol'>

export async function getLatestCoinMarketCapCryptoQuote({ symbol }: CoinMarketCapInput): Promise<CoinMarketCapApiReturnType | undefined | Pick<CoinMarketCapResult, 'status'>> {
  const url = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?slug=${symbol.coinmarketcap}`;
  try {
    const request = await fetch(url, {
      method: 'GET',
      headers: {
        'X-CMC_PRO_API_KEY': process.env.COIN_MARKET_CAP_KEY as string
      }
    });

    let currency: unknown = await request.json();

    // Catch error within the API
    if (((currency as Pick<CoinMarketCapResult, 'status'>).status.error_code) === 1001) {
      return (currency as Pick<CoinMarketCapResult, 'status'>);
    } else {
      const id: string = Object.keys((currency as Pick<CoinMarketCapResult, 'data'>).data).toString();
      return ((currency as CoinMarketCapResult).data[id]);
    }
    // [Internal issue with the function]
  } catch (e) {
    throw new Error(`[COIN_MARKET_CAP Failed] - Cause: ${e}`);
  }
}

/*
  @api - Crypto Compare GET Request (Getting the historical OHLCV Data)
 */

type CryptoCompareInput = Pick<IHistoricalDataInput, 'symbol' | 'time_start' | 'limit'> & {
  aggregate?: string
  aggregatePredictableTimePeriods?: string
}

export async function getHistoricalCryptoCompareOHLCVData({
  symbol,
  limit,
  aggregate,
  time_start
}: CryptoCompareInput): Promise<CryptoCompareOHLCVResult> {
  // convert time to unit
  const isAggregate = aggregate!?.length >= 1 ? `&aggregate${aggregate}` : '';
  const url = `${CRYPTO_COMPARE_URL}/data/index/histo/underlying/day?market=CCMVDA&base=${symbol.coinCompare}&quote=USD&limit=${limit}&=toTs=${time_start}${isAggregate}`;
  try {
    const ohlcvData = await fetch(url, {
      headers: {
        authorization: `Apikey ${CRYPTO_COMPARE_KEY as string}`
      }
    });

    const data: unknown = await ohlcvData.json();

    return (data as CryptoCompareOHLCVResult);
  } catch (e) {
    throw new Error(`[Crypto_Compare Failed] - Cause ${e}`);
  }
}









