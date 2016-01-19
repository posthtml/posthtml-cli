var posthtml = require('posthtml');
var fs = require('fs');
var argv = require('yargs')
	.usage('Usage: $0 [--config|-c config.json] [--output|-o output.html] [--input|-i input.html]')
	.example('posthtml -o output.html input.html', 'Default example')
	.config('c', function (configPath) {
    	return {
    		'options': JSON.parse(fs.readFileSync('package.json', 'utf-8')).posthtml
    	}
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

var html = fs.readFileSync(argv.input, "utf8");
var plugins = argv.options.require.map(function(name){
	return require(name)();
});

posthtml(plugins)
    .process(html)
    .then(function (result) {
        fs.writeFileSync(argv.output, result.html);
    });