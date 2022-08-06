// https://github.com/less/less-docs/blob/master/content/features/plugins.md
import { getFileManager } from './importer';

class LessPluginAliasResolver implements Less.Plugin {
  options: Options;

  minVersion: [number, number, number];

  constructor(options?: Options) {
    this.options = options || {
      alias: { '~': 'node_modules' },
    };
    this.minVersion = [3, 0, 0];
  }
  install(less: LessStatic, pluginManager: Less.PluginManager) {
    const AliasResolverFileManager = getFileManager(less);
    console.log('=less=', less.options, pluginManager);
    pluginManager.addFileManager(new AliasResolverFileManager(this.options));
  }

  printUsage() {
    console.log('');
    console.log('less-plugin-alias-resolver');
    console.log('');
  }
}

export default LessPluginAliasResolver;
