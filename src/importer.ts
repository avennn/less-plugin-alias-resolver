export function getFileManager(less: LessStatic): AliasFileManagerContruct {
  const FileManager = less.FileManager;

  class AliasFileManager extends FileManager {
    options: Options;

    constructor(options: Options) {
      super();
      this.options = options;
    }

    renameFile(filename: string) {
      const { alias } = this.options;
      const prefixes = Object.keys(alias)
        .filter((key) => filename.startsWith(key))
        .sort((a, b) => b.length - a.length);

      if (prefixes.length) {
        const prefix = prefixes[0];
        const replaceText = alias[prefix];
        console.log('====???', filename.substring(prefix.length), replaceText, prefix);
        filename = replaceText + filename.substring(prefix.length);
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
