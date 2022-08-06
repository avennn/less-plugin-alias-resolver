interface Options {
  alias: Record<string, string>;
}

interface AliasFileManagerContruct {
  new (options: Options): Less.FileManager;
}
