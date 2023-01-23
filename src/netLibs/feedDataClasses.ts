class Feed {
  // Drama Llama internal fields
  id: number = undefined;
  // feedType: used to identify the parser used
  feedType: string = undefined;

  // feed meta-information
  title: string = undefined;
  link: string = undefined;
  description: string = undefined;
  language: string = undefined;
  pubDate: number = undefined;
  generator: string = undefined;
}

export { Feed };
