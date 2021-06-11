import path from 'path';
import fs from 'fs';
import test from 'ava';
import execa from 'execa';
import pathExists from 'path-exists';
import readPkg from 'read-pkg';
// import copy from 'cpy';
import tempfile from 'tempfile';
import rimraf from 'rimraf';

const cli = path.resolve('lib/cli.js');
const read = file => new Promise((resolve, reject) => {
  fs.readFile(file, 'utf8', (error, data) => {
    if (error) {
      return reject(error);
    }

    resolve(data);
  });
});

test('Check version', async t => {
  const {stdout} = await execa(cli, ['-v']);
  const {version} = await readPkg(path.dirname(__dirname));
  t.is(stdout, version);
});

test('Transform html with config in package.json', async t => {
  t.plan(2);
  const filename = tempfile('.html');
  await execa(cli, ['test/fixtures/input.html', '-o', filename]);
  t.true(await pathExists(filename));
  t.is((await read('test/expected/output-config-pkg.html')), (await read(filename)));
});

test('Transform html with indent', async t => {
  t.plan(2);
  const filename = tempfile('.html');
  await execa(cli, ['test/fixtures/input-indent.html', '-o', filename]);
  t.true(await pathExists(filename));
  t.is((await read('test/expected/output-indent.html')), (await read(filename)));
});

test('Transform html with config in file', async t => {
  t.plan(2);
  const filename = tempfile('.html');
  await execa(cli, ['test/fixtures/input.html', '-o', filename, '-c', 'test/fixtures/config.json']);
  t.true(await pathExists(filename));
  t.is((await read('test/expected/output-config-file.html')), (await read(filename)));
});

test('Transform html with dot config in file', async t => {
  t.plan(2);
  const filename = tempfile('.html');
  await execa(cli, ['test/fixtures/input.html', '-o', filename, '-c', 'test/fixtures/.config']);
  t.true(await pathExists(filename));
  t.is((await read('test/expected/output-config-file.html')), (await read(filename)));
});

test('Transform html from two file', async t => {
  t.plan(2);
  const folder = await tempfile();
  await execa(cli, ['test/fixtures/input.html', 'test/fixtures/input-indent.html', '-o', folder]);
  t.is((await read('test/expected/output-config-pkg.html')), (await read(`${folder}/input.html`)));
  t.is((await read('test/expected/output-indent.html')), (await read(`${folder}/input-indent.html`)));
});

test('Dont not transform html with local plugin', async t => {
  const filename = tempfile('.html');
  await execa(cli, [
    'test/fixtures/input.html',
    '-o',
    filename,
    '-u',
    'test/plugins/custom-plugin.js',
  ]);
  t.true(await pathExists(filename));
  t.is((await read('test/fixtures/input.html')), (await read(filename)));
});

// test('Transform html with options replace', async t => {
//   t.plan(2);
//   const folder = await tempfile();
//   await copy(['test/fixtures/input.html', 'test/fixtures/input-indent.html'], folder);
//   await execa(cli, [`${folder}/input.html`, `${folder}/input-indent.html`]);
//   t.is((await read('test/expected/output-config-pkg.html')), (await read(`${folder}/input.html`)));
//   t.is((await read('test/expected/output-indent.html')), (await read(`${folder}/input-indent.html`)));
// });

test('Transform html with config in file and stdin options use', async t => {
  t.plan(2);
  const filename = tempfile('.html');
  await execa(cli, [
    'test/fixtures/input-bem.html',
    '-o',
    filename,
    '-c',
    'test/fixtures/config.json',
    '-u',
    'posthtml-bem',
    '--posthtml-bem.elemPrefix=--',
    '--posthtml-bem.modPrefix',
    '_',
    '--posthtml-bem.modDlmtr'
  ]);
  t.true(await pathExists(filename));
  t.is((await read('test/expected/output-bem.html')), (await read(filename)));
});

test('Transform html with stdin options use', async t => {
  t.plan(2);
  const filename = tempfile('.html');
  await execa(cli, [
    'test/fixtures/input-custom-elements.html',
    '-o',
    filename,
    '-u',
    'posthtml-custom-elements',
    '--posthtml-custom-elements.defaultTag',
    'span'
  ]);
  t.true(await pathExists(filename));
  t.is((await read('test/expected/output-custom-elements.html')), (await read(filename)));
});

test('Transform html with stdin options use two key', async t => {
  t.plan(2);
  const filename = tempfile('.html');
  await execa(cli, [
    'test/fixtures/input-bem.html',
    '-o',
    filename,
    '-u',
    'posthtml-bem',
    '--posthtml-bem.elemPrefix=--',
    '--posthtml-bem.modPrefix',
    '_',
    '--posthtml-bem.modDlmtr',
    '-u',
    'posthtml-custom-elements',
    '--posthtml-custom-elements.defaultTag',
    'span'
  ]);
  t.true(await pathExists(filename));
  t.is((await read('test/expected/output-bem.html')), (await read(filename)));
});

test('Transform html stdin options use with modules', async t => {
  t.plan(2);
  const filename = tempfile('.html');
  await execa(cli, [
    'test/fixtures/input-modules.html',
    '-o',
    filename,
    '-u',
    'posthtml-css-modules',
    '--posthtml-css-modules',
    'test/fixtures/css-modules.json'
  ]);
  t.true(await pathExists(filename));
  t.is((await read('test/expected/output-modules.html')), (await read(filename)));
});

test('Transform html stdin options', async t => {
  const outputPath = 'test/expected/by-config/options/output.html';
  rimraf.sync(outputPath);
  t.plan(2);
  await execa(cli, [
    '-c',
    'test/fixtures/by-config/options/.config'
  ]);
  t.true(await pathExists(outputPath));
  t.is(
    (await read(outputPath)),
    (await read('test/fixtures/by-config/options/input.html'))
  );
});

test('Transform html stdin options only config one-io', async t => {
  const outputPath = 'test/expected/by-config/one-io/output.html';
  rimraf.sync(outputPath);
  t.plan(2);
  await execa(cli, [
    '-c',
    'test/fixtures/by-config/one-io/.config'
  ]);
  t.true(await pathExists(outputPath));
  t.is(
    (await read(outputPath)),
    (await read('test/fixtures/by-config/one-io/input.html'))
  );
});

test('Transform html stdin options only config two-io to dir', async t => {
  const outputPath1 = 'test/expected/by-config/two-io/input-1.html';
  const outputPath2 = 'test/expected/by-config/two-io/input-2.html';
  rimraf.sync(outputPath1);
  rimraf.sync(outputPath2);
  t.plan(4);
  await execa(cli, [
    '-c',
    'test/fixtures/by-config/two-io/.config'
  ]);
  t.true(await pathExists(outputPath1));
  t.true(await pathExists(outputPath2));
  t.is(
    (await read(outputPath1)),
    (await read('test/fixtures/by-config/two-io/input-1.html'))
  );
  t.is(
    (await read(outputPath2)),
    (await read('test/fixtures/by-config/two-io/input-2.html'))
  );
});

test('Transform html stdin options only config one-io-by-pattern', async t => {
  const outputPath = 'test/expected/by-config/one-io-by-pattern/input-1.html';
  rimraf.sync(outputPath);
  t.plan(2);
  await execa(cli, [
    '-c',
    'test/fixtures/by-config/one-io-by-pattern/.config'
  ]);
  t.true(await pathExists(outputPath));
  t.is(
    (await read(outputPath)),
    (await read('test/fixtures/by-config/one-io-by-pattern/input-1.html'))
  );
});

test('Transform html stdin options only config one-io anf plugins array', async t => {
  const outputPath = 'test/expected/by-config/one-io-and-plugins-array/output.html';
  rimraf.sync(outputPath);
  t.plan(2);
  await execa(cli, [
    '-c',
    'test/fixtures/by-config/one-io-and-plugins-array/posthtml.config.js'
  ]);
  t.true(await pathExists(outputPath));
  t.is(
    (await read(outputPath)),
    (await read('test/fixtures/by-config/one-io-and-plugins-array/input.html'))
  );
});

test('Output with keeping the folder structure with allInOutput option', async t => {
  const outputPath = 'test/expected/output-nesting';
  rimraf.sync(outputPath);
  t.plan(3);
  await execa(cli, [
    'test/fixtures/input-nesting/**/*.html',
    '-o',
    outputPath,
    '-a'
  ]);
  t.true(await pathExists(outputPath));
  t.is(
    (await read('test/fixtures/input-nesting/input-nesting.html')),
    (await read(`${outputPath}/test/fixtures/input-nesting/input-nesting.html`))
  );
  t.is(
    (await read('test/fixtures/input-nesting/input-nesting-child/input-nesting.html')),
    (await read(`${outputPath}/test/fixtures/input-nesting/input-nesting-child/input-nesting.html`))
  );
});

test('Specify the root of the output folder structure with root option', async t => {
  const outputPath = 'test/expected/output-nesting-root';
  rimraf.sync(outputPath);
  t.plan(3);
  await execa(cli, [
    '**/*.html',
    '-o',
    outputPath,
    '-a',
    '-r',
    'test/fixtures/input-nesting'
  ]);
  t.true(await pathExists(outputPath));
  t.is(
    (await read('test/fixtures/input-nesting/input-nesting.html')),
    (await read(`${outputPath}/input-nesting.html`))
  );
  t.is(
    (await read('test/fixtures/input-nesting/input-nesting-child/input-nesting.html')),
    (await read(`${outputPath}/input-nesting-child/input-nesting.html`))
  );
});

test('Ignoring files by pattern', async t => {
  const outputPath = 'test/expected/output-ignoring';
  rimraf.sync(outputPath);
  t.plan(3);
  await execa(cli, [
    '**/*.html',
    '!ignoring-input-child/**/*.html',
    '-o',
    outputPath,
    '-a',
    '-r',
    'test/fixtures/input-ignoring'
  ]);
  t.true(await pathExists(outputPath));
  t.is(
    (await read('test/fixtures/input-ignoring/input.html')),
    (await read(`${outputPath}/input.html`))
  );
  t.false(await pathExists('test/expected/input-ignoring/ignoring-input-child'));
});

test('Skip parsing file', async t => {
  const outputPath = 'test/expected/output-skip';
  rimraf.sync(outputPath);
  t.plan(3);
  await execa(cli, [
    '**/*.html',
    '-o',
    outputPath,
    '-a',
    '-r',
    'test/fixtures/input-skip',
    '-s',
    'input-skip.html',
    '-u',
    'posthtml-custom-elements'
  ]);
  t.true(await pathExists(outputPath));
  t.is(
    (await read('test/fixtures/input-skip/input.html')),
    (await read(`${outputPath}/input.html`))
  );
  t.is(
    (await read('test/fixtures/input-skip/input-skip.html')),
    (await read(`${outputPath}/input-skip.html`))
  );
});
