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

test('should return config with key config plugins', async t => {
  const flags = {
    config: 'test/config/.config-plugins'
  };
  const config = await cfgResolve({flags});
  const expected = {'posthtml-bem': {}};

  t.deepEqual(config.plugins, expected);
});

test('should return config with key config options', async t => {
  const flags = {
    config: 'test/config/.config-options'
  };
  const config = await cfgResolve({flags});
  const expected = {sync: true};

  t.deepEqual(config.options, expected);
});

test('should return config options', async t => {
  const flags = {
    options: {sync: true}
  };
  const config = await cfgResolve({flags});
  const expected = {sync: true};

  t.deepEqual(config.options, expected);
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
  const expected = 'src/template/**/*.html';

  t.deepEqual(config.input, expected);
});

