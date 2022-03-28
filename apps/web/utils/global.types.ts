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
