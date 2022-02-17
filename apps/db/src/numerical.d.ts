import type { CoinMarketCapApiReturnType, CoinMarketCapResult, CryptoCompareOHLCVResult, TypeofHistoricalData } from './numerical.types.js';
import { IHistoricalDataInput } from './global.types.js';
declare type CoinApiInput = IHistoricalDataInput & TypeofHistoricalData;
export declare function getHistoricalCoinAPIData<T>({ symbol, limit, time_start, historical, time_end, period_id }: CoinApiInput): Promise<T[] | {
    error: string;
}>;
declare type CoinMarketCapInput = Pick<IHistoricalDataInput, 'symbol'>;
export declare function getLatestCoinMarketCapCryptoQuote({ symbol }: CoinMarketCapInput): Promise<CoinMarketCapApiReturnType | undefined | Pick<CoinMarketCapResult, 'status'>>;
declare type CryptoCompareInput = Pick<IHistoricalDataInput, 'symbol' | 'time_start' | 'limit'> & {
    aggregate?: string;
    aggregatePredictableTimePeriods?: string;
};
export declare function getHistoricalCryptoCompareOHLCVData({ symbol, limit, aggregate, time_start }: CryptoCompareInput): Promise<CryptoCompareOHLCVResult>;
export {};
//# sourceMappingURL=numerical.d.ts.map