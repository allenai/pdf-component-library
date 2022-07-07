import { BoundingBoxType } from '@allenai/pdf-components';

interface TokenType {
  bbox: BoundingBoxType[]
  text: string[]
}
export interface ResultType {
    tokens: TokenType[];
    score: number;
}
export interface DataType {
  query: {
    tokens: TokenType[];
    score: null;
  }
  results: ResultType[];
}

import data from './2201.12091.json';

export default data as DataType[];
