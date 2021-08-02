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
CM.RGBAFrom({ r: 128, g: 128, b: 128, a: 0.5 }).string(); // "rgba(128, 128, 128, 0.5)"
CM.RGBAFrom({ r: 128, g: 128, b: 128, a: 0.5 }).string({ withAlpha: false }); // "rgb(128, 128, 128)"
CM.RGBAFrom({ r: 128, g: 128, b: 128, a: 0.5 }).alphaTo(0.8).string(); // "rgba(128, 128, 128, 0.8)"

// array argument
CM.RGBAFrom([128, 128, 128, 0.5]).string(); // "rgba(128, 128, 128, 0.5)"
CM.RGBAFrom([128, 128, 128, 0.5]).string({ withAlpha: false }); // "rgb(128, 128, 128)"
CM.RGBAFrom([128, 128, 128, 0.5]).alphaTo(0.8).string(); // "rgba(128, 128, 128, 0.8)"

// string argument
CM.RGBAFrom("128, 128, 128, 0.5").string(); // "rgba(128, 128, 128, 0.5)"
CM.RGBAFrom("128, 128, 128, 0.5").string({ withAlpha: false }); // "rgb(128, 128, 128)"
CM.RGBAFrom("128, 128, 128, 0.5").alphaTo(0.8).string(); // "rgba(128, 128, 128, 0.8)"
CM.RGBAFrom("rgba(128, 128, 128, 0.5)").alphaTo(0.8).string(); // "rgba(128, 128, 128, 0.8)"

// list of values as arguments
CM.RGBAFrom(128, 128, 128, 0.5).string(); // "rgba(128, 128, 128, 0.5)"
CM.RGBAFrom(128, 128, 128, 0.5).string({ withAlpha: false }); // "rgb(128, 128, 128)"
CM.RGBAFrom(128, 128, 128, 0.5).alphaTo(0.8).string(); // "rgba(128, 128, 128, 0.8)"
```

</details>

<details>
<summary><b>HSLA</b> Color Space</summary>

```ts
import CM from "colormaster";

// object argument
CM.HSLAFrom({ h: 300, s: 50, l: 60, a: 0.5 }).string(); // "hsla(300, 50%, 60%, 0.5)"
CM.HSLAFrom({ h: 300, s: 50, l: 60, a: 0.5 }).string({ withAlpha: false }); // "hsl(300, 50%, 60%)"
CM.HSLAFrom({ h: 300, s: 50, l: 60, a: 0.5 }).alphaTo(0.8).string(); // "hsla(300, 50%, 60%, 0.8)"

// array argument
CM.HSLAFrom([300, 50, 60, 0.5]).string(); // "hsla(300, 50%, 60%, 0.5)"
CM.HSLAFrom([300, 50, 60, 0.5]).string({ withAlpha: false }); // "hsl(300, 50%, 60%)"
CM.HSLAFrom([300, 50, 60, 0.5]).alphaTo(0.8).string(); // "hsla(300, 50%, 60%, 0.8)"

// string argument
CM.HSLAFrom("300, 50%, 60, 0.5").string(); // "hsla(300, 50%, 60%, 0.5)"
CM.HSLAFrom("300, 50, 60%, 0.5").string({ withAlpha: false }); // "hsl(300, 50%, 60%)"
CM.HSLAFrom("300, 50%, 60%, 0.5").alphaTo(0.8).string(); // "hsla(300, 50%, 60%, 0.8)"
CM.HSLAFrom("hsla(300, 50%, 60%, 0.5)").alphaTo(0.8).string(); // "hsla(300, 50%, 60%, 0.8)"

// list of values as arguments
CM.HSLAFrom(300, 50, 60, 0.5).string(); // "hsla(300, 50%, 60%, 0.5)"
CM.HSLAFrom(300, 50, 60, 0.5).string({ withAlpha: false }); // "hsl(300, 50%, 60%)"
CM.HSLAFrom(300, 50, 60, 0.5).alphaTo(0.8).string(); // "hsla(300, 50%, 60%, 0.8)"
```

</details>

<details>
<summary><b>HEXA</b> Color Space</summary>

```ts
import CM from "colormaster";

// object argument
CM.HEXAFrom({ r: "45", g: "67", b: "89", a: "AB" }).string(); // "#456789AB"
CM.HEXAFrom({ r: "45", g: "67", b: "89", a: "AB" }).string({ withAlpha: false }); // "#456789"
CM.HEXAFrom({ r: "45", g: "67", b: "89", a: "AB" }).alphaTo("CC").string(); // "#456789CC"

// array argument
CM.HEXAFrom(["45", "67", "89", "AB"]).string(); // "#456789AB"
CM.HEXAFrom(["45", "67", "89", "AB"]).string({ withAlpha: false }); // "#456789"
CM.HEXAFrom(["45", "67", "89", "AB"]).alphaTo("CC").string(); // "#456789CC"

// string argument
CM.HEXAFrom("45, 67, 89, AB").string(); // "#456789AB"
CM.HEXAFrom("#456789AB").string(); // "#456789AB" ← 8-Digit Hex Input
CM.HEXAFrom("#456789").string(); // "#456789FF"
CM.HEXAFrom("#4567").string(); // "#44556677" ← 4-Digit Hex Input
CM.HEXAFrom("#456").string(); // "#445566FF"
CM.HEXAFrom("45, 67, 89, AB").string({ withAlpha: false }); // "#456789"
CM.HEXAFrom("45, 67, 89, AB").alphaTo("CC").string(); // "#456789CC"
CM.HEXAFrom("#456789AB").alphaTo("CC").string(); // "#456789CC"

// list of values as arguments
CM.HEXAFrom("45", "67", "89", "AB").string(); // "#456789AB"
CM.HEXAFrom("45", "67", "89", "AB").string({ withAlpha: false }); // "#456789"
CM.HEXAFrom("45", "67", "89", "AB").alphaTo("CC").string(); // "#456789CC"
```

**Note:** HEXA string are always returned in _upperCase_ by **ColorMaster**. If you prefer _lowerCase_ strings,
you can simply use (chain) the built in `toLowerCase()`. More information is available [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/toLowerCase)

</details>

<!-- markdownlint-enable no-inline-html -->

## 🔥 API

**ColorMaster** (currently) supports RGBA, HEXA, and HSLA color spaces.
The following will show examples in a few color spaces (namely RGBA and HSLA) to illustrate how the API should be used. Rest assured that all the presented functionally is available for each color space.

### Formatting

<!-- markdownlint-disable no-inline-html -->

<details>
<summary><code><b>string(opts)</b></code></summary>
Generates a human readable string from a given color instance

```ts
import CM from "colormaster";
CM.RGBAFrom(255, 0, 0, 1).string(); // "rgba(255, 0, 0, 1.0)"
CM.RGBAFrom(255, 0, 0, 1).string({ withAlpha: false }); // "rgba(255, 0, 0)"
CM.RGBAFrom(200.1234, 100.1234, 50.1234, 0.61234).string({ precision: [1, 2, 3, 4] }); // "rgba(200.1, 100.12, 50.123, 0.6123)"
```

</details>

<details>
<summary><code><b>name()</b></code></summary>
Gets the color table <a href='https://www.rapidtables.com/web/color/RGB_Color.html'>CSS/HTML name</a> for a given color

```ts
import CM from "colormaster";
CM.RGBAFrom(255, 0, 0, 1).name(); // "red"
CM.RGBAFrom(0, 255, 0, 1).name(); // "green"
CM.RGBAFrom(0, 0, 255, 1).name(); // "blue"
```

</details>

<!-- markdownlint-enable no-inline-html -->

### Channel/Instance Level Information

<!-- markdownlint-disable no-inline-html -->

<details>
<summary><code><b>object</b></code></summary>
Retrieve the object corresponding to the color instance

```ts
import CM from "colormaster";
CM.RGBAFrom(255, 0, 0, 1).object; // "{ r: 255, g: 0, b: 0, a: 1 }"
```

</details>

<details>
<summary><code><b>array</b></code></summary>
Retrieve the array corresponding to the color instance

```ts
import CM from "colormaster";
CM.RGBAFrom(255, 0, 0, 1).array; // "[255, 0, 0, 1]"
```

</details>

<details>
<summary><code><b>format</b></code></summary>
Retrieve the format of color instance (what is the color space)

```ts
import CM from "colormaster";
CM.RGBAFrom(255, 0, 0, 1).format; // "rgb"
```

</details>

<details>
<summary><code><b>red</b></code></summary>
Get the "red" channel value for the color instance.

```ts
import CM from "colormaster";
CM.RGBAFrom(255, 0, 0, 1).red; // 255
CM.HSLAFrom(0, 100%, 50%, 1).red; // 255
CM.HEXAFrom("FF", "00", "00", "FF").red; // "FF"
```

</details>

<details>
<summary><code><b>green</b></code></summary>
Get the "green" channel value for the color instance.

```ts
import CM from "colormaster";
CM.RGBAFrom(0, 255, 0, 1).green; // 255
CM.HSLAFrom(120, 100%, 50%, 1).green; // 255
CM.HEXAFrom("00", "FF", "00", "FF").green; // "FF"
```

</details>

<details>
<summary><code><b>blue</b></code></summary>
Get the "blue" channel value for the color instance.

```ts
import CM from "colormaster";
CM.RGBAFrom(0, 0, 255, 1).blue; // 255
CM.HSLAFrom(240, 100%, 50%, 1).blue; // 255
CM.HEXAFrom("00", "00", "FF", "FF").blue; // "FF"
```

</details>

<details>
<summary><code><b>alpha</b></code></summary>
Get the "alpha" channel value for the color instance.

```ts
import CM from "colormaster";
CM.RGBAFrom(0, 0, 255, 1).alpha; // 1
CM.HSLAFrom(240, 100%, 50%, 1).alpha; // 1
CM.HEXAFrom("00", "00", "FF", "FF").alpha; // "FF"
```

</details>

<details>
<summary><code><b>hue</b></code></summary>
Get the "hue" channel value for the color instance.

```ts
import CM from "colormaster";
CM.RGBAFrom(0, 0, 255, 1).hue; // 240
CM.HSLAFrom(240, 100%, 50%, 1).hue; // 240
CM.HEXAFrom("00", "00", "FF", "FF").hue; // 240
```

</details>

<details>
<summary><code><b>saturation</b></code></summary>
Get the "saturation" channel value for the color instance.

```ts
import CM from "colormaster";
CM.RGBAFrom(0, 0, 255, 1).saturation; // 100
CM.HSLAFrom(240, 100%, 50%, 1).saturation; // 100
CM.HEXAFrom("00", "00", "FF", "FF").saturation; // 100
```

</details>

<details>
<summary><code><b>lightness</b></code></summary>
Get the "lightness" channel value for the color instance.

```ts
import CM from "colormaster";
CM.RGBAFrom(0, 0, 255, 1).lightness; // 50
CM.HSLAFrom(240, 100%, 50%, 1).lightness; // 50
CM.HEXAFrom("00", "00", "FF", "FF").lightness; // 50
```

</details>

<!-- markdownlint-enable no-inline-html -->

### Generation

<!-- markdownlint-disable no-inline-html -->

<details>
<summary><code><b>RGBAFrom(input)</b></code></summary>
Creates a <a href='https://www.w3schools.com/html/html_colors_rgb.asp'>RGBA</a> color instance from a given input. Alpha channel values are considered as well.

```ts
import CM from "colormaster";
CM.RGBAFrom(255, 0, 0, 1).string(); // "rgba(255, 0, 0, 1.0)"
CM.RGBAFrom(255, 0, 0).string(); // "rgba(255, 0, 0, 1.0)"
CM.RGBAFrom(255, 0, 0, 0.7).string(); // "rgba(255, 0, 0, 0.7)"
CM.RGBAFrom("rgba(255, 0, 0, 1)").string(); // "rgba(255, 0, 0, 1.0)"
CM.RGBAFrom([255, 0, 0, 1]).string(); // "rgba(255, 0, 0, 1.0)"
CM.RGBAFrom({ r: 255, g: 0, b: 0, a: 1 }).string(); // "rgba(255, 0, 0, 1.0)"
```

</details>

<details>
<summary><code><b>HSLAFrom(input)</b></code></summary>
Creates a <a href='https://www.w3schools.com/html/html_colors_hsl.asp'>HSLA</a> color instance from a given input. Alpha channel values are considered as well.

```ts
import CM from "colormaster";
CM.HSLAFrom(120, 100, 50, 1).string(); // "hsla(120, 100%, 50%, 1.0)"
CM.HSLAFrom(120, 100, 50).string(); // "hsla(120, 100%, 50%, 1.0)"
CM.HSLAFrom(120, 100, 50, 0.7).string(); // "hsla(120, 100%, 50%, 0.7)"
CM.HSLAFrom("hsla(120, 100%, 50%, 1)").string(); // "hsla(120, 100%, 50%, 1.0)"
CM.HSLAFrom([120, 100, 50, 1]).string(); // "hsla(120, 100%, 50%, 1.0)"
CM.HSLAFrom({ h: 120, s: 100, l: 50, a: 1 }).string(); // "hsla(120, 100%, 50%, 1.0)"
CM.HSLAFrom("green", 90, 40, 0.5).string(); // "hsla(120, 90%, 40%, 0.5)"
```

</details>

<details>
<summary><code><b>HEXAFrom(input)</b></code></summary>
Creates a <a href='https://www.w3schools.com/html/html_colors_hex.asp'>HEXA</a> color instance from a given input.
Alpha channel values are considered as well.
Supports 3-digit, 4-digit, 6-digit, and 8-digit HEX(A) input.

```ts
import CM from "colormaster";
CM.HEXAFrom("45", "67", "89", "AB").string(); // "#456789AB"
CM.HEXAFrom("45", "67", "89").string(); // "#456789FF"
CM.HEXAFrom("#456789").string(); // "#456789FF"
CM.HEXAFrom(["45", "67", "89", "AB"]).string(); // "#456789AB"
CM.HEXAFrom({ r: "45", g: "67", b: "89", a: "AB" }).string(); // "#456789AB"
```

</details>

<details>
<summary><code><b>fromName()</b></code></summary>
Generates an RGBA color from an input <a href='https://www.rapidtables.com/web/color/RGB_Color.html'>CSS/HTML name</a>
You can use this to also convert to HSLA or HEXA space via chaining of the `hsl()` or `hex()` methods.

```ts
import CM from "colormaster";
CM.fromName("red").string(); // "rgba(255, 0, 0, 1.0)"
CM.fromName("green").string(); // "rgba(0, 255, 0, 1.0)"
CM.fromName("blue").string(); // "rgba(0, 0, 255, 1.0)"
CM.fromName("blue").hsl().string(); // "hsla(240, 100%, 50%, 1.0)"
CM.fromName("blue").hex().string(); // "#0000FFFF"
```

</details>

<details>
<summary><code><b>random()</b></code></summary>
Generates a random RGBA color.
You can use this to also convert to HSLA or HEXA space via chaining of the `hsl()` or `hex()` methods.

```ts
import CM from "colormaster";
CM.random().string(); // "rgba(255, 0, 0, 1.0)"
CM.random()().hsl().string(); // "hsla(0, 100%, 50%, 1.0)"
CM.random().hex().string(); // "#FF0000FF"
```

</details>

<!-- markdownlint-enable no-inline-html -->

### Conversion

<!-- markdownlint-disable no-inline-html -->

<details>
<summary><code>rgb()</code></summary>
Convert a color instance to the corresponding RGBA color

```ts
import CM from "colormaster";
CM.HEXAFrom("#F00").rgb().string(); // "rgba(255, 0, 0, 1)"
CM.HSLAFrom(0, 100, 50, 1).rgb().string(); // "rgba(255, 0, 0, 1)"
```

</details>

<details>
<summary><code>hsl()</code></summary>
Convert a color instance to the corresponding HSLA color

```ts
import CM from "colormaster";
CM.HEXAFrom("#F00").hsl().string(); // "hsla(0, 100%, 50%, 1)"
CM.RGBAFrom(255, 0, 0, 1).hsl().string(); // "hsla(0, 100%, 50%, 1)"
```

</details>

<details>
<summary><code>hex()</code></summary>
Convert a color instance to the corresponding HEXA color

```ts
import CM from "colormaster";
CM.HSLAFrom(0, 100, 50, 1).hex().string(); // "#FF0000FF"
CM.RGBAFrom(255, 0, 0, 1).hex().string(); // "#FF0000FF"
```

</details>

<!-- markdownlint-enable no-inline-html -->

### Manipulation

<!-- markdownlint-disable no-inline-html -->

<details>
<summary><code>changeValueTo(channel, value)</code></summary>
Lets you set a single channel value to a specific number

```ts
import CM from "colormaster";
CM.RGBAFrom(255, 0, 0, 1).changeValueTo("red", 120).string(); // "rgba(120, 0, 0, 1.0)"
CM.HSLAFrom(0, 100, 50, 1).changeValueTo("hue", 120).string(); // "hsla(120, 100%, 50%, 1.0)"
CM.HEXAFrom("FF", "00", "00").changeValueTo("red", "AA").string(); // "#AA0000FF"
```

</details>

<details>
<summary><code>changeValueBy(channel, delta)</code></summary>
Lets you set a single channel value to a specific number

```ts
import CM from "colormaster";
CM.RGBAFrom(255, 0, 0, 1).changeValueBy("red", -55).string(); // "rgba(200, 0, 0, 1.0)"
CM.HSLAFrom(10, 100, 50, 1).changeValueBy("hue", 120).string(); // "hsla(130, 100%, 50%, 1.0)"
CM.HEXAFrom("BB", "00", "00").changeValueBy("red", "21").string(); // "#DC0000FF"
```

</details>

<details>
<summary><code>hueTo(value | cssName)</code></summary>
Syntactic sugar for <code>changeValueTo('hue', value)</code>

```ts
import CM from "colormaster";
CM.RGBAFrom(255, 0, 0, 1).hueTo(120).string(); // "rgba(0, 255, 0, 1.0)"
CM.HSLAFrom(0, 100, 50, 1).hueTo(120).string(); // "hsla(120, 100%, 50%, 1.0)"
CM.HEXAFrom("FF", "00", "00").hueTo("green").string(); // "#00FF00FF"
```

</details>

<details>
<summary><code>hueBy(delta)</code></summary>
Syntactic sugar for <code>changeValueBy('hue', delta)</code>

```ts
import CM from "colormaster";
CM.RGBAFrom(255, 0, 0, 1).hueBy(120).string(); // "rgba(0, 255, 0, 1.0)"
CM.HSLAFrom(0, 100, 50, 1).hueBy(-10).string(); // "hsla(350, 100%, 50%, 1.0)"
CM.HEXAFrom("FF", "00", "00").hueBy(240).string(); // "#0000FFFF"
```

</details>

<details>
<summary><code>alphaTo(value)</code></summary>
Syntactic sugar for <code>changeValueTo('alpha', value)</code>

```ts
import CM from "colormaster";
CM.RGBAFrom(255, 0, 0, 1).alphaTo(0.5).string(); // "rgba(255, 0, 0, 0.5)"
CM.HSLAFrom(0, 100, 50, 1).alphaTo(0.5).string(); // "hsla(0, 100%, 50%, 0.5)"
CM.HEXAFrom("FF", "00", "00").alphaTo("AA").string(); // "#FF0000AA"
```

</details>

<details>
<summary><code>alphaBy(delta)</code></summary>
Syntactic sugar for <code>changeValueBy('alpha', delta)</code>

```ts
import CM from "colormaster";
CM.RGBAFrom(255, 0, 0, 1).alphaBy(-0.1).string(); // "rgba(255, 0, 0, 0.9)"
CM.HSLAFrom(0, 100, 50, 1).alphaBy(-0.1).string(); // "hsla(0, 100%, 50%, 0.9)"
CM.HEXAFrom("FF", "00", "00", "99").alphaBy("23").string(); // "#FF0000BC"
```

</details>

<details>
<summary><code>saturateBy(delta)</code></summary>
Syntactic sugar for <code>changeValueBy('saturation', delta)</code>.
This adds pigmentation to a color, making it less gray.

```ts
import CM from "colormaster";
CM.HSLAFrom(0, 60, 50, 1).saturateBy(20).string(); // "hsla(0, 80%, 50%, 1.0)"
```

</details>

<details>
<summary><code>desaturateBy(delta)</code></summary>
The opposite affect of <code>saturateBy(delta)</code>.
This removes pigmentation from a color making it more gray.

```ts
import CM from "colormaster";
CM.HSLAFrom(0, 60, 50, 1).desaturateBy(20).string(); // "hsla(0, 40%, 50%, 1.0)"
```

</details>

<details>
<summary><code>lighterBy(delta)</code></summary>
Syntactic sugar for <code>changeValueBy('lightness', delta)</code>.
This adds white to a color.

```ts
import CM from "colormaster";
CM.HSLAFrom(0, 60, 50, 1).lighterBy(10).string(); // "hsla(0, 60%, 60%, 1.0)"
```

</details>

<details>
<summary><code>darkerBy(delta)</code></summary>
The opposite of <code>lighterBy(delta)</code>.
This adds black to a color.

```ts
import CM from "colormaster";
CM.HSLAFrom(0, 60, 50, 1).darkerBy(10).string(); // "hsla(0, 60%, 40%, 1.0)"
```

</details>

<details>
<summary><code>grayscale()</code></summary>
The same as setting the saturation to "0%" for a color. This makes the color appear grey as it completely removes all pigmentation.

```ts
import CM from "colormaster";
CM.HSLAFrom(0, 60, 50, 1).grayscale().string(); // "hsla(0, 0%, 50%, 1.0)"
```

</details>

<details>
<summary><code>rotate(value)</code></summary>
This simply adjusts the angle of the color along the color wheel by incrementing the hue value.

```ts
import CM from "colormaster";
CM.HSLAFrom(0, 60, 50, 1).rotate(120).string(); // "hsla(120, 60%, 50%, 1.0)"
```

</details>

<details>
<summary><code>invert(opts)</code></summary>
Gets the inverted color corresponding to the current color.
This is different from a complementary color.

Example, hue of 120 is 240 for the inverted color (360-120), but 300 for the complementary color (120+180)

```ts
import CM from "colormaster";
CM.HSLAFrom(120, 60, 30, 0.3).invert().string(); // "hsla(240, 40%, 70%, 0.7)"
CM.HSLAFrom(120, 60, 30, 0.3).invert({ includeAlpha: false }).string(); // "hsla(240, 40%, 70%, 0.3)"
```

</details>

<!-- markdownlint-enable no-inline-html -->

### Accessibility (A11y)

<!-- markdownlint-disable no-inline-html -->

<details>
<summary><code>brightness(opts)</code></summary>
Finds the normalized brightness of the color as defined by <a href="https://www.w3.org/TR/AERT/#color-contrast">
WCAG</a>

```ts
import CM from "colormaster";
CM.HSLAFrom(0, 0, 0).brightness(); // 0
CM.HSLAFrom(0, 0, 0).brightness({ percentage: true }); // 0
CM.HSLAFrom(0, 0, 25.1).brightness(); // 0.251
CM.HSLAFrom(0, 0, 25.1).brightness({ percentage: true }); // 25.1
CM.HSLAFrom(0, 0, 50.2).brightness(); // 0.502
CM.HSLAFrom(0, 0, 50.2).brightness({ percentage: true }); // 50.2
CM.HSLAFrom(0, 0, 75.29).brightness(); // 0.7529
CM.HSLAFrom(0, 0, 75.29).brightness({ percentage: true }); // 75.29
CM.HSLAFrom(0, 0, 100).brightness(); // 1
CM.HSLAFrom(0, 0, 100).brightness({ percentage: true }); // 100
```

</details>

<details>
<summary><code>luminance(opts)</code></summary>
Finds the normalized luminance of the color as defined by <a href="https://www.w3.org/TR/WCAG20/#relativeluminancedef">
WCAG 2.0</a>

```ts
import CM from "colormaster";
CM.HSLAFrom(0, 0, 0).luminance(); // 0
CM.HSLAFrom(0, 0, 0).luminance({ percentage: true }); // 0
CM.HSLAFrom(0, 0, 25.1).luminance(); // 0.0513
CM.HSLAFrom(0, 0, 25.1).luminance({ percentage: true }); // 5.13
CM.HSLAFrom(0, 0, 50.2).luminance(); // 0.2159
CM.HSLAFrom(0, 0, 50.2).luminance({ percentage: true }); // 21.59
CM.HSLAFrom(0, 0, 75.29).luminance(); // 0.5271
CM.HSLAFrom(0, 0, 75.29).luminance({ percentage: true }); // 52.71
CM.HSLAFrom(0, 0, 100).luminance(); // 1
CM.HSLAFrom(0, 0, 100).luminance({ percentage: true }); // 100
```

</details>

<details>
<summary><code>contrast(bgColor, opts)</code></summary>
Indicates how well a given color can be read/seen when on a background given by <code>bgColor</code>.
A ratio of "1:1" indicates very poor contrast, while "21:1" indicates very good contrast. The calculated value also
depends on factors such as text size and contrast ratio type. The lowest acceptable contrast ratio is "3:1" according to
<a href='https://developer.mozilla.org/en-US/docs/Web/Accessibility/Understanding_WCAG/Perceivable/Color_contrast'>WCAG</a>

```ts
import CM from "colormaster";
CM.HSLAFrom(0, 0, 0).contrast(); // 21
CM.HSLAFrom(0, 0, 0).contrast("0, 0, 100", { ratio: true }); // "21.0000:1"
CM.HSLAFrom(0, 0, 25.1).contrast(); // 10.3653
CM.HSLAFrom(0, 0, 25.1).contrast("0, 0, 100", { ratio: true }); // "10.3653:1"
CM.HSLAFrom(0, 0, 50.2).contrast(); // 3.9489
CM.HSLAFrom(0, 0, 50.2).contrast("0, 0, 100", { ratio: true }); // "3.9489:1"
CM.HSLAFrom(0, 0, 75.29).contrast(); // 1.8194
CM.HSLAFrom(0, 0, 75.29).contrast("0, 0, 100", { ratio: true }); // "1.8194:1"
CM.HSLAFrom(0, 0, 100).contrast(); // 1
CM.HSLAFrom(0, 0, 100).contrast("0, 0, 100", { ratio: true }); // "1.0000:1"
```

</details>

<details>
<summary><code>isLight()</code></summary>
Based on the color brightness (true if <code>brightness >= 0.5</code>)

```ts
import CM from "colormaster";
CM.HSLAFrom(0, 0, 0).isLight(); // false
CM.HSLAFrom(0, 0, 49.9).isLight(); // false
CM.HSLAFrom(0, 0, 50.1).isLight(); // true
CM.HSLAFrom(0, 0, 100).isLight(); // true
```

</details>

<details>
<summary><code>isDark()</code></summary>
Based on the color brightness (true if <code>brightness < 0.5</code>)

```ts
import CM from "colormaster";
CM.HSLAFrom(0, 0, 0).isDark(); // true
CM.HSLAFrom(0, 0, 49.9).isDark(); // true
CM.HSLAFrom(0, 0, 50.1).isDark(); // false
CM.HSLAFrom(0, 0, 100).isDark(); // false
```

</details>

<details>
<summary><code>readableOn(bgColor, opts)</code></summary>
Based on the contrast value of a color on a given background color.
The output is obtained by the conditions outlined in <a href='https://developer.mozilla.org/en-US/docs/Web/Accessibility/Understanding_WCAG/Perceivable/Color_contrast'>WCAG</a>

```ts
import CM from "colormaster";
const blackColor = CM.HSLAFrom(0, 0, 0);

// extremes (default color is white as bg, size = body, ratio = minimum)
CM.HSLAFrom(0, 0, 100).readableOn(); // false
blackColor.readableOn(); // true
blackColor.readableOn(blackColor); // false

// 3.0:1
blackColor.readableOn([0, 0, 34.9], { size: "large", ratio: "minimum" }); // false
blackColor.readableOn([0, 0, 35.3], { size: "large", ratio: "minimum" }); // true

// 4.5:1
blackColor.readableOn([0, 0, 45.5]); // false
blackColor.readableOn([0, 0, 45.9]); // true
blackColor.readableOn([0, 0, 45.5], { size: "large", ratio: "enhanced" }); // false
blackColor.readableOn([0, 0, 45.9], { size: "large", ratio: "enhanced" }); // true

// 7.0:1
blackColor.readableOn([0, 0, 58.0], { size: "body", ratio: "enhanced" }); // false
blackColor.readableOn([0, 0, 58.4], { size: "body", ratio: "enhanced" }); // true
```

</details>

<details>
<summary><code>equalTo(compareColor)</code></summary>
Determines if the current color is identical (all channels are the same) to <code>compareColor</code>

```ts
import CM from "colormaster";
CM.HSLAFrom(0, 0, 99, 1).equalTo(CM.HSLAFrom(0, 0, 99, 1)); // true
CM.HSLAFrom(0, 0, 99, 1).equalTo(CM.HSLAFrom(1, 0, 99, 1)); // false
CM.HSLAFrom(0, 0, 99, 1).equalTo(CM.HSLAFrom(0, 1, 99, 1)); // false
CM.HSLAFrom(0, 0, 99, 1).equalTo(CM.HSLAFrom(0, 0, 98, 1)); // false
CM.HSLAFrom(0, 0, 99, 1).equalTo(CM.HSLAFrom(0, 0, 99, 0.9)); // false
```

</details>

<details>
<summary><code>isWarm()</code></summary>
"Warm colors are the colors from red through to yellow. These colors are said to bring to mind warmth, like the sun."
Based on the information presented on <a href="https://www.canva.com/colors/color-wheel/">Canva</a>

```ts
import CM from "colormaster";
CM.HSLAFrom(74.9, 100, 50, 1).isWarm(); // true
CM.HSLAFrom(255, 100, 50, 1).isWarm(); // true
CM.HSLAFrom(0, 100, 50, 1).isWarm(); // true
CM.HSLAFrom(180, 100, 50, 1).isWarm(); // false
```

</details>

<details>
<summary><code>isCool()</code></summary>
"Cool colors are the colors from blue to green and purple. These colors are said to bring to mind coolness, like water."
Based on the information presented on <a href="https://www.canva.com/colors/color-wheel/">Canva</a>

```ts
import CM from "colormaster";
CM.HSLAFrom(75, 100, 50, 1).isCool(); // true
CM.HSLAFrom(254.9, 100, 50, 1).isCool(); // true
CM.HSLAFrom(180, 100, 50, 1).isCool(); // true
CM.HSLAFrom(0, 100, 50, 1).isCool(); // false
```

</details>

<details>
<summary><code>isTinted()</code></summary>
A color is tinted if its lightness value is strictly greater than 50%.

```ts
import CM from "colormaster";
CM.HSLAFrom(0, 100, 51, 1).isTinted(); // true
CM.HSLAFrom(0, 100, 50, 1).isTinted(); // false
CM.HSLAFrom(0, 100, 49, 1).isTinted(); // false
```

</details>

<details>
<summary><code>isShaded()</code></summary>
A color is shaded if its lightness value is strictly less than 50%.

```ts
import CM from "colormaster";
CM.HSLAFrom(0, 100, 51, 1).isShaded(); // false
CM.HSLAFrom(0, 100, 50, 1).isShaded(); // false
CM.HSLAFrom(0, 100, 49, 1).isShaded(); // true
```

</details>

<details>
<summary><code>isToned()</code></summary>
A color is toned if its saturation value is strictly less than 100%.

```ts
import CM from "colormaster";
CM.HSLAFrom(0, 100, 50, 1).isToned(); // false
CM.HSLAFrom(0, 99, 50, 1).isToned(); // true
```

</details>

<details>
<summary><code>isPureHue(opts)</code></summary>
A color is pure if its saturation value is 100% and lightness value is 50%.

```ts
import CM from "colormaster";
CM.HSLAFrom(0, 100, 50, 1).isPureHue(); // { pure: true, reason: 'N/A' }
CM.HSLAFrom(0, 100, 50, 1).isPureHue({ reason: false }); // true
CM.HSLAFrom(0, 100, 51, 1).isPureHue(); // { pure: false, reason: 'tinted' }
CM.HSLAFrom(0, 100, 51, 1).isPureHue({ reason: false }); // false
CM.HSLAFrom(0, 100, 49, 1).isPureHue(); // { pure: false, reason: 'shaded' }
CM.HSLAFrom(0, 100, 49, 1).isPureHue({ reason: false }); // false
CM.HSLAFrom(0, 99, 50, 1).isPureHue(); // { pure: false, reason: 'toned' }
CM.HSLAFrom(0, 99, 50, 1).isPureHue({ reason: false }); // false
```

</details>

<!-- markdownlint-enable no-inline-html -->

### Utilities

<!-- markdownlint-disable no-inline-html -->

<details>
<summary><code>closestWebSafe()</code></summary>
Finds the closest color to the current color instance that is considered to be
 <a href='https://www.rapidtables.com/web/color/Web_Safe.html'>web safe</a>

```ts
import CM from "colormaster";
CM.HSLAFrom(3, 97, 47, 0.7).closestWebSafe().string(); // "hsla(0, 100%, 50%, 0.7)"
```

</details>

<details>
<summary><code>closestCool()</code></summary>
Finds the closest color to the current color instance that is a "Cool" color

```ts
import CM from "colormaster";
CM.HSLAFrom(300, 100, 50, 1).closestCool().string(); // "hsla(254, 100%, 50%, 1.0)"
```

</details>

<details>
<summary><code>closestWarm()</code></summary>
Finds the closest color to the current color instance that is a "Warm" color

```ts
import CM from "colormaster";
CM.HSLAFrom(120, 100, 50, 1).closestWarm().string(); // "hsla(74, 100%, 50%, 1.0)"
```

</details>

<details>
<summary><code>closestPureHue()</code></summary>
Finds the closest color (hue) to the current color instance that has 100% saturation and 50% lightness.

```ts
import CM from "colormaster";
CM.HSLAFrom(120, 99, 51, 1).closestPureHue().string(); // "hsla(120, 100%, 50%, 1.0)"
```

</details>

<details>
<summary><code>harmony(type, monochromaticOpts)</code></summary>
Generates a <a href='https://www.tigercolor.com/color-lab/color-theory/color-harmonies.htm'>color harmony</a> according to the selected <code>type</code>.
Note that for the 'monochromatic' color harmony, an array of tints, shades, or tones is generated based on the provided <code>monochromaticOpts</code>

```ts
import CM from "colormaster";
const ogColor = "hsla(30, 50%, 50%, 1)";
CM.HSLAFrom(ogColor)
  .harmony("analogous")
  .map((c) => c.string());
// ["hsla(0, 50%, 50%, 1.0)", "hsla(30, 50%, 50%, 1.0)", "hsla(60, 50%, 50%, 1.0)"]

CM.HSLAFrom(ogColor)
  .harmony("complementary")
  .map((c) => c.string());
// ["hsla(30, 50%, 50%, 1.0)", "hsla(210, 50%, 50%, 1.0)"]

CM.HSLAFrom(ogColor)
  .harmony("split-complementary")
  .map((c) => c.string());
// ["hsla(30, 50%, 50%, 1.0)", "hsla(180, 50%, 50%, 1.0)", "hsla(240, 50%, 50%, 1.0)"]

CM.HSLAFrom(ogColor)
  .harmony("double-split-complementary")
  .map((c) => c.string());
// ["hsla(0, 50%, 50%, 1.0)", "hsla(30, 50%, 50%, 1.0)", "hsla(60, 50%, 50%, 1.0)", "hsla(180, 50%, 50%, 1.0)", "hsla(240, 50%, 50%, 1.0)"]

CM.HSLAFrom(ogColor)
  .harmony("triad")
  .map((c) => c.string());
// ["hsla(30, 50%, 50%, 1.0)", "hsla(150, 50%, 50%, 1.0)", "hsla(270, 50%, 50%, 1.0)"]

CM.HSLAFrom(ogColor)
  .harmony("rectangle")
  .map((c) => c.string());
// ["hsla(30, 50%, 50%, 1.0)", "hsla(90, 50%, 50%, 1.0)",  "hsla(210, 50%, 50%, 1.0)", "hsla(270, 50%, 50%, 1.0)"]

CM.HSLAFrom(ogColor)
  .harmony("square")
  .map((c) => c.string());
// ["hsla(30, 50%, 50%, 1.0)", "hsla(120, 50%, 50%, 1.0)", "hsla(210, 50%, 50%, 1.0)", "hsla(300, 50%, 50%, 1.0)"]

CM.HSLAFrom(ogColor)
  .harmony("monochromatic", { effect: "tints" })
  .map((c) => c.string());
// ["hsla(30, 50%, 50%, 1.0)", "hsla(30, 50%, 60%, 1.0)", "hsla(30, 50%, 70%, 1.0)", "hsla(30, 50%, 80%, 1.0)", "hsla(30, 50%, 90%, 1.0)", "hsla(30, 50%, 100%, 1.0)"]

CM.HSLAFrom(ogColor)
  .harmony("monochromatic", { effect: "shades" })
  .map((c) => c.string());
// ["hsla(30, 50%, 50%, 1.0)", "hsla(30, 50%, 40%, 1.0)", "hsla(30, 50%, 30%, 1.0)", "hsla(30, 50%, 20%, 1.0)", "hsla(30, 50%, 10%, 1.0)", "hsla(30, 50%, 0%, 1.0)"]

CM.HSLAFrom(ogColor)
  .harmony("monochromatic", { effect: "tones" })
  .map((c) => c.string());
// ["hsla(30, 50%, 50%, 1.0)", "hsla(30, 40%, 50%, 1.0)", "hsla(30, 30%, 50%, 1.0)", "hsla(30, 20%, 50%, 1.0)", "hsla(30, 10%, 50%, 1.0)", "hsla(30, 0%, 50%, 1.0)"]
```

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

Here is a snapshot of what completed and planned features:

- [x] CSS/HTML name, HEXA, RGBA, HSLA input handling
- [x] Color wheel manipulation (rotation, saturation, lightness, grayscale)
- [x] Proper handling of improper input values
- [x] `brightness`, `luminance`, `contrast` accessibility functions - along with other helpful wrappers
- [x] Setting/adjusting channel values in all color spaces
- [x] Color harmony generation
- [ ] Color mixing
- [ ] `XYZ`/`LAB`/`LCH`/`HWB`/`HSV`/`RYB`/`CMYK` color space

## License [![GitHub License](https://img.shields.io/github/license/lbragile/colormaster?color=00D800&label=License&logo=github&style=flat-square)](https://github.com/lbragile/ColorMaster/blob/master/LICENSE)

All of the code used in **ColorMaster** is released under the [MIT License](https://github.com/lbragile/ColorMaster/blob/master/LICENSE).

[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Flbragile%2FColorMaster.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2Flbragile%2FColorMaster?utm_source=share_link)
