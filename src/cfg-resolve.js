import path from 'path';
import {cosmiconfigSync} from 'cosmiconfig';
import toCamelCase from 'to-camel-case';
import mergeOptions from 'merge-options';

export default ({input, flags = {}}) => {
  const explorer = cosmiconfigSync('posthtml');
  let {config, use, options = {}, output, root = './', allInOutput} = flags;

  if (config) {
    ({config} = explorer.load(config));
  }

  if (use) {
    use = [].concat(use).reduce((cfg, key) => mergeOptions(cfg, {plugins: {[key]: flags[toCamelCase(key)] || {}}}), {});
  }

  if (!config && !use) {
    ({config} = explorer.search());
  }

  return mergeOptions(config || {}, {
    input: input.map(file => path.join(path.resolve(root), file)),
    output,
    options,
    root,
    allInOutput
  }, use || {});
};
