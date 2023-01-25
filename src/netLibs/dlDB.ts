import PouchDB from "pouchdb";
import { Feed, Item } from "./feedDataClasses";
import * as R from "ramda";

const DB_DIR = "/tmp/dldbtest";

const database = new PouchDB(DB_DIR);

const saveFeed = function (feed: Feed) {
  const id = feed.title;
  return database.put(R.assoc("_id", id, feed));
};

const getAllDocs = function () {
  return database.allDocs({ include_docs: true });
};

export { saveFeed, getAllDocs, database };
