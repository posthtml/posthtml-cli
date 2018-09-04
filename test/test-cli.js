import path from 'path';
import fs from 'fs';
import test from 'ava';
import execa from 'execa';
import pathExists from 'path-exists';
import readPkg from 'read-pkg';
// import copy from 'cpy';
import tempfile from 'tempfile';
// import cli from '../src/cli';

const cli = path.resolve('lib/cli.js');
const read = file => new Promise((resolve, reject) => fs.readFile(file, 'utf8', (err, data) => {
  if (err) {
    return reject(err);
  }

  resolve(data);
}));

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
  t.is((await read('test/expected/output-config-pkg.html')), (await read(`${folder}/test/fixtures/input.html`)));
  t.is((await read('test/expected/output-indent.html')), (await read(`${folder}/test/fixtures/input-indent.html`)));
});

// test.skip('Transform html witch options replace', async t => {
//   t.plan(2);
//   const folder = await tempfile();
//   await copy(['test/fixtures/input.html', 'test/fixtures/input-indent.html'], folder, {parents: true});
//   await execa(cli, [`${folder}/test/fixtures/input.html`, `${folder}/test/fixtures/input-indent.html`]);
//   t.is((await read('test/expected/output-config-pkg.html')), (await read(`${folder}/test/fixtures/input.html`)));
//   t.is((await read('test/expected/output-indent.html')), (await read(`${folder}/test/fixtures/input-indent.html`)));
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
    '--posthtml-bem.modDlmtr',
    '--'
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
