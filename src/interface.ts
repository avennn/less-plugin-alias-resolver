export interface Options {
  prefix?: string;
  external?: string;
  alias?: Record<string, string>;
}

export interface SerializedAlias {
  prefix: string;
  replaceText: string;
}

export interface SerializedOptions {
  // with priority, the 1st has highest priority
  aliasList: SerializedAlias[];
}

export interface AliasResolverFileManagerContruct {
  new (options: SerializedOptions): Less.FileManager;
}

export interface AliasResolverUrlManagerContruct {
  new (options: SerializedOptions): Less.Visitor;
}
