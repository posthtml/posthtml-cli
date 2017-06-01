#!/usr/bin/env node

var path = require('path')
var fs = require('fs')
var posthtml = require('posthtml')
var globby = require('globby')
var argv = require('yargs')
  .usage('Usage: $0 [-o output-file/directory|-r] [-i input-file/directory] [--config|-c path/to/file/config]')
  .example('posthtml -o output.html -i input.html', 'Default example')
  .alias('i', 'input')
  .array('input')
  .demand(['i'])
  .alias('o', 'output')
  .alias('r', 'replace')
  .alias('u', 'use')
  .array('use')
  .pkgConf('posthtml')
  .config()
  .alias('c', 'config')
  .version(function () {
    return require('./package.json').version
  })
  .alias('v', 'version')
  .help('h')
  .alias('h', 'help')
  .check(function (argv) {
    if (argv.output && argv.replace) {
      throw new Error('Both `output file` and `replace` provided: please use either --output or --replace option.')
    }
    if (!argv.output && !argv.replace) {
      throw new Error('Both `output file` and `replace` missing: please use either --output or --replace option.')
    }
    return true
  })
  .argv

function processing(file, output) {
  // get htmls
  const html = fs.readFileSync(file, 'utf8')
  let plugins;

  console.log(argv);

  if (argv.autoOff) {
    const use = argv.use ? argv.use : [];
    const cfg = argv.config ? Object.keys(require(path.resolve(argv.config))) : [];
    plugins = [].concat(use, cfg).map((plugin) => {
      try {
          return require(plugin)(argv[plugin])
      } catch (e) {
          if (err.code === 'MODULE_NOT_FOUND') {
            throw new TypeError(`Plugin Error: Cannot find module '${plugin}'`);
          }
      }
    });
  } else {
    // config
    var config = {}

    // create config extends for post-load-plugins
    if (argv.use) {
      argv.use.forEach(function (plugin) {
        config[plugin] = argv[plugin] || {}
      })
    }

    if (argv.config) {
      config = Object.assign(require(path.resolve(argv.config)), config)
    }
  }

  // processing
  posthtml(argv.autoOff ? plugins : require('post-load-plugins')(config))
    .process(html)
    .then(function (result) {
      fs.writeFileSync(output, result.html)
    })
}

function isFile(outputPath) {
  if (outputPath === undefined) {
    return false
  }
  return Boolean(path.extname(outputPath))
}

function getOutput(file) {
  if (argv.output === undefined) {
    return file
  }
  return argv.output + path.basename(file)
}

function createFolder(outputPath) {
  if (isFile(outputPath) === true) {
    outputPath = path.dirname(outputPath)
  }

  if (fs.existsSync(outputPath) === false) {
    fs.mkdirSync(outputPath)
  }
}

globby(argv.input).then(function (files) {
  if (argv.output !== undefined) {
    createFolder(argv.output)
  }

  files.forEach(function (file) {
    var output = isFile(argv.output) ? argv.output : getOutput(file)
    processing(file, output)
  })
})
