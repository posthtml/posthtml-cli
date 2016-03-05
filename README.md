# posthtml-cli

[![NPM version][npm-image]][npm-url][![Trasiv Build Status][travis-image]][travis-url][![AppVeyor Build Status][appveyor-img]][appveyor][![Coveralls Status][coveralls-image]][coveralls-url][![Dependency Status][depstat-image]][depstat-url][![DevDependency Status][depstat-dev-image]][depstat-dev-url][![XO code style][codestyle-image]][codestyle-url]

> CLI for [PostHTML][posthtml-url]

## Install

```
npm install --global posthtml-cli
```

## Usage

```
$ posthtml --help

  Usage
	posthtml --output|-o output.html --input|-i input.html

  Options
	--config,  -c Path to JSON file           [string]
	--output,  -o Output html file result     [required]
	--input,   -i Input html file             [required]
	--help,    -h Show help                   [boolean]
	--version, -v Show version number         [boolean]
  
  Example
	posthtml -o output.html -i input.html
```

*Default read config in package.json*
```json
  "name": "my project",
  "posthtml": {
	"require": ["posthtml-custom-elements"]
  }
```

## License
MIT

[posthtml-url]: http://github.com/posthtml/posthtml

[npm-url]: https://npmjs.org/package/posthtml-cli
[npm-image]: http://img.shields.io/npm/v/posthtml-cli.svg?style=flat-square

[travis-url]: https://travis-ci.org/GitScrum/posthtml-cli
[travis-image]: http://img.shields.io/travis/GitScrum/posthtml-cli.svg?style=flat-square&label=unix

[appveyor]:     https://ci.appveyor.com/project/GitScrum/posthtml-cli
[appveyor-img]: https://img.shields.io/appveyor/ci/GitScrum/posthtml-cli.svg?style=flat-square&label=windows

[coveralls-url]: https://coveralls.io/r/GitScrum/posthtml-cli
[coveralls-image]: http://img.shields.io/coveralls/GitScrum/posthtml-cli.svg?style=flat-square

[depstat-url]: https://david-dm.org/GitScrum/posthtml-cli
[depstat-image]: https://david-dm.org/GitScrum/posthtml-cli.svg?style=flat-square

[depstat-dev-url]: https://david-dm.org/GitScrum/posthtml-cli
[depstat-dev-image]: https://david-dm.org/GitScrum/posthtml-cli/dev-status.svg?style=flat-square

[codestyle-url]: https://github.com/sindresorhus/xo
[codestyle-image]: https://img.shields.io/badge/code_style-XO-5ed9c7.svg?style=flat-square
