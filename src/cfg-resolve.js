import cosmiconfig from 'cosmiconfig';
import toCamelCase from 'to-camel-case';
import mergeOptions from 'merge-options';

export default ({input, flags = {}}) => {
  const explorer = cosmiconfig('posthtml');
  let {config, use, output} = flags;

  if (config) {
    ({config} = explorer.loadSync(config));
  }

  if (use) {
    use = [].concat(use).reduce((cfg, key) => mergeOptions(cfg, {plugins: {[key]: flags[toCamelCase(key)] || {}}}), {});
  }

  if (!config && !use) {
    ({config} = explorer.searchSync());
  }

  return mergeOptions({
    input,
    output
  }, use || {}, config || {});
};
