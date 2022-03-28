export type ReturnTypeAPI<T> = {}

export type S1FullCryptoName = 'bitcoin' | 'xrp' | 'dogecoin' | 'ethereum' | 'bch' | 'polygon' | 'tether'
export type S2FullCryptoName = 'BITSTAMP_SPOT_BTC_USD' | 'BITSTAMP_SPOT_XRP_USD' | 'BITSTAMP_SPOT_DOGE_USD' | 'BITSTAMP_SPOT_ETH_USD'
    | 'BITSTAMP_SPOT_BCH_USD'
    | 'BITSTAMP_SPOT_TETHER_USD'
    | 'BITSTAMP_SPOT_POLYGON_USD'
export type S3FullCryptoName = 'BTC' | 'XRP' | 'DOGE' | 'ETH' | 'BCH' | 'MATIC' | 'TETHER' | 'POLYGON'

export interface Symbols {
  newsApi?: S1FullCryptoName
  coinmarketcap?: S1FullCryptoName
  coinapi?: S2FullCryptoName
  coinCompare?: S3FullCryptoName
}

export interface IHistoricalDataInput {
  symbol: Symbols
  limit: string;
  time_start: string;
  time_end: string;
}