const path = require('path')
const fs = require('fs')
const test = require('ava')
const execa = require('execa')
const pathExists = require('path-exists')
const readPkg = require('read-pkg')
const copy = require('cpy')
const tempfile = require('tempfile')

const cli = path.resolve('cli.js')

function read (pathFile) {
  return new Promise((resolve, reject) => {
    fs.readFile(pathFile, 'utf8', (err, data) => {
      if (err) {
        reject(err)
      }
      return resolve(data)
    })
  })
}

test('Missing required arguments -i, -o', t => {
  t.throws(execa(cli, []))
})

test('Missing required arguments -o', t => {
  t.throws(execa(cli, ['-i', 'test/fixtures/input.html']))
})

test('Missing required arguments -i', t => {
  const filename = tempfile('.html')
  t.throws(execa(cli, ['-o', filename]))
})

test('One of the arguments', t => {
  const filename = tempfile('.html')
  t.throws(execa(cli, ['-o', filename, '-r', '-i', 'test/fixtures/input.html']))
})

test('Check version', async t => {
  t.is((await execa(cli, ['-v'])).stdout, (await readPkg(path.dirname(__dirname))).version)
})

test('Transform html witch config in package.json', async t => {
  t.plan(2)
  const filename = tempfile('.html')
  await execa(cli, ['-i', 'test/fixtures/input.html', '-o', filename])
  t.true(await pathExists(filename))
  t.is((await read('test/expected/output-config-pkg.html')), (await read(filename)))
})

test('Transform html witch indent', async t => {
  t.plan(2)
  const filename = tempfile('.html')
  await execa(cli, ['-i', 'test/fixtures/input-indent.html', '-o', filename])
  t.true(await pathExists(filename))
  t.is((await read('test/expected/output-indent.html')), (await read(filename)))
})

test('Transform html witch config in file', async t => {
  t.plan(2)
  const filename = tempfile('.html')
  await execa(cli, ['-i', 'test/fixtures/input.html', '-o', filename, '-c', 'test/fixtures/config.json'])
  t.true(await pathExists(filename))
  t.is((await read('test/expected/output-config-file.html')), (await read(filename)))
})

test('Transform html from folder', async t => {
  t.plan(2)
  const folder = await tempfile()
  await execa(cli, ['-i', 'test/fixtures/*.html', '-o', `${folder}/`])
  t.is((await read('test/expected/output-config-pkg.html')), (await read(`${folder}/input.html`)))
  t.is((await read('test/expected/output-indent.html')), (await read(`${folder}/input-indent.html`)))
})

test('Transform html witch options replace', async t => {
  t.plan(2)
  const folder = await tempfile()
  await copy(['test/fixtures/*.html'], `${folder}/`)
  await execa(cli, ['-i', `${folder}/*.html`, '-r'])
  t.is((await read('test/expected/output-config-pkg.html')), (await read(`${folder}/input.html`)))
  t.is((await read('test/expected/output-indent.html')), (await read(`${folder}/input-indent.html`)))
})

test('Transform html witch config in file and stdin options use', async t => {
  t.plan(2)
  const filename = tempfile('.html')
  await execa(cli, [
    '-o',
    filename,
    '-i',
    'test/fixtures/input-bem.html',
    '-c',
    'test/fixtures/config.json',
    '-u',
    'posthtml-bem',
    '--posthtml-bem.elemPrefix',
    '__',
    '--posthtml-bem.elemMod',
    '_',
    '-u',
    'posthtml-custom-elements'
  ])
  t.true(await pathExists(filename))
  t.is((await read('test/expected/output-bem.html')), (await read(filename)))
})

test('Transform html stdin options use witch modules', async t => {
  t.plan(2)
  const filename = tempfile('.html')
  await execa(cli, [
    '-o',
    filename,
    '-i',
    'test/fixtures/input-modules.html',
    '-u',
    'posthtml-css-modules',
    '--posthtml-css-modules',
    'test/fixtures/css-modules.json'
  ])
  t.true(await pathExists(filename))
  t.is((await read('test/expected/output-modules.html')), (await read(filename)))
})
