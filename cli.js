#!/usr/bin/env node

var posthtml = require('posthtml');
var fs = require('fs');
var argv = require('yargs')
	.usage('Usage: $0 --output|-o output.html --input|-i input.html [--config|-c config.json]')
	.example('posthtml -o output.html -i input.html', 'Default example')
	.demand(['o', 'i'])
	.alias('i', 'input')
	.alias('o', 'output')
	.pkgConf('posthtml')
	.config('c')
	.alias('c', 'config')
	.version(function () {
		return require('./package.json').version;
	})
	.alias('v', 'version')
	.help('h')
	.alias('h', 'help')
	.argv;

// get htmls
var html = fs.readFileSync(argv.input, 'utf8');

// get plugins
var plugins = [];
if (argv.require) {
	plugins = argv.require.map(function (name) {
		return require(name)(argv[name]);
	});
}

// processing
posthtml(plugins)
	.process(html)
	.then(function (result) {
		fs.writeFileSync(argv.output, result.html);
	});
 -f less foo_bar');
		console.log('    bemstyla -d styles/blocks blockname');
		console.log('');
	})
	.parse(process.argv);

updateNotifier({pkg: pkg}).notify();

if (program.args.length < 1) {
	program.help();
}

function checkExists(path) {
	return new Promise(function (resolve, reject) {
		fs.stat(path, function (err, stats) {
			if (!err || (stats && stats.isDirectory())) {
				return resolve(path);
			}
			console.log(err.message);
			return reject();
		});
	});
}

function checkAccess(path) {
	return new Promise(function (resolve, reject) {
		fs.access(path, fs.R_OK | fs.W_OK, function (err) {
			if (!err) {
				return resolve();
			}
			console.error(err.message);
			return reject();
		});
	});
}

function start() {
	var index = require('../lib/index');

	_.forEach(program.args, function (arg) {
		index({
			source: arg,
			fileType: program.type,
			fileFormat: program.format || program.type,
			baseDir: program.dir
		});
	});
}

if (program.dir) {
	checkExists(program.dir)
		.then(checkAccess)
		.then(function () {
			start();
		})
		.catch(function () {});
} else {
	start();
}
