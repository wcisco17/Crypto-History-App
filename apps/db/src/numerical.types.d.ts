export interface CoinAPIReturnHistoricalTradesData {
    symbol_id: string;
    time_exchange: Date;
    time_coinapi: Date;
    uuid: string;
    price: number;
    size: number;
    taker_side: string;
}
export interface CoinAPIReturnHistoricalOrdersBookData {
    symbol_id: string;
    time_exchange: Date;
    time_coinapi: Date;
    asks: Ask[];
    bids: Bid[];
}
export interface Ask {
    price: number;
    size: number;
}
export interface Bid {
    price: number;
    size: number;
}
export declare enum TimeUnit {
    MONTH = "MONTH",
    YEAR = "YEAR",
    DAY = "DAY"
}
declare type MONTH = '1MTH' | '2MTH' | '3MTH' | '4MTH';
declare type YEAR = '1YRS' | '2YRS' | '3YRS' | '4YRS';
declare type DAY = '1DAY' | '2DAY' | '3DAY' | '5DAY' | '7DAY' | '10DAY';
declare type HOUR = '1HRS' | '2HRS' | '3HRS' | '4HRS' | '6HRS' | '8HRS' | '12HRS';
declare type MINUTE = '1MIN' | '2MIN' | '3MIN' | '4MIN' | '5MIN' | '6MIN' | '20MIN' | '30MIN';
export declare type TypeofHistoricalData = {
    historical: 'orderbooks' | 'trades' | 'OHLCV';
    period_id?: DAY | MONTH | YEAR | HOUR | MINUTE;
};
export interface CoinAPIReturnHistoricalOHLCVData {
    time_period_start: Date;
    time_period_end: Date;
    time_open: Date;
    time_close: Date;
    price_open: number;
    price_high: number;
    price_low: number;
    price_close: number;
    volume_traded: number;
    trades_count: number;
}
export declare const LIMIT: "20";
export interface USD {
    price: number;
    volume_24h: number;
    volume_change_24h: number;
    percent_change_1h: number;
    percent_change_24h: number;
    percent_change_7d: number;
    percent_change_30d: number;
    market_cap: number;
    market_cap_dominance: number;
    fully_diluted_market_cap: number;
    last_updated: Date;
}
export interface Quote {
    USD: USD;
}
export interface CoinMarketCapApiReturnType {
    id: number;
    name: string;
    symbol: string;
    slug: string;
    is_active: number;
    is_fiat: number;
    circulating_supply: number;
    total_supply: number;
    max_supply: number;
    date_added: Date;
    num_market_pairs: number;
    cmc_rank: number;
    last_updated: Date;
    tags: string[];
    platform?: any;
    quote: Quote;
}
export interface Status {
    timestamp: Date;
    error_code: number;
    error_message: string;
    elapsed: number;
    credit_count: number;
}
export declare type CoinMarketCapData = {
    [key: string]: CoinMarketCapApiReturnType;
};
export interface CoinMarketCapResult {
    data: CoinMarketCapData;
    status: Status;
}
export interface Datum {
    time: number;
    high: number;
    low: number;
    open: number;
    volumefrom: number;
    volumeto: number;
    close: number;
    conversionType: string;
    conversionSymbol: string;
}
export interface CryptoCompareOHLCVData {
    Aggregated: boolean;
    TimeFrom: number;
    TimeTo: number;
    Data: Datum[];
}
export interface CryptoCompareOHLCVResult {
    Response: string;
    Message: string;
    HasWarning: boolean;
    Type: number;
    RateLimit: {};
    Data: Datum[];
}
export {};
//# sourceMappingURL=numerical.types.d.ts.map