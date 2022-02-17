import fetch from 'cross-fetch';
import { CRYPTO_COMPARE_KEY, CRYPTO_COMPARE_URL, NEW_API_ORG_KEY, NEWS_API_ORG_URL } from "./constant.js";
import {  IHistoricalDataInput } from "./global.types.js";
import { CryptoCompareNewsResult, NewsAPIReturn } from "./text-data.types.js";
import { convertToUnixEpoch } from "./util.js";

/*
  @api - News API Historical Data
 */

export async function getHistoricalNewsApiData({ time_end, time_start, limit, symbol }: IHistoricalDataInput): Promise<NewsAPIReturn> {
  // page size 20 is the default
  const url = `${NEWS_API_ORG_URL}?q=${symbol.newsApi}&pageSize=${limit}&from=${time_start}&to=${time_end}&sortBy=popularity`;
  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "X-Api-Key": NEW_API_ORG_KEY as string
      }
    });

    const data: unknown = await res.json();

    return (data as NewsAPIReturn);
  } catch (e) {
    throw new Error(`[News_API Failed] - Failed ${e}`);
  }
}

/*
  @api - Crypto Compare GET Request (Getting the historical Latest News Data)
 */

type CryptoCompareNewsInput = Pick<IHistoricalDataInput, 'time_start' | 'symbol'>

export async function getHistoricalCryptoCompareNewsData({ time_start, symbol }: CryptoCompareNewsInput): Promise<CryptoCompareNewsResult> {
  const time = convertToUnixEpoch(time_start).toString();
  try {
    const url = `${CRYPTO_COMPARE_URL}/data/v2/news/?feeds=cryptocompare,cointelegraph,coindesk&?lang=EN&lTs=${time}&categories=${symbol.coinCompare}`
    const newsData = await fetch(url, {
      method: 'GET',
      headers: {
        authorization: `Apikey ${CRYPTO_COMPARE_KEY as string}`
      }
    });

    const data: unknown = await newsData.json();

    return (data as CryptoCompareNewsResult)
  } catch (e) {
    throw new Error(`[Crypto_Compare Failed] - Failed ${e}`)
  }
}
