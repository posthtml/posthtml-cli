const test = require('ava');
const execa = require('execa');
const tempWrite = require('temp-write');
const pathExists = require('path-exists');
const path = require('path');
const readPkg = require('read-pkg');
const readFile = require('fs').readFile;

function read(path) {
	return new Promise((resolve, reject) => {
		readFile(path, 'utf8', (err, data) => {
			if (err) {
				reject(err);
			}
			return resolve(data);
		});
	});
}

test('Missing required arguments -i, -o', t => {
	t.throws(execa('../cli.js', []));
});

test('Missing required arguments -o', t => {
	t.throws(execa('../cli.js', ['-i', 'fixtures/input.html']));
});

test('Missing required arguments -i', t => {
	const filename = tempWrite.sync('output.html');
	t.throws(execa('../cli.js', [`-o ${filename}`]));
});

test('Check version', async t => {
	t.is((await execa('../cli.js', ['-v'])).stdout, (await readPkg(path.dirname(__dirname))).version);
});

test('Transform html witch config in package.json', async t => {
	t.plan(2);
	const filename = await tempWrite('output.html');
	await execa('../cli.js', ['-i', 'fixtures/input.html', '-o', filename]);
	t.true(await pathExists(filename));
	t.is((await read('expected/output-config-pkg.html')), (await read(filename)));
});

test('Transform html witch config in file', async t => {
	t.plan(2);
	const filename = await tempWrite('output.html');
	await execa('../cli.js', ['-i', 'fixtures/input.html', '-o', filename, '-c', 'fixtures/config.json']);
	t.true(await pathExists(filename));
	t.is((await read('expected/output-config-file.html')), (await read(filename)));
});
