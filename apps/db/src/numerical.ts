import {
  CoinMarketCapApiReturnType,
  CoinMarketCapResult,
  CryptoCompareOHLCVResult,
  LIMIT,
  TimeUnit,
  TypeofHistoricalData
} from '../types/numerical';
import { COIN_MARKET_CAP_KEY, COIN_MARKET_URL, CRYPTO_COMPARE_KEY, CRYPTO_COMPARE_URL } from '../util/constant';
import fetch from 'node-fetch';
import { IHistoricalDataInput } from '../types/global';
import { convertToUnixEpoch } from '../util/util';
import dotenv from 'dotenv';

dotenv.config();

/*
  @api - Coin API GET Request
 */
type CoinApiInput = IHistoricalDataInput & TypeofHistoricalData

export async function getHistoricalCoinAPIData<T>({ symbol, limit, time_start, historical, time_end, period_id }: CoinApiInput): Promise<T[]> {
  const nums = (Number(limit) + Number(LIMIT));
  const period = period_id![TimeUnit.MONTH] ? period_id![TimeUnit.MONTH] : period_id![TimeUnit.YEAR]
  const isOHLCV = historical == 'OHLCV' ? `&period_id=${period}` : '';

  const HISTORICAL_URL = `https:rest.coinapi.io/v1/${historical}/${symbol.coinapi}/history?time_start=${time_start}&time_end=${time_end}&limit=${nums}${isOHLCV}`;
  try {
    const request = await fetch(HISTORICAL_URL, {
      method: "GET",
      headers: { 'X-CoinAPI-Key': process.env.COIN_API_KEY as string }
    });
    let data: unknown = (await request.json());

    return (data as T[])
  } catch (e) {
    throw new Error(`[COIN_API FAILED] - Cause: ${e}`);
  }
}

/*
  @api - Coin MarketCap GET Request
  @description getting the latest price of a given exchange
 */

type CoinMarketCapInput = Pick<IHistoricalDataInput, 'symbol'>

export async function getLatestCoinMarketCapCryptoQuote({ symbol }: CoinMarketCapInput): Promise<CoinMarketCapApiReturnType | undefined> {
  const url = `${COIN_MARKET_URL}?slug=${symbol.coinmarketcap}`
  try {
    const request = await fetch(url, {
      method: "GET",
      headers: {
        'X-CMC_PRO_API_KEY': COIN_MARKET_CAP_KEY as string
      }
    })

    let currency: unknown = await request.json();
    if (currency) {
      const id: string = Object.keys((currency as CoinMarketCapResult).data).toString()
      return ((currency as CoinMarketCapResult).data[id])
    }

  } catch (e) {
    throw new Error(`[COIN_MARKET_CAP Failed] - Cause: ${e}`)
  }
}

/*
  @api - Crypto Compare GET Request (Getting the historical OHLCV Data)
 */

type CryptoCompareInput = Pick<IHistoricalDataInput, 'symbol' | 'time_start' | 'limit'> & {
  aggregate?: string
  aggregatePredictableTimePeriods?: string
}

export async function getHistoricalCryptoCompareOHLCVData({ symbol, limit, aggregate, time_start }: CryptoCompareInput): Promise<CryptoCompareOHLCVResult> {
  // convert time to unit
  const time = convertToUnixEpoch(time_start).toString();

  const url = `${CRYPTO_COMPARE_URL}/data/index/histo/underlying/day?market=CCMVDA&base=${symbol.coinCompare}&quote=USD&limit=${limit}&aggregate=${aggregate}&=toTs=${time}`
  try {
    const ohlcvData = await fetch(url, {
      headers: {
        authorization: `Apikey ${CRYPTO_COMPARE_KEY as string}`
      }
    })

    const data: unknown = await ohlcvData.json();

    return (data as CryptoCompareOHLCVResult)
  } catch (e) {
    throw new Error(`[Crypto_Compare Failed] - Cause ${e}`)
  }
}












