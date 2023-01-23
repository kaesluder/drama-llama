import { XMLParser } from "fast-xml-parser";
import { DateTime as Luxon } from "luxon";
import * as R from "ramda";
import { Feed } from "./feedDataClasses";

/**
 * convertDate returns unix millisecond date from RFC2822-formatted
 * message date.
 *
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
  const feedData = new Feed();
  feedData.feedType = "RSS";
  feedData.pubDate = convertDate(rawXML.pubDate);
  const properties: string[] = [
    "title",
    "link",
    "description",
    "language",
    "generator",
  ];
  properties.map((p: string) => Reflect.set(feedData, p, rawXML[p]));
  return feedData;
};

const functionalParseRSS = function (xmlData: string) {
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
  // pickAll: copy all fields in properties
  // assoc: set the feedType to RSS
  // timestamp: convert RFC2822 date to unix milliseconds
  const timestamp = R.assoc("pubDate", convertDate(R.prop("pubDate", rawXML)));
  const transformerPipe = R.pipe(
    R.pickAll(properties),
    R.assoc("feedType", "RSS"),
    timestamp
  );
  return <Feed>transformerPipe(rawXML);
};

export { parseRSS, convertDate, functionalParseRSS };
