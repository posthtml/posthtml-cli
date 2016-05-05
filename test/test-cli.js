const path = require('path');
const fs = require('fs');
const test = require('ava');
const execa = require('execa');
const pathExists = require('path-exists');
const readPkg = require('read-pkg');
const copy = require('cpy');
const tempfile = require('tempfile');

function read(pathFile) {
	return new Promise((resolve, reject) => {
		fs.readFile(pathFile, 'utf8', (err, data) => {
			if (err) {
				reject(err);
			}
			return resolve(data);
		});
	});
}

test('Missing required arguments -i, -o, -u', t => {
	t.throws(execa('../cli.js', []));
});

test('Missing required arguments -o', t => {
	t.throws(execa('../cli.js', ['-i', 'fixtures/input.html']));
});

test('Missing required arguments -i', t => {
	const filename = tempfile('.html');
	t.throws(execa('../cli.js', [`-o ${filename}`]));
});

test('Missing required arguments -u', t => {
	const filename = tempfile('.html');
	t.throws(execa('../cli.js', [`-o ${filename} -i fixtures/input.html`]));
});

test('One of the arguments', t => {
	const filename = tempfile('.html');
	t.throws(execa('../cli.js', ['-o', filename, '-r', '-i', 'fixtures/input.html']));
});

test('Check version', async t => {
	t.is((await execa('../cli.js', ['-v'])).stdout, (await readPkg(path.dirname(__dirname))).version);
});

test('Transform html witch config in package.json', async t => {
	t.plan(2);
	const filename = tempfile('.html');
	await execa('../cli.js', ['-i', 'fixtures/input.html', '-o', filename]);
	t.true(await pathExists(filename));
	t.is((await read('expected/output-config-pkg.html')), (await read(filename)));
});

test('Transform html witch indent', async t => {
	t.plan(2);
	const filename = tempfile('.html');
	await execa('../cli.js', ['-i', 'fixtures/input-indent.html', '-o', filename]);
	t.true(await pathExists(filename));
	t.is((await read('expected/output-indent.html')), (await read(filename)));
});

test('Transform html witch config in file', async t => {
	t.plan(2);
	const filename = tempfile('.html');
	await execa('../cli.js', ['-i', 'fixtures/input.html', '-o', filename, '-c', 'fixtures/config.json']);
	t.true(await pathExists(filename));
	t.is((await read('expected/output-config-file.html')), (await read(filename)));
});

test('Transform html from folder', async t => {
	t.plan(2);
	const folder = tempfile();
	await execa('../cli.js', ['-i', 'fixtures/*.html', '-o', `${folder}/`]);
	t.is((await read('expected/output-config-pkg.html')), (await read(`${folder}/input.html`)));
	t.is((await read('expected/output-indent.html')), (await read(`${folder}/input-indent.html`)));
});

test('Transform html witch options replace', async t => {
	t.plan(2);
	const folder = tempfile();
	await copy(['fixtures/*.html'], `${folder}/`);
	await execa('../cli.js', ['-i', `${folder}/*.html`, '-r']);
	t.is((await read('expected/output-config-pkg.html')), (await read(`${folder}/input.html`)));
	t.is((await read('expected/output-indent.html')), (await read(`${folder}/input-indent.html`)));
});

test('Transform html witch config in file and stdin options use', async t => {
	t.plan(2);
	const filename = tempfile('.html');
	await execa('../cli.js', [
		'-o',
		filename,
		'-i',
		'fixtures/input-bem.html',
		'-c',
		'fixtures/config.json',
		'-u',
		'posthtml-bem',
		'--posthtml-bem.elemPrefix',
		'__',
		'--posthtml-bem.elemMod',
		'_',
		'-u',
		'posthtml-custom-elements'
	]);
	t.true(await pathExists(filename));
	t.is((await read('expected/output-bem.html')), (await read(filename)));
});
