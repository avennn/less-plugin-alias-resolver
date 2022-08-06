export function getFileManager(less: LessStatic): AliasFileManagerContruct {
  const FileManager = less.FileManager;

  class AliasFileManager extends FileManager {
    options: Options;

    constructor(options: Options) {
      super();
      this.options = options;
    }

    supports(
      filename: string,
      currentDirectory: string,
      options: Less.LoadFileOptions,
      environment: Less.Environment,
    ): boolean {
      return super.supports(filename, currentDirectory, options, environment);
    }

    supportsSync(
      filename: string,
      currentDirectory: string,
      options: Less.LoadFileOptions,
      environment: Less.Environment,
    ): boolean {
      return super.supportsSync(filename, currentDirectory, options, environment);
    }

    loadFile(
      filename: string,
      currentDirectory: string,
      options: Less.LoadFileOptions,
      environment: Less.Environment,
    ): Promise<Less.FileLoadResult> {
      return super.loadFile(filename, currentDirectory, options, environment);
    }
    loadFileSync(
      filename: string,
      currentDirectory: string,
      options: Less.LoadFileOptions,
      environment: Less.Environment,
    ): Less.FileLoadResult | Less.FileLoadError {
      return super.loadFileSync(filename, currentDirectory, options, environment);
    }
    getPath(filename: string): string {
      return super.getPath(filename);
    }
    tryAppendLessExtension(filename: string): string {
      return super.tryAppendLessExtension(filename);
    }
    alwaysMakePathsAbsolute(): boolean {
      return super.alwaysMakePathsAbsolute();
    }
    isPathAbsolute(path: string): boolean {
      return super.isPathAbsolute(path);
    }
    join(basePath: string, laterPath: string): string {
      return super.join(basePath, laterPath);
    }
    pathDiff(url: string, baseUrl: string): string {
      return super.pathDiff(url, baseUrl);
    }
  }

  return AliasFileManager;
}
