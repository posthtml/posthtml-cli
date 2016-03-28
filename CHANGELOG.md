## [0.0.22] - 23-03-2016
## Added 
- Added #16, replace file(s)
- Added #9, read filed in folder and transform to folder

## [0.0.22] - 23-03-2016
## Added 
- Added test with indent
- Added node support in package.json

## Fixed
- Fixed #53, coverage for windows

## Removed
- Fixed #56, support node 0.12

## [0.0.21] - 21-03-2016
### Fixed
- Fixed #51, tests, update posthtml-load-plugins

## [0.0.20] - 21-03-2016
### Fixed
- Fixed #49, tests, update posthtml-load-plugins

## [0.0.19] - 21-03-2016
### Change
- Update #41, load pkg now used posthtml-load-plugins

## [0.0.18] - 13-03-2016
### Change
- Update #45, devDep

## [0.0.17] - 13-03-2016
### Fixed
- Fixed #39, update pkg

### Removed
- tmp fix for issue #34

## [0.0.16] - 09-03-2016
### Added 
- Added tmp fix for issue #34

### Change
- Update Readme, description for config
- Update #38, test, double code

## [0.0.15] - 05-03-2016
### Added 
- Added #29, usage description

### Change
- Update #33, devDep

### Fixed
- Fixed #32, resolved test for unix (change cmod in git)
- Fixed #34, fixed test after update devDep and plugins

## [0.0.14] - 29-02-2016
### Added 
- Added #26, travis config
- Added #27, coveralls
- Added pkg for test
  - execa
  - read-pkg
  - temp-write
  - posthtml-custom-elements
- Added config for posthtml-cli in package.json for testing

### Change
- Update #25, dev & devDep
- Update test run, remove nyc (breaks the tests)
- Update successor
  - change usage syntax
  - change reauireArg to demand
  - update get version
  - remove check, not need, i used demand

### Fixed
- Fixed xo report error


## [0.0.13] - 17-02-2016
### Change
- Update #21, update yargvs to v4.10
- Update #22, used pkgConf from yargs

### Removed
- Removed #22, pkg-conf from package.json, see update #22
- Removed #22, pkg-conf get config, see update #22

## [0.0.12] - 03-02-2016
### Fixed
- Fixed #18, argument check failed
- Fixed xo report error

## [0.0.11] - 26-01-2016
### Fixed
- Fixed #18, failed when check input argument
- Fixed xo report error

### Change
- Update dev and devDep

## [0.0.11] - 26-01-2016
### Added
- Added check input arguments

### Change
- Fixed #12, Update ava to v0.11.0

### Fixed
- Fixed #13, No such file or directory, unix system

## [0.0.10] - 21-01-2016
### Added
- testing xo before push

### Fixed
- Fixed bug #10, Cannot read property `map` of undefined

## [0.0.9] - 20-01-2016
### Changed
- update read config for plugins

## [0.0.8] - 20-01-2016
### Fixed
- Fixed bug #7, cannot read property ... in undefined 

## [0.0.7] - 20-01-2016
### Fixed
- Fixed bug #5

## [0.0.6] - 20-01-2016
### Added
- read castom config file or config in package.json

### Fixed
- Fixed not read other config file

## [0.0.5] - 20-01-2016
### Fixed
- Fixed errors from xo

## [0.0.4] - 20-01-2016
### Added
- added support config for custom required plugins

## [0.0.3] - 19-01-2016
### Added
- index.js the germ of the config

### Change
- update default example

## [0.0.2] - 19-01-2016
### Added
- index.js the germ of the kernel

## [0.0.1] - 19-01-2016
### Added
- nyc to devDep

### Change
- index.js convert end line to unix
- index.js first described argvs

## [0.0.0] - 18-01-2016
### Added
- changelog
- npm initial
- .gitignore
- .editconfig
- bin
