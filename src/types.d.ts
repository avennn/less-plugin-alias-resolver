interface Options {
  prefix?: string;
  external?: string;
  alias?: Record<string, string>;
}

interface SerializedAlias {
  prefix: string;
  replaceText: string;
}

interface SerializedOptions {
  // with priority, the 1st has highest priority
  aliasList: SerializedAlias[];
}

interface AliasFileManagerContruct {
  new (options: SerializedOptions): Less.FileManager;
}
