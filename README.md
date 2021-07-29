<!-- markdownlint-disable no-inline-html -->
<!-- markdownlint-disable first-line-heading -->
<div align="center">
  <a href="https://github.com/lbragile/ColorMaster">
    <img src="public/logo.png" width="200" height="200" alt="ColorMaster Logo" />
  </a>
</div>

<div align="center">
  <a href="https://www.npmjs.com/package/colormaster">
    <img alt="package version" src="https://img.shields.io/npm/v/colormaster?label=NPM&logo=npm&style=flat-square" />
  </a>
  <a href="https://github.com/lbragile/ColorMaster/actions">
    <img alt="build status" src="https://img.shields.io/github/workflow/status/lbragile/ColorMaster/Testing?color=%2300D800&label=Build&logo=github&style=flat-square" />
  </a>
  <a href="https://codecov.io/gh/lbragile/ColorMaster">
    <img alt='code coverage' src="https://img.shields.io/codecov/c/github/lbragile/colormaster/develop?color=%2300D800&label=Coverage&logo=codecov&style=flat-square"/>
  </a>
  <a href="https://www.codefactor.io/repository/github/lbragile/colormaster">
    <img alt="code quality" src="https://img.shields.io/codefactor/grade/github/lbragile/ColorMaster/develop?color=%2300D800&label=Code%20Quality&logo=codefactor&style=flat-square" />
  </a>
</div>

<div align="center">
  <strong>ColorMaster</strong> is a powerful and fully typed module for all your coloring needs.
</div>
<!-- markdownlint-enable first-line-heading -->
<!-- markdownlint-enable no-inline-html -->

## ⭐ Getting Started

```markdown
npm install colormaster
```

Then simply start using **ColorMaster** in your project:

<!-- markdownlint-disable no-inline-html -->
<details open>
<summary><b>RGBA</b> Color Space</summary>

```ts
import CM from "colormaster";

// object argument
CM.RGBAFrom({ r: 128, g: 128, b: 128 }).string({ quotes: "double" }); // "rgba(128, 128, 128, 1)"
CM.RGBAFrom({ r: 128, g: 128, b: 128, a: 0.5 }).string(); // 'rgba(128, 128, 128, 0.5)' ← note, single quote
CM.RGBAFrom({ r: 128, g: 128, b: 128, a: 0.5 }).string({ withAlpha: false }); // 'rgb(128, 128, 128)'
CM.RGBAFrom({ r: 128, g: 128, b: 128, a: 0.5 }).alphaTo(0.8).string(); // 'rgba(128, 128, 128, 0.8)'

// array argument
CM.RGBAFrom([128, 128, 128]).string({ quotes: "double" }); // "rgba(128, 128, 128, 1)"
CM.RGBAFrom([128, 128, 128, 0.5]).string(); // 'rgba(128, 128, 128, 0.5)' ← note, single quote
CM.RGBAFrom([128, 128, 128, 0.5]).string({ withAlpha: false }); // 'rgb(128, 128, 128)'
CM.RGBAFrom([128, 128, 128, 0.5]).alphaTo(0.8).string(); // 'rgba(128, 128, 128, 0.8)'

// string argument
CM.RGBAFrom("128, 128, 128").string({ quotes: "double" }); // "rgba(128, 128, 128, 1)"
CM.RGBAFrom("rgb(128, 128, 128)").string({ quotes: "double" }); // "rgba(128, 128, 128, 1)"
CM.RGBAFrom("128, 128, 128, 0.5").string(); // 'rgba(128, 128, 128, 0.5)' ← note, single quote
CM.RGBAFrom("128, 128, 128, 0.5").string({ withAlpha: false }); // 'rgb(128, 128, 128)'
CM.RGBAFrom("128, 128, 128, 0.5").alphaTo(0.8).string(); // 'rgba(128, 128, 128, 0.8)'
CM.RGBAFrom("rgba(128, 128, 128, 0.5)").alphaTo(0.8).string(); // 'rgba(128, 128, 128, 0.8)'

// list of values as arguments
CM.RGBAFrom(128, 128, 128).string({ quotes: "double" }); // "rgba(128, 128, 128, 1)"
CM.RGBAFrom(128, 128, 128, 0.5).string(); // 'rgba(128, 128, 128, 0.5)' ← note, single quote
CM.RGBAFrom(128, 128, 128, 0.5).string({ withAlpha: false }); // 'rgb(128, 128, 128)'
CM.RGBAFrom(128, 128, 128, 0.5).alphaTo(0.8).string(); // 'rgba(128, 128, 128, 0.8)'
```

</details>

<details>
<summary><b>HSLA</b> Color Space</summary>

```ts
import CM from "colormaster";

// object argument
CM.HSLAFrom({ h: 300, s: 50, l: 60 }).string({ quotes: "double" }); // "hsla(300, 50%, 60%, 1)"
CM.HSLAFrom({ h: 300, s: 50, l: 60, a: 0.5 }).string(); // 'hsla(300, 50%, 60%, 0.5)' ← note, single quote
CM.HSLAFrom({ h: 300, s: 50, l: 60, a: 0.5 }).string({ withAlpha: false }); // 'hsl(300, 50%, 60%)'
CM.HSLAFrom({ h: 300, s: 50, l: 60, a: 0.5 }).alphaTo(0.8).string(); // 'hsla(300, 50%, 60%, 0.8)'

// array argument
CM.HSLAFrom([300, 50, 60]).string({ quotes: "double" }); // "hsla(300, 50%, 60%, 1)"
CM.HSLAFrom([300, 50, 60, 0.5]).string(); // 'hsla(300, 50%, 60%, 0.5)' ← note, single quote
CM.HSLAFrom([300, 50, 60, 0.5]).string({ withAlpha: false }); // 'hsl(300, 50%, 60%)'
CM.HSLAFrom([300, 50, 60, 0.5]).alphaTo(0.8).string(); // 'hsla(300, 50%, 60%, 0.8)'

// string argument
CM.HSLAFrom("300, 50%, 60%").string({ quotes: "double" }); // "hsla(300, 50%, 60%, 1)"
CM.HSLAFrom("hsl(300, 50%, 60%)").string({ quotes: "double" }); // "hsl(300, 50%, 60%, 1)"
CM.HSLAFrom("300, 50%, 60, 0.5").string(); // 'hsla(300, 50%, 60%, 0.5)' ← note, single quote
CM.HSLAFrom("300, 50, 60%, 0.5").string({ withAlpha: false }); // 'hsl(300, 50%, 60%)'
CM.HSLAFrom("300, 50%, 60%, 0.5").alphaTo(0.8).string(); // 'hsla(300, 50%, 60%, 0.8)'
CM.HSLAFrom("hsla(300, 50%, 60%, 0.5)").alphaTo(0.8).string(); // 'hsla(300, 50%, 60%, 0.8)'

// list of values as arguments
CM.HSLAFrom(300, 50, 60).string({ quotes: "double" }); // "hsla(300, 50%, 60%, 1)"
CM.HSLAFrom(300, 50, 60, 0.5).string(); // 'hsla(300, 50%, 60%, 0.5)' ← note, single quote
CM.HSLAFrom(300, 50, 60, 0.5).string({ withAlpha: false }); // 'hsl(300, 50%, 60%)'
CM.HSLAFrom(300, 50, 60, 0.5).alphaTo(0.8).string(); // 'hsla(300, 50%, 60%, 0.8)'
```

</details>

<details>
<summary><b>HEXA</b> Color Space</summary>

```ts
import CM from "colormaster";

// object argument
CM.HEXAFrom({ r: "44", g: "55", b: "66" }).string({ quotes: "double" }); // "#445566FF)"
CM.HEXAFrom({ r: "44", g: "55", b: "66", a: "77" }).string(); // '#44556677' ← note, single quote
CM.HEXAFrom({ r: "44", g: "55", b: "66", a: "77" }).string({ withAlpha: false }); // '#445566'
CM.HEXAFrom({ r: "44", g: "55", b: "66", a: "77" }).alphaTo("CC").string(); // '#445566CC'

// array argument
CM.HEXAFrom(["44", "55", "66"]).string({ quotes: "double" }); // "#445566FF"
CM.HEXAFrom(["44", "55", "66", "77"]).string(); // '#44556677' ← note, single quote
CM.HEXAFrom(["44", "55", "66", "77"]).string({ withAlpha: false }); // '#445566'
CM.HEXAFrom(["44", "55", "66", "77"]).alphaTo("CC").string(); // '#445566CC'

// string argument
CM.HEXAFrom("44", "55", "66").string({ quotes: "double" }); // "#445566FF"
CM.HEXAFrom("#445566").string({ quotes: "double" }); // "#445566FF"
CM.HEXAFrom("44, 55, 66, 77").string(); // '#44556677' ← note, single quote
CM.HEXAFrom("44, 55, 66, 77").string({ withAlpha: false }); // '#445566'
CM.HEXAFrom("44, 55, 66, 77").alphaTo("CC").string(); // '#445566CC'
CM.HEXAFrom("#44556677").alphaTo("CC").string(); // '#445566CC'

// list of values as arguments
CM.HEXAFrom("44", "55", "66").string({ quotes: "double" }); // "#445566FF"
CM.HEXAFrom("44", "55", "66", "77").string(); // '#44556677' ← note, single quote
CM.HEXAFrom("44", "55", "66", "77").string({ withAlpha: false }); // '#445566'
CM.HEXAFrom("44", "55", "66", "77").alphaTo("CC").string(); // '#445566CC'
```

**Note:** HEXA string are always returned in _upperCase_ by **ColorMaster**. If you prefer _lowerCase_ strings,
you can simply use (chain) the built in `toLowerCase()`. More information is available [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/toLowerCase)

</details>

<!-- markdownlint-enable no-inline-html -->

## 😍 Strongly Typed

Rather than using pure JavaScript which can lead to hard to debug errors during development, **ColorMaster** was written in [TypeScript](https://www.typescriptlang.org/) (strict mode) to provide a pleasant development experience.

The type definitions are included with the module, so you get intellisense right out of the box.

Additionally, **ColorMaster** exports all of its types and interfaces so that you can use them in your code.

```ts
import { Irgb, Irgba, Ihex, Ihexa, Ihsl, Ihsla } from "colormaster";

let rgb: Irgb;
rgb = { r: 128, g: 128, b: 128 }; // OK
rgb = { r: 128, g: 128, b: 128, a: 0.5 }; // ERROR
rgb = { red: 128, green: 128, blue: 128 }; // ERROR

let rgba: Irgba;
rgba = { r: 128, g: 128, b: 128, a: 0.5 }; // OK
rgba = { r: 128, g: 128, b: 128 }; // ERROR
rgba = { r: 128, g: 128, b: 128, alpha: 0.5 }; // ERROR

/* -------------------------------------------- */

let hex: Ihex;
hex = { r: "AA", g: "BB", b: "CC" }; // OK
hex = { r: "AA", g: "BB", b: "CC", a: "DD" }; // ERROR
hex = { red: "AA", green: "BB", blue: "CC" }; // ERROR

let hexa: Ihexa;
hexa = { r: "AA", g: "BB", b: "CC", a: "DD" }; // OK
hexa = { r: "AA", g: "BB", b: "CC" }; // ERROR
hexa = { r: "AA", g: "BB", b: "CC", alpha: "DD" }; // ERROR

/* -------------------------------------------- */

let hsl: Ihsl;
hsl = { h: 240, s: 50, l: 75 }; // OK
hsl = { h: 240, s: 50, l: 75, a: 0.5 }; // ERROR
hsl = { hue: 240, saturation: 50, lightness: 75 }; // ERROR

let hsla: Ihsla;
hsla = { h: 240, s: 50, l: 75, a: 0.5 }; // OK
hsla = { h: 240, s: 50, l: 75 }; // ERROR
hsla = { h: 240, s: 50, l: 75, alpha: 0.5 }; // ERROR
```

## 📕 Documentation [![Documentation](https://img.shields.io/badge/Documentation-available-brightgreen?color=00D800&style=flat-square&logo=github)](https://lbragile.github.io/ColorMaster/)

- API documentation can be found on [our documentation site](https://lbragile.github.io/ColorMaster/).
- A more in depth guide can be seen in [our Wikis](https://github.com/lbragile/ColorMaster/wiki).

## 📈 Roadmap & Tasks

Visit our [automated Kanban](https://github.com/lbragile/ColorMaster/projects) for a detailed overview of the features/tasks that need to be added to ColorMaster in the near future.

## License [![GitHub License](https://img.shields.io/github/license/lbragile/colormaster?color=00D800&label=License&logo=github&style=flat-square)](https://github.com/lbragile/ColorMaster/blob/master/LICENSE)

All of the code used in **ColorMaster** is released under the [MIT License](https://github.com/lbragile/ColorMaster/blob/master/LICENSE).

[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Flbragile%2FColorMaster.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2Flbragile%2FColorMaster?utm_source=share_link)
