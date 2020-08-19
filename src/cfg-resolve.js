import path from 'path';
import {cosmiconfigSync} from 'cosmiconfig';
import toCamelCase from 'to-camel-case';
import mergeOptions from 'merge-options';

export default ({input, flags = {}}) => {
  const explorer = cosmiconfigSync('posthtml');
  let {
    config,
    use,
    options = {},
    output,
    root = './',
    allInOutput = false
  } = flags;

  if (config) {
    ({config} = explorer.load(config));
  }

  if (use) {
    const configPluginOptions = config?.plugins ?? {};

    // Plugins defined via CLI options take precedence over the ones from config file.
    use = [].concat(use).reduce((cfg, name) => {
      let cliOptions = flags[toCamelCase(name)];
      let configOptions = configPluginOptions[name];
      // We merge this way because options can be both strings and objects.
      const merged = mergeOptions({ [name]: configOptions }, { [name]: cliOptions || {}});
      // Assigning as we loop `use` makes sure that the order in cfg.plugins is correct.
      cfg.plugins[name] = merged[name];
      if (configOptions) {
        delete configPluginOptions[name];
      }
      return cfg;
    }, { plugins: {} });

    // Add the remaining plugins if there is any.
    if (config && config.plugins) {
      for (let name in configPluginOptions) {
        use.plugins[name] = configPluginOptions[name];
      }
      // Now all the plugins are in `use.plugins`.
      // Delete `config.plugins` for correct merging later: mergeOptions(config, {...}, use)
      delete config.plugins;
    }
  }

  if (!config && !use) {
    ({config} = explorer.search());
  }

  input = []
    .concat(input && input.length > 0 ? input : config?.input)
    .filter(Boolean)
    .map(file => path.join(path.resolve(root), file));

  if (input.length === 0) {
    throw new TypeError('input files not found');
  }

  return mergeOptions(config ?? {}, {
    input,
    output: output ?? config?.output,
    options,
    root,
    allInOutput
  }, use ?? {});
};
