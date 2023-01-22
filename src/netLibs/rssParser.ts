import Axios from "axios";
import { XMLParser } from "fast-xml-parser";

function sum(a: number, b: number) {
  return a + b;
}

function parseRSS(xmlData: string) {
  const parser = new XMLParser();
  return parser.parse(xmlData).rss.channel;
}

export { sum, parseRSS };
