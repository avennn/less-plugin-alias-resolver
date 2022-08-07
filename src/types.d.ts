declare namespace Less {
  interface Visitor {
    isReplacing: boolean;
  }

  class PluginManager {
    constructor(less: LessStatic);

    addPreProcessor(preProcessor: PreProcessor, priority?: number): void;

    addFileManager(fileManager: FileManager): void;

    addVisitor(visitor: Visitor): void;
  }
}

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

interface AliasResolverFileManagerContruct {
  new (options: SerializedOptions): Less.FileManager;
}

interface AliasResolverUrlManagerContruct {
  new (options: SerializedOptions): Less.Visitor;
}
