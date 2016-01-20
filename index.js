var posthtml = require('posthtml');
var fs = require('fs');
var argv = require('yargs')
	.usage('Usage: $0 [--config|-c config.json] [--output|-o output.html] [--input|-i input.html]')
	.example('posthtml -o output.html input.html', 'Default example')
	.config('c', function (configPath) {
		return {
			plugins: getConfig(configPath)
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
	.argv;

function getConfig(configPath) {
	var path = configPath || './package.json';
	return JSON.parse(fs.readFileSync(path, 'utf-8'));
}

var html = fs.readFileSync(argv.input, 'utf8');
var config = argv.plugins ? argv.plugins : getConfig().posthtml;

var plugins = config.require.map(function (name) {
	return require(name)(argv.plugins[name]);
});

posthtml(plugins)
	.process(html)
	.then(function (result) {
		fs.writeFileSync(argv.output, result.html);
	});
