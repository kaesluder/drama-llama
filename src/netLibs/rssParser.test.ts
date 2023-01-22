import {describe, expect, test} from '@jest/globals';
import {sum, parseRSS} from './rssParser';
import {readFileSync} from 'fs';


const EXAMPLE_RSS = readFileSync('test-data/rss2sample.xml').toString()

describe('sum module', () => {
    test('adds 1 + 2 to equal 3', () => {
        expect(sum(1, 2)).toBe(3);
    });

    test('reads title from example', () => {
        const parsed = parseRSS(EXAMPLE_RSS);
        expect(parsed.item.length).toBe(4);
        expect(parsed.item[0].title).toBe('Star City');
        expect(parsed.title).toBe('Liftoff News');
    });

});