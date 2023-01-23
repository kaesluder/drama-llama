import { XMLParser } from "fast-xml-parser";
import { DateTime as Luxon } from "luxon";
import * as R from "ramda";
import { Feed } from "./feedDataClasses";

const convertDate = function (isoDate: string) {
  return Luxon.fromISO(isoDate).valueOf();
};

/**
 * parseRSS converts rss xml into an object representing contents
 *
 * @param {string} xmlData
 * returns JS object representing everything under <channel>
 */
function parseRSS(xmlData: string) {
  const parser = new XMLParser();
  const rawXML = parser.parse(xmlData).rss.channel;
  const feedData = new Feed();
  feedData.feedType = "rss";
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
}

export { parseRSS };
