export function getFileManager(less: LessStatic): AliasFileManagerContruct {
  const FileManager = less.FileManager;

  class AliasFileManager extends FileManager {
    constructor(public options: SerializedOptions) {
      super();
      this.options = options;
    }

    renameFile(filename: string) {
      const { aliasList } = this.options;
      const alias = aliasList.find((item) => filename.startsWith(item.prefix));

      if (alias) {
        const { prefix, replaceText } = alias;
        filename = `${replaceText}${filename.substring(prefix.length)}`;
      }

      return filename;
    }

    loadFile(
      filename: string,
      currentDirectory: string,
      options: Less.LoadFileOptions,
      environment: Less.Environment,
    ): Promise<Less.FileLoadResult> {
      return super.loadFile(this.renameFile(filename), currentDirectory, options, environment);
    }

    loadFileSync(
      filename: string,
      currentDirectory: string,
      options: Less.LoadFileOptions,
      environment: Less.Environment,
    ): Less.FileLoadResult | Less.FileLoadError {
      return super.loadFileSync(this.renameFile(filename), currentDirectory, options, environment);
    }
  }

  return AliasFileManager;
}
