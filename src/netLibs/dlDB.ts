import PouchDB from "pouchdb";
import { Feed, Item, genItemID, genFeedID } from "./feedDataClasses";
import * as R from "ramda";

const DB_DIR = "/tmp/dldbtest";

const database = new PouchDB(DB_DIR);

const handleError = function (err: object) {
  console.log(R.pickAll(["status", "name", "conflict", "id", "docId"])(err));
};

const handleBulkError = function (errList: object[]) {
  errList.map(handleError);
};

const saveFeed = function (feed: Feed) {
  const id = genFeedID(feed);
  return database.put(R.assoc("_id", id, feed)).catch(handleError);
};

const saveItems = function (itemList: Item[]) {
  const mapFun = (i: Item) => R.assoc("_id", genItemID(i))(i);
  return database
    .bulkDocs(itemList.map(mapFun))
    .then(function (err) {
      console.log("then");
      handleBulkError(err);
    })
    .catch(function (err) {
      console.log(err);
    });
};

const getAllDocs = function () {
  return database.allDocs({ include_docs: true });
};

export { saveFeed, getAllDocs, saveItems, database };
