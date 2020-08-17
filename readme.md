# posthtml-cli

> [PostHTML][posthtml-url] сommand line interface

[![Actions Status](https://github.com/posthtml/posthtml-cli/workflows/Actions%20Status/badge.svg?style=flat-square)](https://github.com/posthtml/posthtml-cli/actions?query=workflow%3A%22CI+tests%22)[![node][node-image]][node-url][![NPM version][npm-image]][npm-url][![Dependency Status][depstat-image]][depstat-url][![XO code style][style]][style-url][![Coveralls Status][coveralls-image]][coveralls-url]

[![npm downloads][npm-download-image]][npm-download-url][![npm][npm-total-download-image]][npm-total-download-url][![Package Quality][pkg-q-image]][pkg-q-url]

## Install

```bash
$ npm install --global posthtml-cli
```

> Note: This project is compatible with node v10+

## Usage

```bash
$ posthtml --help

  Usage:
    $ posthtml <patterns>

  Options:
    --output -o      Output File or Folder
    --config -c      Path to config file
    --use -u         PostHTML plugin name
    --root -r        Mirror the directory structure relative to this path in the output directory(default: .)
    --allInOutput -a Save the nesting structure for output
    --help -h        CLI Help
    --version -v     CLI Version

  Examples:
    $ posthtml input.html
    $ posthtml input.html -o output.html
    $ posthtml inputFolder/*.html !unicorn.html
    $ posthtml input-one.html input-two.html -o outputFolder
    $ posthtml input.html -o output.html -c posthtml.js
    $ posthtml input.html -o output.html -u posthtml-bem --posthtml-bem.elemPrefix __
    $ posthtml inputFolder/*.html -o outputFolder
    $ posthtml inputFolder/**/*.html -o outputFolder -a
    $ posthtml inputFolder/**/*.html -o outputFolder -a -r inputFolder
```

## Options

```json
{
  "input": "src/*.html",
  "output": "dist",
  "plugins": {
    "posthtml-plugin-name": {
      "property": "value"
    }
  }
};
```

> example config _`.posthtmlrc`_

[posthtml-url]: http://github.com/posthtml/posthtml
[pkg-q-url]: http://packagequality.com/#?package=posthtml-cli
[pkg-q-image]: http://npm.packagequality.com/shield/posthtml-cli.svg?style=flat-square
[npm-total-download-url]: https://www.npmjs.com/package/posthtml-cli
[npm-total-download-image]: https://img.shields.io/npm/dt/posthtml-cli.svg?style=flat-square
[npm-download-url]: https://www.npmjs.com/package/posthtml-cli
[npm-download-image]: https://img.shields.io/npm/dm/posthtml-cli.svg?style=flat-square
[node-url]: ""
[node-image]: https://img.shields.io/node/v/posthtml-cli.svg?maxAge=2592000&style=flat-square
[npm-url]: https://npmjs.org/package/posthtml-cli
[npm-image]: http://img.shields.io/npm/v/posthtml-cli.svg?style=flat-square
[testen-url]: https://github.com/egoist/testen
[testen-image]: https://img.shields.io/badge/testen-passing-brightgreen.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/posthtml/posthtml-cli
[coveralls-image]: http://img.shields.io/coveralls/posthtml/posthtml-cli.svg?style=flat-square
[depstat-url]: https://david-dm.org/posthtml/posthtml-cli
[depstat-image]: https://david-dm.org/posthtml/posthtml-cli.svg?style=flat-square
[depstat-dev-url]: https://david-dm.org/posthtml/posthtml-cli
[depstat-dev-image]: https://david-dm.org/posthtml/posthtml-cli/dev-status.svg?style=flat-square
[style-url]: https://github.com/sindresorhus/xo
[style]: https://img.shields.io/badge/code_style-XO-5ed9c7.svg?style=flat-square
