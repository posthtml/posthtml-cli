import path from 'path';
import fs from 'fs';
import test from 'ava';
import execa from 'execa';
import pathExists from 'path-exists';
import readPkg from 'read-pkg';
// import copy from 'cpy';
import tempfile from 'tempfile';

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

test('Transform html witch config in package.json', async t => {
  t.plan(2);
  const filename = tempfile('.html');
  await execa(cli, ['test/fixtures/input.html', '-o', filename]);
  t.true(await pathExists(filename));
  t.is((await read('test/expected/output-config-pkg.html')), (await read(filename)));
});

test('Transform html witch indent', async t => {
  t.plan(2);
  const filename = tempfile('.html');
  await execa(cli, ['test/fixtures/input-indent.html', '-o', filename]);
  t.true(await pathExists(filename));
  t.is((await read('test/expected/output-indent.html')), (await read(filename)));
});

test('Transform html witch config in file', async t => {
  t.plan(2);
  const filename = tempfile('.html');
  await execa(cli, ['test/fixtures/input.html', '-o', filename, '-c', 'test/fixtures/config.json']);
  t.true(await pathExists(filename));
  t.is((await read('test/expected/output-config-file.html')), (await read(filename)));
});

test('Transform html witch dot config in file', async t => {
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

// test('Transform html witch options replace', async t => {
//   t.plan(2);
//   const folder = await tempfile();
//   await copy(['test/fixtures/input.html', 'test/fixtures/input-indent.html'], folder);
//   await execa(cli, [`${folder}/input.html`, `${folder}/input-indent.html`]);
//   t.is((await read('test/expected/output-config-pkg.html')), (await read(`${folder}/input.html`)));
//   t.is((await read('test/expected/output-indent.html')), (await read(`${folder}/input-indent.html`)));
// });

test('Transform html witch config in file and stdin options use', async t => {
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

test('Transform html witch stdin options use', async t => {
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

test('Transform html witch stdin options use two key', async t => {
  t.plan(2);
  const filename = tempfile('.html');
  await execa(cli, [
    'test/fixtures/input-bem.html',
    '-o',
    filename,
    '-u',
    'posthtml-custom-elements',
    '--posthtml-custom-elements.defaultTag',
    'span',
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

test('Transform html stdin options use witch modules', async t => {
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
  t.plan(2);
  await execa(cli, [
    '-c',
    'test/fixtures/by-config/options/.config'
  ]);
  t.true(await pathExists('test/expected/by-config/options/output.html'));
  t.is(
    (await read('test/expected/by-config/options/output.html')),
    (await read('test/fixtures/by-config/options/input.html'))
  );
});

test('Transform html stdin options only config one-io', async t => {
  t.plan(2);
  await execa(cli, [
    '-c',
    'test/fixtures/by-config/one-io/.config'
  ]);
  t.true(await pathExists('test/expected/by-config/one-io/output.html'));
  t.is(
    (await read('test/expected/by-config/one-io/output.html')),
    (await read('test/fixtures/by-config/one-io/input.html'))
  );
});

test('Transform html stdin options only config two-io to dir', async t => {
  t.plan(4);
  await execa(cli, [
    '-c',
    'test/fixtures/by-config/two-io/.config'
  ]);
  t.true(await pathExists('test/expected/by-config/two-io/input-1.html'));
  t.true(await pathExists('test/expected/by-config/two-io/input-2.html'));
  t.is(
    (await read('test/expected/by-config/two-io/input-1.html')),
    (await read('test/fixtures/by-config/two-io/input-1.html'))
  );
  t.is(
    (await read('test/expected/by-config/two-io/input-2.html')),
    (await read('test/fixtures/by-config/two-io/input-2.html'))
  );
});

test('Transform html stdin options only config one-io-by-pattern', async t => {
  t.plan(2);
  await execa(cli, [
    '-c',
    'test/fixtures/by-config/one-io-by-pattern/.config'
  ]);
  t.true(await pathExists('test/expected/by-config/one-io-by-pattern/input-1.html'));
  t.is(
    (await read('test/expected/by-config/one-io-by-pattern/input-1.html')),
    (await read('test/fixtures/by-config/one-io-by-pattern/input-1.html'))
  );
});

test('Transform html stdin options only config one-io anf plugins array', async t => {
  t.plan(2);
  await execa(cli, [
    '-c',
    'test/fixtures/by-config/one-io-and-plugins-array/posthtml.config.js'
  ]);
  t.true(await pathExists('test/expected/by-config/one-io-and-plugins-array/output.html'));
  t.is(
    (await read('test/expected/by-config/one-io-and-plugins-array/output.html')),
    (await read('test/fixtures/by-config/one-io-and-plugins-array/input.html'))
  );
});

test('Output with keeping the folder structure with allInOutput option', async t => {
  t.plan(3);
  await execa(cli, [
    'test/fixtures/input-nesting/**/*.html',
    '-o',
    'test/expected/output-nesting',
    '-a'
  ]);
  t.true(await pathExists('test/expected/output-nesting'));
  t.is(
    (await read('test/fixtures/input-nesting/input-nesting.html')),
    (await read('test/expected/output-nesting/test/fixtures/input-nesting/input-nesting.html'))
  );
  t.is(
    (await read('test/fixtures/input-nesting/input-nesting-child/input-nesting.html')),
    (await read('test/expected/output-nesting/test/fixtures/input-nesting/input-nesting-child/input-nesting.html'))
  );
});

test('Specify the root of the output folder structure with root option', async t => {
  t.plan(3);
  await execa(cli, [
    'test/fixtures/input-nesting/**/*.html',
    '-o',
    'test/expected/output-nesting-root',
    '-a',
    '-r',
    'test/fixtures/input-nesting'
  ]);
  t.true(await pathExists('test/expected/output-nesting-root'));
  t.is(
    (await read('test/fixtures/input-nesting/input-nesting.html')),
    (await read('test/expected/output-nesting-root/input-nesting.html'))
  );
  t.is(
    (await read('test/fixtures/input-nesting/input-nesting-child/input-nesting.html')),
    (await read('test/expected/output-nesting-root/input-nesting-child/input-nesting.html'))
  );
});
