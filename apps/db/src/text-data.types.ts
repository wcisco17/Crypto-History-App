/*
    @api - NewsAPI article
 */

export interface Source {
  id?: any;
  name: string;
}

export interface Article {
  source: Source;
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: Date;
  content: string;
}

export interface NewsAPIReturn {
  status: string;
  totalResults: number;
  articles: Article[];
}

/*
   @api - CryptoCompare News article Result Types
 */

export interface SourceInfo {
  name: string;
  lang: string;
  img: string;
}

export interface CryptoCompareNewsData {
  id: string;
  guid: string;
  published_on: number;
  imageurl: string;
  title: string;
  url: string;
  source: string;
  body: string;
  tags: string;
  categories: string;
  upvotes: string;
  downvotes: string;
  lang: string;
  source_info: SourceInfo;
}

export interface RateLimit {
}

export interface CryptoCompareNewsResult {
  Type: number;
  Message: string;
  Promoted: any[];
  Data: CryptoCompareNewsData[];
  RateLimit: RateLimit;
  HasWarning: boolean;
}

