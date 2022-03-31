export interface InternalServerErro {
  message: string;
  connectionId: string
  requestId: string
}

export interface CryptoSymbolID {
  S: string;
}

export interface PercentChange30d {
  S: string;
}

export interface LastUpdated {
  S: Date;
}

export interface CurrentPrice {
  S: string;
}

export interface Slug {
  S: string;
}

export interface SK {
  S: string;
}

export interface Name {
  S: string;
}

export interface CryptoSymbolTableDB {
  CryptoSymbolID: CryptoSymbolID;
  PercentChange30d: PercentChange30d;
  LastUpdated: LastUpdated;
  CurrentPrice: CurrentPrice;
  Slug: Slug;
  SK: SK;
  Name: Name;
}

  export interface CryptoSymbolID {
    S: string;
  }

  export interface PercentChange30d {
    S: string;
  }

  export interface LastUpdated {
    S: Date;
  }

  export interface CurrentPrice {
    S: string;
  }

  export interface Slug {
    S: string;
  }

  export interface SK {
    S: string;
  }

  export interface Name {
    S: string;
  }

  export interface CurrencyInfo {
    CryptoSymbolID: CryptoSymbolID;
    PercentChange30d: PercentChange30d;
    LastUpdated: LastUpdated;
    CurrentPrice: CurrentPrice;
    Slug: Slug;
    SK: SK;
    Name: Name;
  }

  export interface Close {
    N: string;
  }

  export interface CryptoSymbolID2 {
    S: string;
  }

  export interface Low {
    N: string;
  }

  export interface High {
    N: string;
  }

  export interface DataType {
    S: string;
  }

  export interface TimeStamp {
    N: string;
  }

  export interface Open {
    N: string;
  }

  export interface PriceTimeStamp {
    N: string;
  }

  export interface Price {
    Close: Close;
    CryptoSymbolID: CryptoSymbolID2;
    Low: Low;
    High: High;
    DataType: DataType;
    TimeStamp: TimeStamp;
    Open: Open;
    PriceTimeStamp: PriceTimeStamp;
  }

  export interface CryptoSymbolID3 {
    S: string;
  }

  export interface AsksSize {
    N: string;
  }

  export interface DataType2 {
    S: string;
  }

  export interface AsksPrice {
    N: string;
  }

  export interface BidPrice {
    N: string;
  }

  export interface BidSize {
    N: string;
  }

  export interface PriceTimeStamp2 {
    N: string;
  }

  export interface Orderbook {
    CryptoSymbolID: CryptoSymbolID3;
    AsksSize: AsksSize;
    DataType: DataType2;
    AsksPrice: AsksPrice;
    BidPrice: BidPrice;
    BidSize: BidSize;
    PriceTimeStamp: PriceTimeStamp2;
  }

  export interface CryptoSymbolID4 {
    S: string;
  }

  export interface QuantilesZeroOne {
    N: string;
  }

  export interface Mean {
    N: string;
  }

  export interface ID {
    N: string;
  }

  export interface QuantilesZeroNine {
    N: string;
  }

  export interface SyntheticData {
    CryptoSymbolID: CryptoSymbolID4;
    QuantilesZeroOne: QuantilesZeroOne;
    Mean: Mean;
    ID: ID;
    QuantilesZeroNine: QuantilesZeroNine;
  }

  export interface SentimentScore {
    N: string;
  }

  export interface CryptoSymbolID5 {
    S: string;
  }

  export interface Sentiment {
    S: string;
  }

  export interface ArticleTimeStamp {
    N: string;
  }

  export interface SentimentAnalysi {
    SentimentScore: SentimentScore;
    CryptoSymbolID: CryptoSymbolID5;
    Sentiment: Sentiment;
    ArticleTimeStamp: ArticleTimeStamp;
  }

  export interface CryptoSymbolID6 {
    S: string;
  }

  export interface Content {
    S: string;
  }

  export interface ArticleTimeStamp2 {
    N: string;
  }

  export interface ArticleID {
    S: string;
  }

  export interface NewsAPI {
    CryptoSymbolID: CryptoSymbolID6;
    Content: Content;
    ArticleTimeStamp: ArticleTimeStamp2;
    ArticleID: ArticleID;
  }

  export interface CryptoDataResult {
    currencyInfo: CurrencyInfo[];
    prices: Price[];
    orderbooks: Orderbook[];
    syntheticData: SyntheticData[];
    sentimentAnalysis: SentimentAnalysi[];
    newsAPI: NewsAPI[];
    pureSyntheticData: SyntheticData[]
    allSyntheticData: string
  }

  export interface AllSyntheticData {
    start: string;
    target: number[]
  }


