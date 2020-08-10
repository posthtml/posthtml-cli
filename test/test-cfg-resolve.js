import test from 'ava';
import cfgResolve from '../lib/cfg-resolve';

test('should return function', t => {
  t.true(typeof cfgResolve === 'function');
});

test('should return config with one use key without property', async t => {
  const flags = {
    use: 'posthtml-bem'
  };
  const config = await cfgResolve({flags});
  const expected = {'posthtml-bem': {}};

  t.deepEqual(config.plugins, expected);
});

test('should return config with one use key with one property', async t => {
  const flags = {
    use: 'posthtml-bem',
    posthtmlBem: {
      prefix: '__'
    }
  };
  const config = await cfgResolve({flags});
  const expected = {'posthtml-bem': {prefix: '__'}};

  t.deepEqual(config.plugins, expected);
});

test('should return config with key config', async t => {
  const flags = {
    config: 'test/config/.config-plugins'
  };
  const config = await cfgResolve({flags});
  const expected = {'posthtml-bem': {}};

  t.deepEqual(config.plugins, expected);
});

test('should return config with key config and use key', async t => {
  const flags = {
    use: 'posthtml-assets',
    config: 'test/config/.config-plugins'
  };
  const config = await cfgResolve({flags});
  const expected = {'posthtml-bem': {}, 'posthtml-assets': {}};

  t.deepEqual(config.plugins, expected);
});

test('should return config when CLI params priority', async t => {
  const input = 'src/template/**/*.html';
  const flags = {
    config: 'test/config/.config-input-priority'
  };
  const config = await cfgResolve({input, flags});
  const expected = {
    allInOutput: undefined,
    input: 'src/template/**/*.html',
    output: undefined,
    root: './'
  };

  t.deepEqual(config, expected);
});

