export type ReturnTypeAPI<T> = {}

type S1 = 'bitcoin' | 'xrp' | 'dogecoin' | 'ethereum'
type S2 = 'BITSTAMP_SPOT_BTC_USD' | 'BITSTAMP_SPOT_XRP_USD' | 'BITSTAMP_SPOT_DOGE_USD' | 'BITSTAMP_SPOT_ETH_USD'
type S3 = 'BTC' | 'XRP' | 'DOGE' | 'ETH'

export interface Symbols {
  newsApi?: S1
  coinmarketcap?: S1
  coinapi?: S2
  coinCompare?: S3
}

export interface IHistoricalDataInput {
  symbol: Symbols
  limit: string;
  time_start: string;
  time_end: string;
}