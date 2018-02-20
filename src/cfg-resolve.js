import getCff from 'get-cff';
import toCamelCase from 'to-camel-case';
import pathExists from 'path-exists';
import deepAssign from 'deep-assign';

export default (flags = {}) => new Promise(async resolve => {
  let {config, use} = flags;

  if (config) {
    config = await pathExists(config) ? await getCff(config) : {};
  }

  if (use) {
    use = [].concat(use).reduce((cfg, key) => deepAssign(cfg, {[key]: flags[toCamelCase(key)] || {}}), {});
  }

  resolve(deepAssign({}, use || {}, config || {}));
});
