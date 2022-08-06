// https://github.com/less/less-docs/blob/master/content/features/plugins.md
import { resolve } from 'path';
import { getFileManager } from './importer';

const DEFAULT_OPTIONS = {
  prefix: '',
  external: '~',
  alias: {},
};

class LessPluginAliasResolver implements Less.Plugin {
  options: SerializedOptions;
  minVersion: [number, number, number];

  constructor(options?: Options) {
    this.options = this.parseOptions(options);
    this.minVersion = [3, 0, 0];
  }

  isObject(value: unknown) {
    return Object.prototype.toString.call(value) === '[object Object]';
  }

  parseOptions(options?: Options): SerializedOptions {
    const opts: Options = {
      ...DEFAULT_OPTIONS,
      ...options,
    };

    if (!this.isObject(opts.alias)) {
      opts.alias = {};
    }

    let aliasList = Object.keys(opts.alias).map((key) => ({
      prefix: `${opts.prefix || ''}${key}`,
      replaceText: opts.alias[key],
    }));

    if (opts.external) {
      aliasList = [
        {
          prefix: opts.external,
          replaceText: resolve(process.cwd(), 'node_modules'),
        },
        ...aliasList,
      ];
    }

    aliasList.sort((a, b) => b.prefix.length - a.prefix.length);

    return {
      aliasList,
    };
  }

  install(less: LessStatic, pluginManager: Less.PluginManager) {
    const AliasResolverFileManager = getFileManager(less);
    // console.log('=less=', less.options, pluginManager);
    pluginManager.addFileManager(new AliasResolverFileManager(this.options));
  }

  printUsage() {
    console.log('');
    console.log('less-plugin-alias-resolver');
    console.log('');
  }
}

export default LessPluginAliasResolver;
