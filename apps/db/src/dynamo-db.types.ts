/*
    DYNAMO-DB TABLE (TYPES)
 */
import {
  CoinAPIReturnHistoricalOHLCVData,
  CoinAPIReturnHistoricalOrdersBookData,
  CoinMarketCapApiReturnType,
  USD
} from './numerical.types';
import { Article } from './text-data.types';

type CryptoCurrencyInfo = Pick<CoinMarketCapApiReturnType,
  'id' |
  'name' |
  'symbol' |
  'slug' |
  'circulating_supply' |
  'max_supply' |
  'date_added'> & CurrencyQuote

type CurrencyQuote = {
  quote: {
    USD: Pick<USD,
      'price' |
      'percent_change_24h' |
      'last_updated'>
  }
}

type OrderBook = Pick<CoinAPIReturnHistoricalOrdersBookData,
  'symbol_id' |
  'time_exchange' |
  'time_coinapi' |
  'asks' |
  'bids'>

type DailyPairOHLCV = Pick<CoinAPIReturnHistoricalOHLCVData,
  'time_open' |
  'time_close' |
  'price_open' |
  'price_close' |
  'trades_count'>

type Articles = Pick<Article,
  'title' |
  'description' |
  'content'>

/*
- partition key
  - symboly string
  - sortkey timestamp
  - price

 text data
    - symbol
    - timestamp
    - text
 */

type CryptoCurrency = {
  info: CryptoCurrencyInfo & {
    logo: string;
  };
  numerical: {
    order_book: OrderBook[]
    daily_pair_ochlcv: DailyPairOHLCV[]
  }
  text_data: {
    articles: Articles[]
  }
}