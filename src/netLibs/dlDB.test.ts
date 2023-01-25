import { Feed, Item } from "./feedDataClasses";
import * as R from "ramda";
import { saveFeed, database, getAllDocs } from "./dlDB";
import { readFileSync } from "fs";
import { convertDate, itemBuilder, parseRSS, parseRSSItems } from "./rssParser";

const EXAMPLE_RSS = readFileSync("test-data/rss2sample.xml").toString();

describe("Testing of pouchdb.", () => {
  test("test put", async () => {
    const parsed = parseRSS(EXAMPLE_RSS);
    await saveFeed(parsed).catch((r) => console.log(r));
  });
  test("test get", async () => {
    await getAllDocs().then((r) => console.log(r.rows[0]));
    await database.get("Liftoff News").then((r) => console.log(r));
  });
});
