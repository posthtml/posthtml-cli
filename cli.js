#!/usr/bin/env node

var posthtml = require('posthtml');
var fs = require('fs');
var argv = require('yargs')
	.usage('Usage: $0 [--config|-c config.json] [--output|-o output.html] [--input|-i input.html]')
	.example('posthtml -o output.html input.html', 'Default example')
	.pkgConf('posthtml')
	.config('c', {
		config: true
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
			throw new Error('Not einter argument --input or -i file');
		}
		if (!argv.output) {
			throw new Error('Not einter argument --output or -o file');
		}
		return true;
	})
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
