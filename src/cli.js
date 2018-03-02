#!/usr/bin/env node

import path from 'path';
import fs from 'fs';
import fg from 'fast-glob';
import meow from 'meow';
import makeDir from 'make-dir';
import posthtml from 'posthtml';
import load from 'post-load-plugins';
import outResolve from './out-resolve';
import cfgResolve from './cfg-resolve';

const cli = meow(`
  Usage: posthtml <patterns>

  Options:
    --output -o    Output File or Folder
    --config -c    Path to config file
    --use -u       PostHTML plugin name
    --help -h      CLI Help
    --auto-off     Disable automatically loads plug-ins with configuration from package.json
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
      type: 'Array',
      alias: 'u'
    }
  }
});

const read = file => new Promise(resolve => fs.readFile(file, 'utf8', (err, data) => {
  if (err) {
    console.warn(err);
  }
  resolve(data);
}));

const processing = async file => {
  const output = await outResolve(file, cli.flags.output);
  const config = await cfgResolve(cli.flags);

  makeDir(path.dirname(output))
    .then(read.bind(null, file))
    .then(html => posthtml(load(config)).process(html))
    .then(({html}) => {
      fs.writeFile(output, html, err => {
        if (err) {
          console.warn(err);
        }
        console.log(`The file ${file} has been saved!`);
      });
    });
};

fg.stream(cli.input)
  .on('data', processing)
  .once('error', console.warn);
