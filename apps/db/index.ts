import dotenv from 'dotenv';
import moment from 'moment';

dotenv.config({
    path: '.env.local'
});

export const convertToDate = (input: number) =>
  moment.unix(input).format('YYYY-MM-DD');

export * from './src/numerical';
export * from './src/text-data';
export * from './src/dynamo-db.types';
export * from './src/text-data.types';
export * from './src/numerical.types';


