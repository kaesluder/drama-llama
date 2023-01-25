import { XMLParser } from "fast-xml-parser";
import { DateTime as Luxon } from "luxon";
import * as R from "ramda";
import { Feed, genFeedID, Item } from "./feedDataClasses";
import { randomUUID } from "crypto";

/**
 * convertDate returns unix millisecond date from RFC2822-formatted
 * message date.
 *
 * Returns NaN if pubDate can't be parsed
 * @param {string} stringDate
 */
const convertDate = function (stringDate: string): number {
  return Luxon.fromRFC2822(stringDate).valueOf();
};

/**
 * parseRSS converts rss xml into an object representing contents
 *
 * @param {string} xmlData
 * returns JS object representing everything under <channel>
 */
const parseRSS = function (xmlData: string): Feed {
  const parser = new XMLParser();
  const rawXML = parser.parse(xmlData).rss.channel;
  const properties: string[] = [
    "title",
    "link",
    "description",
    "language",
    "generator",
  ];

  // build a new feed object
  // pickAll: copy all fields in the list, properties
  // assoc: set the feedType to RSS
  // timestamp: convert RFC2822 date to unix milliseconds
  const timestamp = R.assoc("pubDate", convertDate(R.prop("pubDate", rawXML)));
  const transformerPipe = R.pipe(
    R.pickAll(properties),
    R.assoc("feedType", "RSS"),
    timestamp
  );
  return transformerPipe(rawXML) as Feed;
};

/**
 * parseRSSItems converts rss xml into a list of Item objects.
 *
 * @param {string} xmlData
 * returns JS object representing everything under <channel>
 */
const parseRSSItems = function (xmlData: string): Item[] {
  const feed: Feed = parseRSS(xmlData);
  const feedID: string = genFeedID(feed);
  const parser = new XMLParser();
  const rawItems = parser.parse(xmlData).rss.channel.item;
  return rawItems.map(R.partial(itemBuilder, [feedID]));
};

/**
 * itemBuilder creates an Item object from JS object. Returns data as Item.
 * Converts pubDate to unix timestamp and creates a random UUID for
 * empty GUID.
 *
 * @param rawItem
 */
const itemBuilder = function (feedID: string, rawItem: object): Item {
  const properties = ["title", "link", "description", "author"];
  const timestamp = R.assoc("pubDate", convertDate(R.prop("pubDate", rawItem)));
  const guid = R.assoc("guid", R.or(R.prop("guid", rawItem), randomUUID()));
  // TODO: refactor with R.mergeLeft
  const transformerPipe = R.pipe(
    R.pickAll(properties),
    timestamp,
    guid,
    R.assoc("feedID", feedID),
    R.assoc("type", "item")
  );

  return transformerPipe(rawItem) as Item;
};

export { parseRSS, convertDate, parseRSSItems, itemBuilder };
