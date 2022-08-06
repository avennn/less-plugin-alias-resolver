import { resolve } from 'path';

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
        const subPath = filename.substring(prefix.length);
        filename = resolve(replaceText, subPath.startsWith('/') ? `.${subPath}` : subPath);
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
