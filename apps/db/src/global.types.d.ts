export declare type ReturnTypeAPI<T> = {};
export declare type S1FullCryptoName = 'bitcoin' | 'xrp' | 'dogecoin' | 'ethereum';
export declare type S2FullCryptoName = 'BITSTAMP_SPOT_BTC_USD' | 'BITSTAMP_SPOT_XRP_USD' | 'BITSTAMP_SPOT_DOGE_USD' | 'BITSTAMP_SPOT_ETH_USD';
export declare type S3FullCryptoName = 'BTC' | 'XRP' | 'DOGE' | 'ETH';
export interface Symbols {
    newsApi?: S1FullCryptoName;
    coinmarketcap?: S1FullCryptoName;
    coinapi?: S2FullCryptoName;
    coinCompare?: S3FullCryptoName;
}
export interface IHistoricalDataInput {
    symbol: Symbols;
    limit: string;
    time_start: string;
    time_end: string;
}
//# sourceMappingURL=global.types.d.ts.map