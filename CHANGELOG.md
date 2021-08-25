# ColorMaster Change Log

All notable changes to the [ColorMaster](https://github.com/lbragile/ColorMaster) module will be documented in this file.

## v1.1.1 - August 24, 2021

### Added

- Links to JSDoc of parsers

### Fixed

- `stringCMYK()` & `stringXYZ()` and respective parsing
- Alpha channel value parsing

### Changed

- ColorMaster logo
- README color space plugins section and `stringRGB()`, `stringHSL()`, `stringHEX()`

---

## v1.1.0 - August 18, 2021

### Added

- Simplified logic of CM constructor
- `LAB[A]` `HSV[A]`, `HWB[A]`, `XYZ[A]`, `LCH[A]`, `CMYK[A]` parsers - along with respective plugins - and fully tested them
- Community documents such as [CONTRIBUTING.md](https://github.com/lbragile/ColorMaster/blob/master/.github/CONTRIBUTING.md)
- Issue & PR templates

### Fixed

- README to include more plugin information
- `typeGuard` logic to be more specific in scope
- Logic in parsers for object clamping

### Changed

- Webpack to not give sourcemaps
- Produce ES and CommonJS modules during bundling
- Test CI [GitHub Action](https://github.com/lbragile/ColorMaster/actions/workflows/test.yml) to use a matrix build - test common NodeJS version in parallel
- Exports field in `package.json` to show in [bundlephobia](https://bundlephobia.com/package/colormaster@latest)
- Adjusted Jest config to reduce CLI command

---

## v1.0.0 - August 15, 2021

### Added

- Ability to extend plugins
- [Tree Shaking](https://webpack.js.org/guides/tree-shaking/) with Webpack
- Bundle size analyzer (webpack plugin) ← only runs in production build
- Harmony plugin
- Mix in [LCHA](https://en.wikipedia.org/wiki/HCL_color_space) space (needs work to be more accurate)
- `isValid()` function & format getter is more robust
- Conversion helper functions to different color spaces
- Option to `hexa()` for rounding
- Tests for conversions
- Ability to extend parsers → allows to extend ColorMaster instantiation by CSS name
- LABA, LCHA, XYZA, HSVA conversion logic to and from RGBA
- `static Parsers` property to simplify logic
- Community related files & templates for issues/PRs
- Mixing (plugin) & tests
- Parsing tests
- Types to color Records so that they give intellisense

### Fixed

- Negative hue parsing
- Closest color logic by adding helper functions. Added `random()` outside of ColorMaster class. Start of `mix()` - working on RGBtoLAB & RGBtoLCH
- Improved parsers (RegExp)
- Fixed Jest config & adjusted coverage thresholds to be at **least 95%**
- README to reflect the refactor

### Changed

- Refactor to only use RGB behind the scene
- Parser functionality to be more general (better RegExp)
- All accessibility functions are now more general (independent of input format)
- `ColorMaster` class to make it default export a function that returns an instance
- Opts to be alpha for some method
- Separated parsers from conversion logic

### Removed

- Redundant typing on class method opts objects

---

## v0.1.0 - August 1, 2021

### Added

- Functionality and tests for:

  - `rotation`
  - `format`
  - `name`
  - `random`
  - `brightness`
  - `luminance`
  - `isDark`
  - `isLight`
  - `contrast`
  - `readableOn`
  - `equalTo`
  - `harmony` ([color harmonies](https://www.tigercolor.com/color-lab/color-theory/color-theory-intro.htm))
  - `isWarm`
  - `isCool`
  - `isTinted`
  - `isShaded`
  - `isToned`
  - `isPureHue`
  - `closestPureHue`
  - `closestWebSafe` ([web safe](https://www.rapidtables.com/web/color/Web_Safe.html))
  - `closestWarm`
  - `closestCool`

- README documentation for API
- Support for 3/4-digit HEX
- Size check GitHub action

### Fixed

- Tests to provide more coverage (100% coverage)
- `random()` and `fromName()` to generate RGB color instance which user can convert using `hsl()` or `hex()`
- Edge cases in `colormaster` class when generating color instances
- GitHub actions scripts

### Changed

- Getter & Setter function names to be more general
- `name()` function to search by name exactly or approximately
- `HSLAFrom()` to allow user to use CSS Name instead of number for hue channel

### Removed

- Benchmark tests as they are not meaningful enough
- Packages related to benchmark script

---

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

## v0.0.2 to v0.0.6 - July 24, 2021

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
