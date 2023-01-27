import { PorterStemmer, SentimentAnalyzer, WordTokenizer } from 'natural';
import * as R from 'ramda';

const stemmer = function (text) {
  return PorterStemmer.tokenizeAndStem(text);
};

const sentiment = function (text) {
  const analyzer = new SentimentAnalyzer('English', PorterStemmer, 'afinn');
  const tokenizer = new WordTokenizer();
  return analyzer.getSentiment(tokenizer.tokenize(text));
};

export { stemmer, sentiment };
