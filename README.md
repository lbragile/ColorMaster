<!-- markdownlint-disable no-inline-html -->
<!-- markdownlint-disable first-line-heading -->
<div align="center">
  <a href="https://github.com/lbragile/ColorMaster">
    <img src="public/logo.png" width="200" height="200" alt="ColorMaster Logo" />
  </a>
</div>

<div align="center">
  <a href="https://github.com/lbragile/ColorMaster/actions">
    <img alt="build status" src="https://img.shields.io/github/workflow/status/lbragile/ColorMaster/Testing?label=Build&logo=github&style=flat-square" />
  </a>
  <a href="https://app.codecov.io/gh/lbragile/ColorMaster/">
    <img alt="coverage" src="https://img.shields.io/codecov/c/github/lbragile/ColorMaster?label=Coverage&style=flat-square&logo=codecov" />
  </a>
  <a href="https://www.codefactor.io/repository/github/lbragile/colormaster">
    <img alt="coverage" src="https://img.shields.io/codefactor/grade/github/lbragile/ColorMaster/master?label=Code%20Quality&logo=codefactor&style=flat-square" />
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

```javascript
import { rgb } from "colormaster";

// object argument
rbg({ r: 128, g: 128, b: 128 }).string({ withAlpha: true, quotes: "double" }); // "rgba(128, 128, 128, 1)"
rbg({ r: 128, g: 128, b: 128, a: 0.5 }).string({ withAlpha: true }); // 'rgba(128, 128, 128, 0.5)' <-- note, single quote
rbg({ r: 128, g: 128, b: 128, a: 0.5 }).string(); // 'rgba(128, 128, 128)'
rbg({ r: 128, g: 128, b: 128, a: 0.5 }).alphaTo(0.8).string({ withAlpha: true }); // 'rgba(128, 128, 128, 0.8)'

// array argument
rbg([128, 128, 128]).string({ withAlpha: true, quotes: "double" }); // "rgba(128, 128, 128, 1)"
rbg([128, 128, 128, 0.5]).string({ withAlpha: true }); // 'rgba(128, 128, 128, 0.5)' <-- note, single quote
rbg([128, 128, 128, 0.5]).string(); // 'rgba(128, 128, 128)'
rbg([128, 128, 128, 0.5]).alphaTo(0.8).string({ withAlpha: true }); // 'rgba(128, 128, 128, 0.8)'

// string argument
rbg("128, 128, 128").string({ withAlpha: true, quotes: "double" }); // "rgba(128, 128, 128, 1)"
rbg("rgb(128, 128, 128)").string({ withAlpha: true, quotes: "double" }); // "rgba(128, 128, 128, 1)"
rbg("128, 128, 128, 0.5").string({ withAlpha: true }); // 'rgba(128, 128, 128, 0.5)' <-- note, single quote
rbg("128, 128, 128, 0.5").string(); // 'rgba(128, 128, 128)'
rbg("128, 128, 128, 0.5").alphaTo(0.8).string({ withAlpha: true }); // 'rgba(128, 128, 128, 0.8)'
rbg("rgba(128, 128, 128, 0.5)").alphaTo(0.8).string({ withAlpha: true }); // 'rgba(128, 128, 128, 0.8)'

// list of values as arguments
rbg(128, 128, 128).string({ withAlpha: true, quotes: "double" }); // "rgba(128, 128, 128, 1)"
rbg(128, 128, 128, 0.5).string({ withAlpha: true }); // 'rgba(128, 128, 128, 0.5)' <-- note, single quote
rbg(128, 128, 128, 0.5).string(); // 'rgba(128, 128, 128)'
rbg(128, 128, 128, 0.5).alphaTo(0.8).string({ withAlpha: true }); // 'rgba(128, 128, 128, 0.8)'
```

## 😍 Strongly Typed

Rather than using pure JavaScript which can lead to hard to debug errors during development, **ColorMaster** was written in TypeScript (strict mode) to provide a pleasant development experience.

The type definitions are included with the module, so you get intellisense right out of the box.

Additionally, **ColorMaster** exports all of its types and interfaces so that you can use them in your code.

```javascript
import { Irgb, Irgba } from "colormaster";

const rbg: Irgb = { r: 128, g: 128, b: 128 }; // OK
const rbg: Irgb = { r: 128, g: 128, b: 128, a: 0.5 }; // ERROR
const rbg: Irgb = { red: 128, green: 128, blue: 128 }; // ERROR

const rbg: Irgba = { r: 128, g: 128, b: 128, a: 0.5 }; // OK
const rbg: Irgba = { r: 128, g: 128, b: 128 }; // ERROR
const rbg: Irgba = { r: 128, g: 128, b: 128, alpha: 0.5 }; // ERROR
```

## 📕 Documentation [![Documentation](https://img.shields.io/badge/Documentation-available-brightgreen?style=flat-square&logo=github)](https://lbragile.github.io/ColorMaster/)

- API documentation can be found on [our documentation site](https://lbragile.github.io/ColorMaster/).
- A more in depth guide can be seen in [our Wikis](https://github.com/lbragile/ColorMaster/wiki).

## 📈 Overview

Visit our [automated Kanban](https://github.com/lbragile/ColorMaster/projects) for a detailed overview of the features/tasks that need to be added to ColorMaster in the near future.
