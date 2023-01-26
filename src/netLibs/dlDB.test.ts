import { Feed, Item } from './feedDataClasses';
import * as R from 'ramda';
import {
  mergeWithPartial,
  saveFeed,
  saveItems,
  database,
  getAllDocs,
  updateRecord,
} from './dlDB';
import { readFileSync } from 'fs';
import { convertDate, itemBuilder, parseRSS, parseRSSItems } from './rssParser';

const EXAMPLE_RSS = readFileSync('test-data/rss2sample.xml').toString();

describe('Testing of pouchdb.', () => {
  test('test put feed metadata', async () => {
    const parsed = parseRSS(EXAMPLE_RSS);
    await saveFeed(parsed).catch((r) => console.log(r));
  });
  test('test put feed items', async () => {
    const parsed = parseRSSItems(EXAMPLE_RSS);
    await saveItems(parsed);
  });

  test('test get', async () => {
    await getAllDocs().then((r) => console.log(r.rows));
    await database.get('/feed/liftoff-news').then((r) => console.log(r));
  });

  test('merge with partial', () => {
    const A = { a: 1, b: 2, c: 3 };
    const B = { c: 30, d: 40, e: 50 };
    const C = mergeWithPartial(A, B);
    expect(C).toMatchObject({ a: 1, b: 2, c: 30, d: 40, e: 50 });
  });

  test('test record update', async () => {
    const testPartial = { _id: '/feed/liftoff-news', testString: 'testing' };
    updateRecord(testPartial);
    await new Promise((r) => setTimeout(r, 500));
  });
});
