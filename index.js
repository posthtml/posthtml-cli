var posthtml = require('posthtml');
var argv = require('yargs')
	.usage('Usage: $0 [--output|-o output.html] [input.html]')
	.example('posthtml -o ./dist/output.html ./src/input.html', 'Default example')
	.alias('o', 'Output file')
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
	.argv;
