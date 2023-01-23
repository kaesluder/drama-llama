import { describe, expect, test } from "@jest/globals";
import { parseRSS } from "./rssParser";
import { readFileSync } from "fs";
import { Feed } from "./feedDataClasses";

const EXAMPLE_RSS = readFileSync("test-data/rss2sample.xml").toString();

describe("Testing parsing of rss from text string and creation of feed and item objects.", () => {
  test("reads title from example", () => {
    const parsed = parseRSS(EXAMPLE_RSS);
    expect(parsed.title).toBe("Liftoff News");
  });

  test("construct new Feed", () => {
    const testFeed = new Feed();
    // expect(testFeed.title).toBe("Liftoff News");
    console.log(testFeed);
  });
});
