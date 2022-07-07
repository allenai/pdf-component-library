import { RawCitation } from '../types/citations';
import data, { ResultType } from './2201.12091';
import levenshtein from 'js-levenshtein';


export const samplePdfUrl = 'https://arxiv.org/pdf/2201.12091.pdf';
export const samplePdfSha = 'c17d4dc311d6187709b2971ab99b855f53a12608';

export const rawAnnotations: RawCitation[] = data.map(item => ({
    referenceText: item.query.tokens[0].text[0],
    mentions: [{ boundingBoxes: item.query.tokens[0].bbox }]
}));

const indexedQueries: string[] = [];
const results: {[key: string]: ResultType[]} = {};

data.forEach(item => {
  item.query.tokens.forEach(token => {
    token.text.forEach(key => {
      indexedQueries.push(key);
      results[key] = item.results;
    });
  });
});

Object.keys(results).forEach(key => results[key].sort((a,b) => b.score - a.score));

function distance(key0: string, key1: string) {
    return levenshtein(key0, key1);
}
export const query = (key: string): ResultType[] => {
    if (key in results) {
        return results[key];
    }
    if (indexedQueries.length === 0) {
        return [];
    }
    const distances = indexedQueries.map(key0 => distance(key0, key));
    let bestIndex = 0;
    let bestDistance = distances[0];
    distances.forEach((dist, index) => {
        if (dist <= bestDistance) {
            bestDistance = dist;
            bestIndex = index;
        }
    })
    
    return results[indexedQueries[bestIndex]];
}

export default { rawAnnotations, samplePdfUrl, query };
