# posthtml-cli
> Command line interface for [PostHTML][posthtml-url]

[![node][node-image]][node-url][![NPM version][npm-image]][npm-url][![Trasiv Build Status][travis-image]][travis-url][![AppVeyor Build Status][appveyor-img]][appveyor][![Coveralls Status][coveralls-image]][coveralls-url][![Dependency Status][depstat-image]][depstat-url][![XO code style][style]][style-url]

[![npm downloads](https://img.shields.io/npm/dm/posthtml-cli.svg?style=flat-square)](https://www.npmjs.com/package/posthtml-cli)[![npm](https://img.shields.io/npm/dt/posthtml-cli.svg?style=flat-square)](https://www.npmjs.com/package/posthtml-cli)[![Package Quality](http://npm.packagequality.com/shield/posthtml-cli.svg?style=flat-square)](http://packagequality.com/#?package=posthtml-cli)

## Install

```bash
$ npm install --global posthtml-cli
```
> **Note:** This project is compatible with node v4+

## Usage  
```bash
$ posthtml [-o output-file/directory|-r] [-i input-file/directory] [OPTIONS]
```
> **Note:** Automatically loads plug-ins with configuration from package.json using [post-load-plugins](https://github.com/post-org/post-load-plugins) if not used `--config` key

## Options
|Name|Type|Default|Description|
|:----|:--:|:-----:|:---------|
|`-o, --output`|`{String}`|`undefined`|Output File or Folder|
|`-r, --replace`|`{Boolean}`|`false`|Replace Input File or Files in Input Folder|
|`-i, --input`|`{String}`|`undefined`|Input File or Folder|
|`-c, --config`|`{String}`|`dirname(package.json)`|Path to config file `config.[js|json]`|
|`--auto-off`|`{Boolean}`|`false`|Disable automatically loads plug-ins with configuration from package.json|
|`-u, --use`|`{Array}`|`[]`|PostHTML plugin name|
|`-h, --help`|`{Boolean}`|`false`|CLI Help|
|`-v, --version`|`{Boolean}`|`false`|CLI Version|

## Examples

### Sample
```bash
$ posthtml -o output.html -i input.html
```

### Options config
```bash
$ posthtml -o output.html -i input.html -c posthtml.json
```

```bash
$ posthtml -o output.html -i input.html -c posthtml.js
```

### Options use
```bash
$ posthtml 
    -o output.html 
    -i input.html 
    -c config.json 
    -u posthtml-bem 
    --posthtml-bem.elemPrefix __
    --posthtml-bem.elemMod _
    -u posthtml-css-modules
    --posthtml-css-modules path/to/json
    -u posthtml-custom-elements
```

### Read dir
```bash
$ posthtml -o outputFolder/ -i inputFolder/*.html
```

```bash
$ posthtml -o outputFolder/ -i inputFolder/**/*.html
```

### Replace
```bash
$ posthtml -i input.html -r
```

```bash
$ posthtml -i inputFolder/*.html -r
```

### License [MIT](license)

[posthtml-url]: http://github.com/posthtml/posthtml

[node-url]: ""
[node-image]: https://img.shields.io/node/v/post-sequence.svg?maxAge=2592000&style=flat-square

[npm-url]: https://npmjs.org/package/posthtml-cli
[npm-image]: http://img.shields.io/npm/v/posthtml-cli.svg?style=flat-square

[testen-url]: https://github.com/egoist/testen
[testen-image]: https://img.shields.io/badge/testen-passing-brightgreen.svg?style=flat-square

[travis-url]: https://travis-ci.org/posthtml/posthtml-cli
[travis-image]: http://img.shields.io/travis/posthtml/posthtml-cli/master.svg?style=flat-square&label=unix

[appveyor]:     https://ci.appveyor.com/project/GitScrum/posthtml-cli
[appveyor-img]: https://img.shields.io/appveyor/ci/GitScrum/posthtml-cli/master.svg?style=flat-square&label=windows

[coveralls-url]: https://coveralls.io/r/posthtml/posthtml-cli
[coveralls-image]: http://img.shields.io/coveralls/posthtml/posthtml-cli.svg?style=flat-square

[depstat-url]: https://david-dm.org/posthtml/posthtml-cli
[depstat-image]: https://david-dm.org/posthtml/posthtml-cli.svg?style=flat-square

[depstat-dev-url]: https://david-dm.org/posthtml/posthtml-cli
[depstat-dev-image]: https://david-dm.org/posthtml/posthtml-cli/dev-status.svg?style=flat-square

[style-url]: https://github.com/sindresorhus/xo
[style]: https://img.shields.io/badge/code_style-XO-5ed9c7.svg?style=flat-square
