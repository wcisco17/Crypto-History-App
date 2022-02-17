import { IHistoricalDataInput } from './src/global.types.js';
export declare const convertToDate: (input: number) => string;
declare type DefaultInput = Pick<IHistoricalDataInput, 'time_start' | 'time_end' | 'limit'>;
export declare const defaultParameters: (params: IHistoricalDataInput) => DefaultInput;
export * from './src/numerical';
export * from './src/text-data';
export * from './src/dynamo-db.types';
export * from './src/text-data.types';
export * from './src/numerical.types';
//# sourceMappingURL=index.d.ts.map