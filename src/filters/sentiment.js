import { PorterStemmer, SentimentAnalyzer, WordTokenizer } from 'natural';
import * as R from 'ramda';

const stemmer = function (text) {
  return PorterStemmer.tokenizeAndStem(text);
};

/**
 * sentiment analyzes text and returns a score between -1 and 1
 *
 *
 * @param {string} text
 * @returns {int} score (between -1 and 1)
 */
const sentiment = function (text) {
  const analyzer = new SentimentAnalyzer('English', PorterStemmer, 'afinn');
  const tokenizer = new WordTokenizer();
  return analyzer.getSentiment(tokenizer.tokenize(text));
};

export { stemmer, sentiment };
