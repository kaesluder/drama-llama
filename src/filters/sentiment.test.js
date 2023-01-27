import { stemmer, sentiment } from './sentiment';

describe('testing the sentiment filter', () => {
  test('test stemming', () => {
    const tokenized = stemmer("how now brown cows how nice to see y'all");
    expect(tokenized).toStrictEqual(['brown', 'cow', 'nice']);
  });

  test('test sentiment', () => {
    const result = sentiment(
      'how now brown cow, nice to see all of you lovely people'
    );
    expect(result).toBeGreaterThan(0);
  });
});
