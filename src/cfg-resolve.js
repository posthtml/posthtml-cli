import { cosmiconfigSync } from 'cosmiconfig'
import toCamelCase from 'to-camel-case'
import mergeOptions from 'merge-options'

export default ({ input, flags = {} }) => {
  const explorer = cosmiconfigSync('posthtml')
  let { config, use, output } = flags

  if (config) {
    ({ config } = explorer.load(config))
  }

  if (use) {
    use = [].concat(use).reduce((cfg, key) => mergeOptions(cfg, { plugins: { [key]: flags[toCamelCase(key)] || {} } }), {})
  }

  if (!config && !use) {
    ({ config } = explorer.search())
  }

  return mergeOptions({
    input,
    output
  }, use || {}, config || {})
}
