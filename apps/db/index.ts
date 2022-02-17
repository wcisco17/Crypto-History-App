import dotenv from 'dotenv';
import { IHistoricalDataInput } from './src/global.types.js';
import moment from 'moment';

dotenv.config();

export const convertToDate = (input: number) =>
  moment.unix(input).format('YYYY-MM-DD');

type DefaultInput = Pick<IHistoricalDataInput, 'time_start' | 'time_end' | 'limit'>;
export const defaultParameters = (params: IHistoricalDataInput): DefaultInput => ({
    ...params
})

export * from './src/numerical';
export * from './src/text-data';
export * from './src/dynamo-db.types';
export * from './src/text-data.types';
export * from './src/numerical.types';


