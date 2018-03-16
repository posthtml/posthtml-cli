import test from 'ava';
import isPromise from 'is-promise';
import cfgResolve from '../src/cfg-resolve';

test('should return function', t => {
  t.true(typeof cfgResolve === 'function');
});

test('should return promise', t => {
  t.true(isPromise(cfgResolve()));
});

test('should return config with one use key without property', async t => {
  const flags = {
    use: 'posthtml-bem'
  };
  const config = await cfgResolve(flags);
  const expected = {'posthtml-bem': {}};

  t.deepEqual(config, expected);
});

test('should return config with one use key with one property', async t => {
  const flags = {
    use: 'posthtml-bem',
    posthtmlBem: {
      prefix: '__'
    }
  };
  const config = await cfgResolve(flags);
  const expected = {'posthtml-bem': {prefix: '__'}};

  t.deepEqual(config, expected);
});

test('should return config with key config', async t => {
  const flags = {
    config: 'test/config/.config'
  };
  const config = await cfgResolve(flags);
  const expected = {'posthtml-bem': {}};

  t.deepEqual(config, expected);
});

test('should return resolve parth to config from key config', async t => {
  const flags = {
    config: 'config/.config'
  };
  const config = await cfgResolve(flags);
  const expected = {'posthtml-bem': {}};

  t.deepEqual(config, expected);
});

test('should return config with key config and use key', async t => {
  const flags = {
    use: 'posthtml-assets',
    config: 'test/config/.config'
  };
  const config = await cfgResolve(flags);
  const expected = {'posthtml-bem': {}, 'posthtml-assets': {}};

  t.deepEqual(config, expected);
});

