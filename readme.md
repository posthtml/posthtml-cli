# posthtml-cli

[![node][node-image]][node-url]
[![NPM version][npm-image]][npm-url]

[![testen badge][testen-image]][testen-url]
[![Trasiv Build Status][travis-image]][travis-url]
[![AppVeyor Build Status][appveyor-img]][appveyor]

[![Coveralls Status][coveralls-image]][coveralls-url]

[![Dependency Status][depstat-image]][depstat-url]
[![DevDependency Status][depstat-dev-image]][depstat-dev-url]

[![XO code style][codestyle-image]][codestyle-url]

> Simple CLI for [PostHTML][posthtml-url]

## Install

```
npm install --global posthtml-cli
```

## Usage

```console
$ posthtml --help

    Usage
    posthtml [-o output-file/directory|-r] [-i input-file/directory] [--config|-c path/to/file/config] [--use|-u plugin]

    Options
    --config,  -c Path to JSON file                  [string]
    --output,  -o Output html file/folder result     [required]
    --input,   -i Input html file/folder             [required]
    --use,     -u Posthtml plugin name               [string]
    --replace, -r Replace input file(s)              [boolean]
    --help,    -h Show help                          [boolean]
    --version, -v Show version number                [boolean]    
```

## Config
*Default read options for plugins from package.json using [posthtml-load-plugins](https://github.com/michael-ciniawsky/posthtml-load-plugins)*

### ```package.json```

```json
{
    "name": "my project",
    "dependencies": {
        "posthtml-bem": "^0.2.2",
        "posthtml-each": "^1.0.1",
        "posthtml-include": "^1.0.2"
    },
    "devDependencies": {
        "posthtml-style-to-file": "^0.1.1"
    },
    "posthtml": {
        "bem": {
            "elemPrefix": "__",
            "modPrefix": "-",
            "modDlmtr": "--"
        },
        "include": {
            "root": "./",
            "encoding": "utf-8"
        },
        "styleToFile": {
            "path": "./dist/style.css"
        }
    }
}
```

### ```[name].[ext]```

#### ```JS```

```js
module.exports = {
    bem: {
        elemPrefix: '__',
        modPrefix: '-',
        modDlmtr: '--'
    },
    include: {
        root: './',
        encoding: 'utf-8'
    },
    styleToFile: {
        path: './dist/style.css'
    }
};
```

#### ```JSON```

```json
{
    "bem": {
        "elemPrefix": "__",
        "modPrefix": "-",
        "modDlmtr": "--"
    },
    "include": {
        "root": "./",
        "encoding": "utf-8"
    },
    "styleToFile": {
        "path": "./dist/style.css"
    }
}
```

## Examples

### Sample
```console
$ posthtml -o output.html -i input.html
```

### Options config
```console
$ posthtml -o output.html -i input.html -c posthtml.json
```

```console
$ posthtml -o output.html -i input.html -c posthtml.js
```

### Options use
```console
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
```console
$ posthtml -o outputFolder/ -i inputFolder/*.html
```

```console
$ posthtml -o outputFolder/ -i inputFolder/**/*.html
```

### Replace
```console
$ posthtml -i input.html -r
```

```console
$ posthtml -i inputFolder/*.html -r
```

## LICENSE

> MIT License (MIT)

>Copyright (c) Ivan Demidov <scrum@list.ru>

> Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

> The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

> THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE

[posthtml-url]: http://github.com/posthtml/posthtml

[node-url]: ""
[node-image]: https://img.shields.io/node/v/post-sequence.svg?maxAge=2592000&style=flat-square

[npm-url]: https://npmjs.org/package/posthtml-cli
[npm-image]: http://img.shields.io/npm/v/posthtml-cli.svg?style=flat-square

[testen-url]: https://github.com/egoist/testen
[testen-image]: https://img.shields.io/badge/testen-passing-brightgreen.svg?style=flat-square

[travis-url]: https://travis-ci.org/posthtml/posthtml-cli
[travis-image]: http://img.shields.io/travis/posthtml/posthtml-cli.svg?style=flat-square&label=unix

[appveyor]:     https://ci.appveyor.com/project/GitScrum/posthtml-cli
[appveyor-img]: https://img.shields.io/appveyor/ci/GitScrum/posthtml-cli.svg?style=flat-square&label=windows

[coveralls-url]: https://coveralls.io/r/posthtml/posthtml-cli
[coveralls-image]: http://img.shields.io/coveralls/posthtml/posthtml-cli.svg?style=flat-square

[depstat-url]: https://david-dm.org/posthtml/posthtml-cli
[depstat-image]: https://david-dm.org/posthtml/posthtml-cli.svg?style=flat-square

[depstat-dev-url]: https://david-dm.org/posthtml/posthtml-cli
[depstat-dev-image]: https://david-dm.org/posthtml/posthtml-cli/dev-status.svg?style=flat-square

[codestyle-url]: https://github.com/sindresorhus/xo
[codestyle-image]: https://img.shields.io/badge/code_style-XO-5ed9c7.svg?style=flat-square
