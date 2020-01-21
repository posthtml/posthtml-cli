#!/usr/bin/env node

import path from 'path';
import fs from 'fs';
import fg from 'fast-glob';
import meow from 'meow';
import makeDir from 'make-dir';
import posthtml from 'posthtml';
import outResolve from './out-resolve';
import cfgResolve from './cfg-resolve';

const cli = meow(`
  Usage: posthtml <patterns>

  Options:
    --output -o    Output File or Folder
    --config -c    Path to config file
    --use -u       PostHTML plugin name
    --help -h      CLI Help
    --version -v   CLI Version

  Examples:
    $ posthtml input.html
    $ posthtml input.html -o output.html
    $ posthtml inputFolder/*.html !unicorn.html
    $ posthtml input.html -o output.html -c posthtml.js
    $ posthtml input.html -o output.html -u posthtml-bem --posthtml-bem.elemPrefix __
    $ posthtml inputFolder/*.html -o outputFolder
    $ posthtml inputFolder/**/*.html -o outputFolder
`, {
  flags: {
    config: {
      type: 'string',
      alias: 'c'
    },
    version: {
      type: 'boolean',
      alias: 'v'
    },
    help: {
      type: 'boolean',
      alias: 'h'
    },
    output: {
      type: 'string',
      alias: 'o'
    },
    use: {
      type: 'array',
      alias: 'u'
    }
  }
});

const read = file => new Promise(resolve => fs.readFile(file, 'utf8', (error, data) => {
  if (error) {
    console.warn(error);
  }

  resolve(data);
}));

const getPlugins = config => Object.keys(config.plugins || {})
  .map(plugin => require(plugin)(config.plugins[plugin]));

const config = cfgResolve(cli);

const processing = async file => {
  const output = await outResolve(file, config.output);
  const plugins = Array.isArray(config.plugins) ? config.plugins : getPlugins(config);

  makeDir(path.dirname(output))
    .then(read.bind(null, file))
    .then(html => posthtml(plugins).process(html))
    .then(({html}) => {
      fs.writeFile(output, html, error => {
        if (error) {
          console.warn(error);
        }

        console.log(`The file ${file} has been saved!`);
      });
    });
};

fg.stream(config.input)
  .on('data', processing)
  .once('error', console.warn);
