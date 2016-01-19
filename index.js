var posthtml = require('posthtml');
var fs = require('fs');
var argv = require('yargs')
	.usage('Usage: $0 [--output|-o output.html] [--input|-i input.html]')
	.example('posthtml -o ./dist/output.html ./src/input.html', 'Default example')
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
	.argv;

var html = fs.readFileSync(argv.input, "utf8");

posthtml()
    .process(html)
    .then(function (result) {
        fs.writeFileSync(argv.output, result.html);
    });
