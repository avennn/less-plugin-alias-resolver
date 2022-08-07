import { resolve, relative, sep } from 'path';

function rename(input: string, currentDirectory: string, options: SerializedOptions) {
  const { aliasList } = options;
  const alias = aliasList.find((item) => input.startsWith(item.prefix));

  if (alias) {
    const { prefix, replaceText } = alias;
    const subPath = input.substring(prefix.length);
    input = resolve(replaceText, subPath.startsWith(sep) ? `.${subPath}` : subPath);
  }

  // transform absolute path to relative path.
  input = relative(currentDirectory, input);

  if (!(input.startsWith(`.${sep}`) || input.startsWith(`..${sep}`))) {
    // Make it more like a relative path, even though it already is.
    input = `./${input}`;
  }

  return input;
}

export function getFileManager(less: LessStatic): AliasResolverFileManagerContruct {
  const FileManager = less.FileManager;

  class AliasFileManager extends FileManager {
    constructor(private options: SerializedOptions) {
      super();
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

    supports(filename: string): boolean {
      const { aliasList } = this.options;
      return aliasList.some((item) => filename.startsWith(item.prefix));
    }

    supportsSync(filename: string): boolean {
      return this.supports(filename);
    }

    loadFile(
      filename: string,
      currentDirectory: string,
      options: Less.LoadFileOptions,
      environment: Less.Environment,
    ): Promise<Less.FileLoadResult> {
      return super.loadFile(rename(filename, currentDirectory, this.options), currentDirectory, options, environment);
    }

    loadFileSync(
      filename: string,
      currentDirectory: string,
      options: Less.LoadFileOptions,
      environment: Less.Environment,
    ): Less.FileLoadResult | Less.FileLoadError {
      return super.loadFileSync(
        rename(filename, currentDirectory, this.options),
        currentDirectory,
        options,
        environment,
      );
    }
  }

  return AliasFileManager;
}

export function getUrlManager(less: LessStatic): AliasResolverUrlManagerContruct {
  // @ts-ignore
  const Visitor = less.visitors.Visitor;

  class UrlVisitor extends Visitor {
    visitor: any;
    isReplacing: boolean;

    constructor(private options: SerializedOptions) {
      super();
      this.visitor = new Visitor(this);
      this.isReplacing = true;
    }

    run(root) {
      return this.visitor.visit(root);
    }

    visitUrl(urlNode) {
      urlNode.value.value = rename(urlNode.value.value, urlNode.value._fileInfo.currentDirectory, this.options);
      return urlNode;
    }
  }

  return UrlVisitor;
}
