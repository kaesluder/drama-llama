import { describe, expect, test } from "@jest/globals";
import { convertDate, itemBuilder, parseRSS, parseRSSItems } from "./rssParser";
import { readFileSync } from "fs";
import { Feed, Item, genFeedID, genItemID } from "./feedDataClasses";
import * as R from "ramda";

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

  test("functionalParse", () => {
    const parsed: Feed = parseRSS(EXAMPLE_RSS);
    expect(R.prop("title")(parsed)).toBe("Liftoff News");
    expect(R.prop("pubDate")(parsed)).toBe(1055217600000);
  });

  test("construct new Item", () => {
    const testItem = {
      title: "title",
      link: "http://example.com",
      description: "A test feed",
      author: "a test author",
      pubDate: "Mon, 04 Nov 1985 19:53:20 EST",
    };
    const parsed: Item = itemBuilder("test", testItem);
    expect(parsed.title).toBe("title");
  });

  test("itemBuilder constructs random uuid for empty guid", () => {
    const testItem = {
      title: "title",
      link: "http://example.com",
      description: "A test feed",
      author: "a test author",
      pubDate: "Mon, 04 Nov 1985 19:53:20 EST",
    };
    const parsed: Item = itemBuilder("test", testItem);
    expect(parsed.guid).toMatch(
      /^[a-f0-9]{8,}-[a-f0-9]{4,}-[a-f0-9]{4,}-[a-f0-9]{4,}-[a-f0-9]{12,}/
    );
  });

  test("extract list of items from xml string", () => {
    const items = parseRSSItems(EXAMPLE_RSS);
    expect(items[0].title).toBe("Star City");
    expect(items.length).toBe(4);
    expect(items[0].feedID).toBe("/feed/liftoff-news");
    expect(items[0].type).toBe("item");
  });

  test("test generation of feed id from title", () => {
    const parsed = parseRSS(EXAMPLE_RSS);
    expect(genFeedID(parsed)).toBe("/feed/liftoff-news");
  });

  test("test generation of feed id: unknown title", () => {
    // @ts-ignore
    const parsed: Feed = { feedType: "RSS", link: "https://www.example.com/" };
    expect(genFeedID(parsed)).toBe("/feed/https://www.example.com/");
  });
  test("extract list of items from xml string", () => {
    const items = parseRSSItems(EXAMPLE_RSS);
    expect(genItemID(items[0])).toBe(
      "/item/liftoff-news/star-city/http://liftoff.msfc.nasa.gov/2003/06/03.html#item573"
    );
    console.log(items.map(genItemID));
  });
});
