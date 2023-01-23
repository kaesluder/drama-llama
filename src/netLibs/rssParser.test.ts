import { describe, expect, test } from "@jest/globals";
import { convertDate, parseRSS } from "./rssParser";
import { readFileSync } from "fs";
import { Feed } from "./feedDataClasses";

const EXAMPLE_RSS = readFileSync("test-data/rss2sample.xml").toString();

describe("Testing parsing of rss from text string and creation of feed and item objects.", () => {
  test("convertDate returns numeric unix time", () => {
    const rfc2822 = "Mon, 04 Nov 1985 19:53:20 EST";
    const unixDate = 500000000000;
    const result = convertDate(rfc2822);
    expect(result).toBe(unixDate);
  });

  test("reads title from example", () => {
    const parsed = parseRSS(EXAMPLE_RSS);
    expect(parsed.title).toBe("Liftoff News");
  });

  test("construct new Feed", () => {
    const testFeed = parseRSS(EXAMPLE_RSS);
    expect(testFeed.feedType).toBe("RSS");
  });
});
