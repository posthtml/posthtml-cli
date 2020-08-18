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
    use = [].concat(use).reduce((cfg, key) => mergeOptions(cfg, {plugins: {[key]: flags[toCamelCase(key)] || {}}}), {});
  }

  if (!config && !use) {
    ({config} = explorer.search());
  }

  input = []
    .concat(input || config?.input)
    .filter(Boolean)
    .map(file => path.join(path.resolve(root), file));

  if (input.length === 0) {
    throw new TypeError('input files not found');
  }

  return mergeOptions(config || {}, {
    input,
    output,
    options,
    root,
    allInOutput
  }, use || {});
};
