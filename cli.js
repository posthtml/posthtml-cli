#!/usr/bin/env node

var posthtml = require('posthtml');
var fs = require('fs');
var argv = require('yargs')
	.usage('Usage: $0 --output|-o output.html --input|-i input.html [--config|-c config.json]')
	.example('posthtml -o output.html -i input.html', 'Default example')
	.alias('i', 'input')
	.alias('o', 'output')
	.demand(['o', 'i'])
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

console.log(argv);

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
