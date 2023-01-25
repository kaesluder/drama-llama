import PouchDB from "pouchdb";
import { Feed, Item } from "./feedDataClasses";
import * as R from "ramda";

const database = new PouchDB("testDB");

const saveFeed = function (feed: Feed) {
  const id = feed.title;
  return database.put(R.assoc("_id", id, feed));
};

const getAllDocs = function () {
  return database.allDocs({ include_docs: true });
};

export { saveFeed, getAllDocs, database };
