import path from 'path';
import test from 'ava';
import pluginResolve from '../src/plugin-resolve';

test('should return function', t => {
  t.true(typeof pluginResolve === 'function');
});

test('should return node_modules module path', t => {
  const pluginName = 'posthtml-custom-elements';
  const pluginPath = pluginResolve(pluginName);
  t.is(pluginPath, pluginName);
});

test('should return custom module path', t => {
  const pluginName = 'test/plugins/custom-plugin.js';
  const pluginPath = pluginResolve(pluginName);
  t.is(pluginPath, path.resolve(path.join('./', pluginName)));
});