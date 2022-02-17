import { IHistoricalDataInput } from "./global.types.js";
import { CryptoCompareNewsResult, NewsAPIReturn } from "./text-data.types.js";
export declare function getHistoricalNewsApiData({ time_end, time_start, limit, symbol }: IHistoricalDataInput): Promise<NewsAPIReturn>;
declare type CryptoCompareNewsInput = Pick<IHistoricalDataInput, 'time_start' | 'symbol'>;
export declare function getHistoricalCryptoCompareNewsData({ time_start, symbol }: CryptoCompareNewsInput): Promise<CryptoCompareNewsResult>;
export {};
//# sourceMappingURL=text-data.d.ts.map