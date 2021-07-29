# ColorMaster Change Log

All notable changes to the [ColorMaster](https://github.com/lbragile/ColorMaster) module will be documented in this file.

## v0.0.7 - July 28, 2021

### Added

- HSLA and HEXA color-spaces (with tests)
- Implementation interfaces to reduce complexity of implementation scripts (less comments)
- Getter and Setter functions for arrays of object instances
- [Webpack](https://webpack.js.org/) to create a production build
- `npm dedupe` to the pre-commit hook and post-commit/pre-push hooks
- Functionality such as invert, saturate/desaturate, lightness/darkness, grayscale
- Full testing of saturation/de-saturation, lighter/darker, grayscale in all color-spaces
- NPM scripts for releasing a publication of the module - patch, minor, major

### Fixed

- Logic in HEXA & HSLA color-spaces that produced invalid conversions
- Logic in class methods to use getter and setter functions rather than accessing private variables

### Changed

- Type file extensions to `.d.ts` - adjusted npm scripts accordingly
- Release script to have pre and post
- Default options from `false` to `true` as returning alpha in string is more common
- Updated README & documentation

### Removed

- Throw statements (errors) by using simple validation/setting to default values

---

## v0.0.2 → v0.0.6 - July 24, 2021

### Added

- NPM scripts to handle the module publication in a smoother and more proper manner

---

## v0.0.1 - July 24, 2021

### Added

- Wrapper overloads to RGBColors class to let user instantiate RGB(A) objects in 4 different ways
- [Continuous Integration](https://github.com/lbragile/ColorMaster/actions)
- Testing
- Linting and format checking scripts
- Github workflows
- README (with logo)
- Pre-commit hook to lint and format
- Pre-push hook to test
- Benchmark testing
- Documentation with [Typedoc](https://typedoc.org/)
- [np](https://www.npmjs.com/package/np) for automated publishing

### Changed

- Class method names to better reflect functionality
