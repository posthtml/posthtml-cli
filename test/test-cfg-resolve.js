import test from 'ava';
import path from 'path';
import cfgResolve from '../lib/cfg-resolve';

test('should return function', t => {
  t.true(typeof cfgResolve === 'function');
});

test('should throw error `input files not found`', t => {
  const error = t.throws(() => {
    cfgResolve({});
  }, {instanceOf: TypeError});

  t.is(error.message, 'input files not found');
});

test('should return config plugins with one use key without property', t => {
  const input = 'input.html';
  const flags = {
    use: 'posthtml-bem'
  };
  const config = cfgResolve({input, flags});
  const expected = {'posthtml-bem': {}};

  t.deepEqual(config.plugins, expected);
});

test('should return config with one use key with one property', t => {
  const input = 'input.html';
  const flags = {
    use: 'posthtml-bem',
    posthtmlBem: {
      prefix: '__'
    }
  };
  const config = cfgResolve({input, flags});
  const expected = {'posthtml-bem': {prefix: '__'}};

  t.deepEqual(config.plugins, expected);
});

test('should return config with key config plugins', t => {
  const input = 'input.html';
  const flags = {
    config: 'test/config/.config-plugins'
  };
  const config = cfgResolve({input, flags});
  const expected = {'posthtml-bem': {}};

  t.deepEqual(config.plugins, expected);
});

test('should return config with key config options', t => {
  const input = 'input.html';
  const flags = {
    config: 'test/config/.config-options'
  };
  const config = cfgResolve({input, flags});
  const expected = {sync: true};

  t.deepEqual(config.options, expected);
});

test('should return config options', t => {
  const input = 'input.html';
  const flags = {
    options: {sync: true}
  };
  const config = cfgResolve({input, flags});
  const expected = {sync: true};

  t.deepEqual(config.options, expected);
});

test('should return config with key config and use key', t => {
  const input = 'input.html';
  const flags = {
    use: 'posthtml-assets',
    config: 'test/config/.config-plugins'
  };
  const config = cfgResolve({input, flags});
  const expected = {'posthtml-bem': {}, 'posthtml-assets': {}};

  t.deepEqual(config.plugins, expected);
});

test('should return config when CLI input param priority', t => {
  const input = 'src/template/**/*.html';
  const flags = {
    config: 'test/config/.config-input-priority'
  };
  const config = cfgResolve({input, flags});
  const expected = [path.resolve('src/template/**/*.html')];

  t.deepEqual(config.input, expected);
});

