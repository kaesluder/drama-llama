import * as R from "ramda";

interface Feed {
  // Drama Llama internal fields
  // id: set by database
  _id?: string;
  // feedType: used to identify the parser used
  feedType: string;
  type: string;

  // feed meta-information
  title: string;
  link: string;
  description?: string;
  language?: string;
  pubDate?: number;
  generator?: string;
}

interface Item {
  // Drama Llama internal fields
  _id?: string;
  feedID?: string;
  type: string;

  // RSS fields

  title?: string; //	The title of the item.	Venice Film Festival Tries to Quit Sinking
  link?: string; // 	The URL of the item.	http://nytimes.com/2004/12/07FEST.html
  description?: string; //	The item synopsis.	<description>Some of the most heated chatter at the Venice Film Festival this week was about the way that the arrival of the stars at the Palazzo del Cinema was being staged.</description>
  author?: string; //	Email address of the author of the item. More.
  category?: string; //	Includes the item in one or more categories. More.
  guid?: string; //	A string that uniquely identifies the item. More.
  pubDate?: number; //	Indicates when the item was published. More.
  source?: string; //
}

const genFeedID = function (feed: Feed) {
  let title = "";
  if (feed.title) {
    title = R.toLower(R.replace(/\W+/g, "-", feed.title));
  } else {
    title = feed.link;
  }

  return `/feed/${title}`;
};

const genItemID = function (item: Item) {
  let title = item.title ?? "unknown-item-title";
  title = R.toLower(R.replace(/\W+/g, "-", title));
  return `/item${item.feedID}/${title}/${item.guid}`;
};

export { Feed, Item, genFeedID, genItemID };
