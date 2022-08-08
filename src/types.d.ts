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
