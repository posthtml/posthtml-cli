#!/usr/bin/env node

var path = require('path')
var fs = require('fs')
var posthtml = require('posthtml')
var globby = require('globby')
var pathExists = require('path-exists')
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
  .config('c')
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
  var html = fs.readFileSync(file, 'utf8')
  var ext = {}

  // create config extends for post-load-plugins
  if (argv.use) {
    argv.use.forEach(function (plugin) {
      ext[plugin] = argv[plugin] || {}
    })
  }

  // processing
  posthtml(require('post-load-plugins')(argv.config, ext))
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

  if (pathExists.sync(outputPath) === false) {
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
