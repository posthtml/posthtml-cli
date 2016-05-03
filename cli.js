#!/usr/bin/env node

var posthtml = require('posthtml');
var resolve = require('resolve');
var globby = require('globby');
var path = require('path');
const pathExists = require('path-exists');
var fs = require('fs');
var argv = require('yargs')
	.usage('Usage: $0 --output|-o output.html/outputFolder --input|-i input.html/inputFolder [--config|-c config.(js|json)] [--replace|-r]')
	.example('posthtml -o output.html -i input.html', 'Default example')
  .alias('u', 'use')
  .describe('u', 'posthtml plugin name (can be used multiple times)')
  .option('local-plugins', {
    describe: 'lookup plugins in current node_modules directory'
  })
	.alias('i', 'input')
	.alias('o', 'output')
	.alias('r', 'replace')
	.demand(['i', 'u'])
	.array('input')
	.pkgConf('posthtml')
	.config('c')
	.alias('c', 'config')
	.version(function () {
		return require('./package.json').version;
	})
	.alias('v', 'version')
	.help('h')
	.alias('h', 'help')
	.check(function (argv) {
    if (!argv.use) {
      throw 'Please specify at least one plugin name.';
    }
		if (argv.output && argv.replace) {
			throw new Error('Both `output file` and `replace` provided: please use either --output or --replace option.');
		}
		if (!argv.output && !argv.replace) {
			throw new Error('Both `output file` and `replace` missing: please use either --output or --replace option.');
		}
		return true;
	})
	.argv;

if (!Array.isArray(argv.use)) {
  argv.use = [argv.use];
}

// load and configure plugin array
var plugins = argv.use.map(function(name) {
  var local = argv['local-plugins'];
  var plugin;
  if (local) {
    var resolved = resolve.sync(name, {basedir: process.cwd()});
    plugin = require(resolved);
  } else {
    plugin = require(name);
  }
  if (name in argv) {
    plugin = plugin(argv[name]);
  } else {
    plugin = plugin.posthtml || plugin();
  }
  return plugin;
});

function processing(file, output) {
	// get htmls
	var html = fs.readFileSync(file, 'utf8');

	// processing
	posthtml(plugins)
		.process(html)
		.then(function (result) {
			fs.writeFileSync(output, result.html);
		});
}

function isFile(outputPath) {
	if (outputPath === undefined) {
		return false;
	}
	return Boolean(path.extname(outputPath));
}

function getOutput(file) {
	if (argv.output === undefined) {
		return file;
	}
	return argv.output + path.basename(file);
}

function createFolder(outputPath) {
	if (isFile(outputPath) === true) {
		outputPath = path.dirname(outputPath);
	}

	if (pathExists.sync(outputPath) === false) {
		fs.mkdirSync(outputPath);
	}
}

globby(argv.input).then(function (files) {
	if (argv.output !== undefined) {
		createFolder(argv.output);
	}
	files.forEach(function (file) {
		var output = isFile(argv.output) ? argv.output : getOutput(file);
		processing(file, output);
	});
});
