#!/usr/bin/env node

var posthtml = require('posthtml');
var pkgConf = require('pkg-conf');
var fs = require('fs');
var argv = require('yargs')
	.usage('Usage: $0 [--config|-c config.json] [--output|-o output.html] [--input|-i input.html]')
	.example('posthtml -o output.html input.html', 'Default example')
	.config('c', function (configPath) {
		return {
			plugins: JSON.parse(fs.readFileSync(configPath, 'utf-8'))
		};
	})
	.alias('c', 'config')
	.alias('i', 'input')
	.alias('o', 'output')
	.requiresArg(['o'])
	.version(function () {
		return [
			'posthtml version',
			require('./node_modules/posthtml/package.json').version
		].join(' ');
	}, 'v')
	.alias('v', 'version')
	.help('h')
	.alias('h', 'help')
	.check(function (argv) {
		if (!argv.input) {
			throw 'Not einter argument --input or -i file';
		}
		if (!argv.output) {
			throw 'Not einter argument --output or -o file';
		}
	})
	.argv;

// get htmls
var html = fs.readFileSync(argv.input, 'utf8');

// get config
var config = argv.plugins || pkgConf.sync('posthtml');

// get plugins
var plugins = [];
if (config.require) {
	plugins = config.require.map(function (name) {
		return require(name)(config[name]);
	});
}

// processing
posthtml(plugins)
	.process(html)
	.then(function (result) {
		fs.writeFileSync(argv.output, result.html);
	});
