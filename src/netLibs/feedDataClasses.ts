interface Feed {
  // Drama Llama internal fields
  // id: set by database
  id?: number;
  // feedType: used to identify the parser used
  feedType: string;

  // feed meta-information
  title: string;
  link: string;
  description?: string;
  language?: string;
  pubDate?: number;
  generator?: string;
}

export { Feed };
