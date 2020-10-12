import test from 'ava';
import path from 'path';
import cfgResolve from '../lib/cfg-resolve';
import normalizePath from 'normalize-path';

test('should return function', t => {
  t.true(typeof cfgResolve === 'function');
});

test('should throw error `input files not found`', t => {
  const error = t.throws(() => {
    cfgResolve({});
  }, {instanceOf: TypeError});

  t.is(error.message, 'input files not found');
});

test('should return simple config', t => {
  const input = 'input.html';
  const flags = {};
  const config = cfgResolve({input, flags});
  const expected = {
    allInOutput: false,
    input: [normalizePath(path.resolve('input.html'))],
    options: {},
    output: undefined,
    plugins: {
      'posthtml-custom-elements': {}
    },
    root: './'
  };

  t.deepEqual(config, expected);
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

test('should return config root', t => {
  const input = 'input.html';
  const flags = {
    config: 'test/config/.config-root'
  };
  const config = cfgResolve({input, flags});
  const expectedRoot = './src';
  const expectedInput = [path.join(process.cwd(), expectedRoot, input)];

  t.is(config.root, expectedRoot);
  t.deepEqual(config.input, expectedInput);
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

test('should return config when input param from config', t => {
  const flags = {
    config: 'test/config/.config-input'
  };
  const config = cfgResolve({flags});
  const expected = [normalizePath(path.resolve('src/**/*.html'))];

  t.deepEqual(config.input, expected);
});

test('should return config when output param from config', t => {
  const input = 'input.html';
  const flags = {
    config: 'test/config/.config-output'
  };
  const config = cfgResolve({input, flags});
  const expected = 'dist/output.html';

  t.deepEqual(config.output, expected);
});

test('should return config when CLI input param priority', t => {
  const input = 'src/template/**/*.html';
  const flags = {
    config: 'test/config/.config-input-priority'
  };
  const config = cfgResolve({input, flags});
  const expected = [normalizePath(path.resolve('src/template/**/*.html'))];

  t.deepEqual(config.input, expected);
});

test('should return config when CLI output param priority', t => {
  const input = 'input.html';
  const flags = {
    output: 'public/output.html',
    config: 'test/config/.config-output-priority'
  };
  const config = cfgResolve({input, flags});
  const expected = 'public/output.html';

  t.deepEqual(config.output, expected);
});

test('should resolve plugins set via config and stdin (use) in order', t => {
  const input = 'input.html';
  const flags = {
    use: ['posthtml-d', 'posthtml-bem'],
    posthtmlBem: {foo: 'after'},
    posthtmlD: {bar: 'before'},
    config: 'test/config/.config-plugins'
  };
  const config = cfgResolve({input, flags});
  t.deepEqual(Object.keys(config.plugins), ['posthtml-d', 'posthtml-bem']);
});
