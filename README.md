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
CM({ r: 128, g: 128, b: 128, a: 0.5 }).stringRGB(); // "rgba(128, 128, 128, 0.5)"
CM({ r: 128, g: 128, b: 128, a: 0.5 }).stringRGB({ alpha: false }); // "rgb(128, 128, 128)"
CM({ r: 128, g: 128, b: 128, a: 0.5 }).alphaTo(0.8).stringRGB(); // "rgba(128, 128, 128, 0.8)"

// string argument
CM("rgba(128, 128, 128, 0.5)").stringRGB(); // "rgba(128, 128, 128, 0.5)"
CM("rgba(128, 128, 128, 0.5)").stringRGB({ alpha: false }); // "rgb(128, 128, 128)"
CM("rgba(128, 128, 128, 0.5)").alphaTo(0.8).stringRGB(); // "rgba(128, 128, 128, 0.8)"
CM("rgba(128, 128, 128, 0.5)").stringRGB(); // "rgba(128, 128, 128, 0.5)"
CM("rgba(50%, 50%, 50%, 50%)").stringRGB(); // "rgba(128, 128, 128, 0.5)"
CM("rgba(50% 50% 50% 50%)").stringRGB(); // "rgba(128, 128, 128, 0.5)"
CM("rgba(50% 50% 50% / 50%)").stringRGB(); // "rgba(128, 128, 128, 0.5)"
CM("rgba(50% 50% 50% / 0.5)").stringRGB(); // "rgba(128, 128, 128, 0.5)"
```

</details>

<details>
<summary><b>HSLA</b> Color Space</summary>

```ts
import CM from "colormaster";

// object argument
CM({ h: 300, s: 50, l: 60, a: 0.5 }).stringHSL(); // "hsla(300, 50%, 60%, 0.5)"
CM({ h: 300, s: 50, l: 60, a: 0.5 }).stringHSL({ alpha: false }); // "hsl(300, 50%, 60%)"
CM({ h: 300, s: 50, l: 60, a: 0.5 }).alphaTo(0.8).stringHSL(); // "hsla(300, 50%, 60%, 0.8)"

// string argument
CM("hsla(300, 50%, 60%, 0.5)").stringHSL(); // "hsla(300, 50%, 60%, 0.5)"
CM("hsla(300, 50%, 60%, 0.5)").stringHSL({ alpha: false }); // "hsl(300, 50%, 60%)"
CM("hsla(300, 50%, 60%, 0.5)").alphaTo(0.8).stringHSL(); // "hsla(300, 50%, 60%, 0.8)"
CM("hsla(50%, 50%, 60%, 50%)").stringHSL(); // "hsla(180, 50%, 60%, 0.5)"
CM("hsla(50% 50% 60% 50%)").stringHSL(); // "hsla(180, 50%, 60%, 0.5)"
CM("hsla(50% 50% 60% / 50%)").stringHSL(); // "hsla(180, 50%, 60%, 0.5)"
CM("hsla(50% 50% 60% / 0.5)").stringHSL(); // "hsla(180, 50%, 60%, 0.5)"
```

</details>

<details>
<summary><b>HEXA</b> Color Space</summary>

```ts
import CM from "colormaster";

// object argument
CM({ r: "45", g: "67", b: "89", a: "AB" }).stringHEX(); // "#456789AB"
CM({ r: "45", g: "67", b: "89", a: "AB" }).stringHEX({ alpha: false }); // "#456789"
CM({ r: "45", g: "67", b: "89", a: "AB" }).alphaTo("CC").stringHEX(); // "#456789CC"

// string argument
CM("#456789AB").stringHEX(); // "#456789AB" ← 8-Digit Hex Input
CM("#456789").stringHEX(); // "#456789FF" ← 6-Digit Hex Input
CM("#4567").stringHEX(); // "#44556677" ← 4-Digit Hex Input
CM("#456").stringHEX(); // "#445566FF" ← 3-Digit Hex Input
CM("#456789AB").stringHEX({ alpha: false }); // "#456789"
CM("#456789AB").alphaTo("CC").stringHEX(); // "#456789CC"
```

**Note:** HEXA string are always returned in _upperCase_ by **ColorMaster**. If you prefer _lowerCase_ strings,
you can simply use (chain) the built in `toLowerCase()`. More information is available [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/toLowerCase)

</details>

<!-- markdownlint-enable no-inline-html -->

## 🔥 API

### Object Instantiation (Color Generation)

<!-- markdownlint-disable no-inline-html -->

<details>
<summary><code>ColorMaster(color)</code></summary>

```ts
import CM from "colormaster"; // note the import name can be anything, we use "CM" for brevity

CM("rgba(255, 0, 0, 1)").stringRGB(); // "rgba(255, 0, 0, 1.0)"
CM({ r: 255, g: 0, b: 0, a: 1 }).stringRGB(); // "rgba(255, 0, 0, 1.0)"

CM("hsla(120, 100%, 50%, 1)").stringHSL(); // "hsla(120, 100%, 50%, 1.0)"
CM({ h: 120, s: 100, l: 50, a: 1 }).stringHSL(); // "hsla(120, 100%, 50%, 1.0)"

// Supports 3-digit, 4-digit, 6-digit, and 8-digit HEX(A) input.
CM("#456789").stringHEX(); // "#456789FF"
CM({ r: "45", g: "67", b: "89", a: "AB" }).stringHEX(); // "#456789AB"

// requires name plugin
import { extendPlugins } from "colormaster";
extendPlugins([NamePlugin]);
CM("red").stringHEX(); // "#FF0000FF"
```

</details>

<details>
<summary><code>random()</code></summary>
Generates a random RGBA color.

```ts
import { random } from "colormaster";

random().stringRGB(); // "rgba(255, 0, 0, 1.0)"
random()().stringHSL(); // "hsla(0, 100%, 50%, 1.0)"
random().stringHEX(); // "#FF0000FF"
```

</details>

<!-- markdownlint-enable no-inline-html -->

### Formatting

<!-- markdownlint-disable no-inline-html -->

<details>
<summary><code>string(opts?)</code></summary>
Generates a human readable string from a given color instance

```ts
import CM from "colormaster";
CM("rgba(255, 0, 0, 1)").stringRGB(); // "rgba(255, 0, 0, 1.0)"
CM("rgba(255, 0, 0, 1)").stringRGB({ alpha: false }); // "rgba(255, 0, 0)"
CM("rgba(200.1234, 100.1234, 50.1234, 0.61234)").stringRGB({ precision: [1, 2, 3, 4] }); // "rgba(200.1, 100.12, 50.123, 0.6123)"

// depending on the color space that you want to produce the string output for, you can use the corresponding method
CM("rgba(255, 0, 0, 1)").stringHEX({ alpha: false }); // "#FF0000"
CM("rgba(255, 0, 0, 1)").stringHSLA({ alpha: false }); // "hsl(0, 100%, 50%)"
```

</details>

<details>
<summary><code>name()</code> (<b>name</b> plugin)</summary>
Gets the color table <a href='https://www.rapidtables.com/web/color/RGB_Color.html'>CSS/HTML name</a> for a given color

```ts
import CM from "colormaster";
CM("rgba(255, 0, 0, 1)").name(); // "red"
CM("rgba(0, 255, 0, 1)").name(); // "green"
CM("rgba(0, 0, 255, 1)").name(); // "blue"
```

</details>

<!-- markdownlint-enable no-inline-html -->

### Channel/Instance Level Information

<!-- markdownlint-disable no-inline-html -->

<details>
<summary><code>format</code></summary>
Retrieve the format of color instance (what is the color space)

```ts
import CM from "colormaster";
CM("rgba(255, 0, 0, 1)").format; // "rgb"
```

</details>

<details>
<summary><code>red</code></summary>
Get the "red" channel value for the color instance.

```ts
import CM from "colormaster";
CM("rgba(255, 0, 0, 1)").red; // 255
CM("hsla(0, 100%, 50%, 1)").red; // 255
CM("#F00F").red; // "FF"
```

</details>

<details>
<summary><code>green</code></summary>
Get the "green" channel value for the color instance.

```ts
import CM from "colormaster";
CM("rgba(0, 255, 0, 1)").green; // 255
CM("hsla(120, 100%, 50%, 1)").green; // 255
CM("#0F0F").green; // "FF"
```

</details>

<details>
<summary><code>blue</code></summary>
Get the "blue" channel value for the color instance.

```ts
import CM from "colormaster";
CM("rgba(0, 0, 255, 1)").blue; // 255
CM("hsla(240, 100%, 50%, 1)").blue; // 255
CM("#00FF").blue; // "FF"
```

</details>

<details>
<summary><code>alpha</code></summary>
Get the "alpha" channel value for the color instance.

```ts
import CM from "colormaster";
CM("rgba(0, 0, 255, 1)").alpha; // 1
CM("hsla(240, 100%, 50%, 1)").alpha; // 1
CM("#FF0F").alpha; // "FF"
```

</details>

<details>
<summary><code>hue</code></summary>
Get the "hue" channel value for the color instance.

```ts
import CM from "colormaster";
CM("rgba(0, 0, 255, 1)").hue; // 240
CM("hsla(240, 100%, 50%, 1)").hue; // 240
CM("#00F").hue; // 240
```

</details>

<details>
<summary><code>saturation</code></summary>
Get the "saturation" channel value for the color instance.

```ts
import CM from "colormaster";
CM("rgba(0, 0, 255, 1)").saturation; // 100
CM("hsla(240, 100%, 50%, 1)").saturation; // 100
CM("#00F").saturation; // 100
```

</details>

<details>
<summary><code>lightness</code></summary>
Get the "lightness" channel value for the color instance.

```ts
import CM from "colormaster";
CM("rgba(0, 0, 255, 1)").lightness; // 50
CM("hsla(240, 100%, 50%, 1)").lightness; // 50
CM("#00F").lightness; // 50
```

</details>

<!-- markdownlint-enable no-inline-html -->

### Objects From Color Instance

<!-- markdownlint-disable no-inline-html -->

<details>
<summary><code>rgba()</code></summary>
Retrieve the object corresponding to the color instance

```ts
import CM from "colormaster";
CM("rgba(255, 0, 0, 1)").rgba(); // "{ r: 255, g: 0, b: 0, a: 1 }"
```

</details>

<details>
<summary><code>hsla()</code></summary>
Retrieve the object corresponding to the color instance

```ts
import CM from "colormaster";
CM("rgba(255, 0, 0, 1)").hsla(); // "{ h: 0, s: 100, l: 50, a: 1 }"
```

</details>

<details>
<summary><code>hexa(opts?)</code></summary>
Retrieve the object corresponding to the color instance

```ts
import CM from "colormaster";
CM("rgba(255, 0, 0, 1)").hexa(); // "{ r: "FF", g: "00", b: "00", a: "FF" }"
```

</details>

<!-- markdownlint-enable no-inline-html -->

### Manipulation

<!-- markdownlint-disable no-inline-html -->

<details>
<summary><code>hueTo(value | cssName)</code></summary>
```ts
import CM from "colormaster";
CM("rgba(255, 0, 0, 1)").hueTo(120).stringRGB(); // "rgba(0, 255, 0, 1.0)"
CM("hsla(0, 100%, 50%, 1)").hueTo(120).stringHSL(); // "hsla(120, 100%, 50%, 1.0)"
CM("#f00").hueTo("green").stringHEX(); // "#00FF00FF"
```

</details>

<details>
<summary><code>hueBy(delta)</code></summary>
```ts
import CM from "colormaster";
CM("rgba(255, 0, 0, 1)").hueBy(120).stringRGB(); // "rgba(0, 255, 0, 1.0)"
CM("hsla(0, 100%, 50%, 1)").hueBy(-30).stringHSL(); // "hsla(330, 100%, 50%, 1.0)"
CM("#f00").hueBy(240).stringHEX(); // "#0000FFFF"
```

</details>

<details>
<summary><code>alphaTo(value)</code></summary>
```ts
import CM from "colormaster";
CM("rgba(255, 0, 0, 1)").alphaTo(0.5).stringRGB(); // "rgba(255, 0, 0, 0.5)"
CM("hsla(0, 100%, 50%, 1)").alphaTo(0.5).stringHSL(); // "hsla(0, 100%, 50%, 0.5)"
CM("#f00").alphaTo("AA").stringHEX(); // "#FF0000AA"
```

</details>

<details>
<summary><code>alphaBy(delta)</code></summary>
```ts
import CM from "colormaster";
CM("rgba(255, 0, 0, 1)").alphaBy(-0.1).stringRGB(); // "rgba(255, 0, 0, 0.9)"
CM("hsla(0, 100%, 50%, 1)").alphaBy(-0.1).stringHSL(); // "hsla(0, 100%, 50%, 0.9)"
CM("#f009").alphaBy("23").stringHEX(); // "#FF0000BC"
```

</details>

<details>
<summary><code>saturateBy(delta)</code></summary>
This adds pigmentation to a color, making it less gray.

```ts
import CM from "colormaster";
CM("hsla(0, 60%, 50%, 1)").saturateBy(20).stringHSL(); // "hsla(0, 80%, 50%, 1.0)"
```

</details>

<details>
<summary><code>desaturateBy(delta)</code></summary>
The opposite affect of <code>saturateBy(delta)</code>.
This removes pigmentation from a color making it more gray.

```ts
import CM from "colormaster";
CM("hsla(0, 60%, 50%, 1)").desaturateBy(20).stringHSL(); // "hsla(0, 40%, 50%, 1.0)"
```

</details>

<details>
<summary><code>lighterBy(delta)</code></summary>
This adds white to a color.

```ts
import CM from "colormaster";
CM("hsla(0, 60%, 50%, 1)").lighterBy(10).stringHSL(); // "hsla(0, 60%, 60%, 1.0)"
```

</details>

<details>
<summary><code>darkerBy(delta)</code></summary>
The opposite of <code>lighterBy(delta)</code>.
This adds black to a color.

```ts
import CM from "colormaster";
CM("hsla(0, 60%, 50%, 1)").darkerBy(10).stringHSL(); // "hsla(0, 60%, 40%, 1.0)"
```

</details>

<details>
<summary><code>grayscale()</code></summary>
The same as setting the saturation to "0%" for a color. This makes the color appear grey as it completely removes all pigmentation.

```ts
import CM from "colormaster";
CM("hsla(0, 60%, 50%, 1)").grayscale().stringHSL(); // "hsla(0, 0%, 50%, 1.0)"
```

</details>

<details>
<summary><code>rotate(value)</code></summary>
This simply adjusts the angle of the color along the color wheel by incrementing the hue value.

```ts
import CM from "colormaster";
CM("hsla(0, 60%, 50%, 1)").rotate(120).stringHSL(); // "hsla(120, 60%, 50%, 1.0)"
```

</details>

<details>
<summary><code>invert(opts?)</code></summary>
Gets the inverted color corresponding to the current color.
This is different from a complementary color.

Example, hue of 120 is 240 for the inverted color (360-120), but 300 for the complementary color (120+180)

```ts
import CM from "colormaster";
CM("hsla(120, 60%, 30%, 0.3)").invert().stringHSL(); // "hsla(240, 40%, 70%, 0.7)"
CM("hsla(120, 60%, 30%, 0.3)").invert({ alpha: false }).stringHSL(); // "hsla(240, 40%, 70%, 0.3)"
```

</details>

<!-- markdownlint-enable no-inline-html -->

### Accessibility (Plugin - aka A11y)

<!-- markdownlint-disable no-inline-html -->

<details>
<summary><code>brightness(opts?)</code></summary>
Finds the normalized brightness of the color as defined by <a href="https://www.w3.org/TR/AERT/#color-contrast">
WCAG</a>

```ts
import CM from "colormaster";
CM("hsla(0, 0%, 0%, 1)").brightness(); // 0
CM("hsla(0, 0%, 0%, 1)").brightness({ percentage: true }); // 0
CM("hsla(0, 0%, 25.1%, 1)").brightness(); // 0.251
CM("hsla(0, 0%, 25.1%, 1)").brightness({ percentage: true }); // 25.1
CM("hsla(0, 0%, 50.2%, 1)").brightness(); // 0.502
CM("hsla(0, 0%, 50.2%, 1)").brightness({ percentage: true }); // 50.2
CM("hsla(0, 0%, 75.29%, 1)").brightness(); // 0.7529
CM("hsla(0, 0%, 75.29%, 1)").brightness({ percentage: true }); // 75.29
CM("hsla(0, 0%, 100%, 1)").brightness(); // 1
CM("hsla(0, 0%, 100%, 1)").brightness({ percentage: true }); // 100
```

</details>

<details>
<summary><code>luminance(opts?)</code></summary>
Finds the normalized luminance of the color as defined by <a href="https://www.w3.org/TR/WCAG20/#relativeluminancedef">
WCAG 2.0</a>

```ts
import CM from "colormaster";
CM("hsla(0, 0%, 0%, 1)").luminance(); // 0
CM("hsla(0, 0%, 0%, 1)").luminance({ percentage: true }); // 0
CM("hsla(0, 0%, 25.1%, 1)").luminance(); // 0.0513
CM("hsla(0, 0%, 25.1%, 1)").luminance({ percentage: true }); // 5.13
CM("hsla(0, 0%, 50.2%, 1)").luminance(); // 0.2159
CM("hsla(0, 0%, 50.2%, 1)").luminance({ percentage: true }); // 21.59
CM("hsla(0, 0%, 75.29%, 1)").luminance(); // 0.5271
CM("hsla(0, 0%, 75.29%, 1)").luminance({ percentage: true }); // 52.71
CM("hsla(0, 0%, 100%, 1)").luminance(); // 1
CM("hsla(0, 0%, 100%, 1)").luminance({ percentage: true }); // 100
```

</details>

<details>
<summary><code>contrast(opts?)</code></summary>
Indicates how well a given color can be read/seen when on a background given by <code>bgColor</code>.
A ratio of "1:1" indicates very poor contrast, while "21:1" indicates very good contrast. The calculated value also
depends on factors such as text size and contrast ratio type. The lowest acceptable contrast ratio is "3:1" according to
<a href='https://developer.mozilla.org/en-US/docs/Web/Accessibility/Understanding_WCAG/Perceivable/Color_contrast'>WCAG</a>

```ts
import CM from "colormaster";

// default bgColor is white
CM("hsla(0, 0%, 0%, 1)").contrast(); // 21
CM("hsla(0, 0%, 0%, 1)").contrast({ ratio: true }); // "21.0000:1"
CM("hsla(0, 0%, 25.1%, 1)").contrast(); // 10.3653
CM("hsla(0, 0%, 25.1%, 1)").contrast({ ratio: true }); // "10.3653:1"
CM("hsla(0, 0%, 50.2%, 1)").contrast(); // 3.9489
CM("hsla(0, 0%, 50.2%, 1)").contrast({ ratio: true }); // "3.9489:1"
CM("hsla(0, 0%, 75.29%, 1)").contrast(); // 1.8194
CM("hsla(0, 0%, 75.29%, 1)").contrast({ ratio: true }); // "1.8194:1"
CM("hsla(0, 0%, 100%, 1)").contrast(); // 1
CM("hsla(0, 0%, 100%, 1)").contrast({ ratio: true }); // "1.0000:1"
CM("hsla(0, 0%, 100%, 1)").contrast({ bgColor: "#000", ratio: true }); // "21.0000:1"
```

</details>

<details>
<summary><code>isLight()</code></summary>
Based on the color brightness (true if <code>brightness >= 0.5</code>)

```ts
import CM from "colormaster";
CM(0, 0, 0).isLight(); // false
CM(0, 0, 49.9).isLight(); // false
CM(0, 0, 50.1).isLight(); // true
CM(0, 0, 100).isLight(); // true
```

</details>

<details>
<summary><code>isDark()</code></summary>
Based on the color brightness (true if <code>brightness < 0.5</code>)

```ts
import CM from "colormaster";
CM(0, 0, 0).isDark(); // true
CM(0, 0, 49.9).isDark(); // true
CM(0, 0, 50.1).isDark(); // false
CM(0, 0, 100).isDark(); // false
```

</details>

<details>
<summary><code>readableOn(opts?)</code></summary>
Based on the contrast value of a color on a given background color.
The output is obtained by the conditions outlined in <a href='https://developer.mozilla.org/en-US/docs/Web/Accessibility/Understanding_WCAG/Perceivable/Color_contrast'>WCAG</a>

```ts
import CM from "colormaster";
const blackColor = CM(0, 0, 0);

// extremes (default color is white as bg, size = body, ratio = minimum)
CM(0, 0, 100).readableOn(); // false
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
<summary><code>equalTo(compareColor?)</code></summary>
Determines if the current color is identical (all channels are the same) to <code>compareColor</code>

```ts
import CM from "colormaster";
CM(0, 0, 99, 1).equalTo(CM(0, 0, 99, 1)); // true
CM(0, 0, 99, 1).equalTo(CM(1, 0, 99, 1)); // false
CM(0, 0, 99, 1).equalTo(CM(0, 1, 99, 1)); // false
CM(0, 0, 99, 1).equalTo(CM(0, 0, 98, 1)); // false
CM(0, 0, 99, 1).equalTo(CM(0, 0, 99, 0.9)); // false
```

</details>

<details>
<summary><code>isWarm()</code></summary>
"Warm colors are the colors from red through to yellow. These colors are said to bring to mind warmth, like the sun."
Based on the information presented on <a href="https://www.canva.com/colors/color-wheel/">Canva</a>

```ts
import CM from "colormaster";
CM(74.9, 100, 50, 1).isWarm(); // true
CM(255, 100, 50, 1).isWarm(); // true
CM(0, 100, 50, 1).isWarm(); // true
CM(180, 100, 50, 1).isWarm(); // false
```

</details>

<details>
<summary><code>isCool()</code></summary>
"Cool colors are the colors from blue to green and purple. These colors are said to bring to mind coolness, like water."
Based on the information presented on <a href="https://www.canva.com/colors/color-wheel/">Canva</a>

```ts
import CM from "colormaster";
CM(75, 100, 50, 1).isCool(); // true
CM(254.9, 100, 50, 1).isCool(); // true
CM(180, 100, 50, 1).isCool(); // true
CM(0, 100, 50, 1).isCool(); // false
```

</details>

<details>
<summary><code>isTinted()</code></summary>
A color is tinted if its lightness value is strictly greater than 50%.

```ts
import CM from "colormaster";
CM(0, 100, 51, 1).isTinted(); // true
CM(0, 100, 50, 1).isTinted(); // false
CM(0, 100, 49, 1).isTinted(); // false
```

</details>

<details>
<summary><code>isShaded()</code></summary>
A color is shaded if its lightness value is strictly less than 50%.

```ts
import CM from "colormaster";
CM(0, 100, 51, 1).isShaded(); // false
CM(0, 100, 50, 1).isShaded(); // false
CM(0, 100, 49, 1).isShaded(); // true
```

</details>

<details>
<summary><code>isToned()</code></summary>
A color is toned if its saturation value is strictly less than 100%.

```ts
import CM from "colormaster";
CM(0, 100, 50, 1).isToned(); // false
CM(0, 99, 50, 1).isToned(); // true
```

</details>

<details>
<summary><code>isPureHue(opts)</code></summary>
A color is pure if its saturation value is 100% and lightness value is 50%.

```ts
import CM from "colormaster";
CM(0, 100, 50, 1).isPureHue(); // { pure: true, reason: 'N/A' }
CM(0, 100, 50, 1).isPureHue({ reason: false }); // true
CM(0, 100, 51, 1).isPureHue(); // { pure: false, reason: 'tinted' }
CM(0, 100, 51, 1).isPureHue({ reason: false }); // false
CM(0, 100, 49, 1).isPureHue(); // { pure: false, reason: 'shaded' }
CM(0, 100, 49, 1).isPureHue({ reason: false }); // false
CM(0, 99, 50, 1).isPureHue(); // { pure: false, reason: 'toned' }
CM(0, 99, 50, 1).isPureHue({ reason: false }); // false
```

</details>

<details>
<summary><code>closestWebSafe()</code></summary>
Finds the closest color to the current color instance that is considered to be
 <a href='https://www.rapidtables.com/web/color/Web_Safe.html'>web safe</a>

```ts
import CM from "colormaster";
CM(3, 97, 47, 0.7).closestWebSafe().string(); // "hsla(0, 100%, 50%, 0.7)"
```

</details>

<details>
<summary><code>closestCool()</code></summary>
Finds the closest color to the current color instance that is a "Cool" color

```ts
import CM from "colormaster";
CM(300, 100, 50, 1).closestCool().string(); // "hsla(254, 100%, 50%, 1.0)"
```

</details>

<details>
<summary><code>closestWarm()</code></summary>
Finds the closest color to the current color instance that is a "Warm" color

```ts
import CM from "colormaster";
CM(120, 100, 50, 1).closestWarm().string(); // "hsla(74, 100%, 50%, 1.0)"
```

</details>

<details>
<summary><code>closestPureHue()</code></summary>
Finds the closest color (hue) to the current color instance that has 100% saturation and 50% lightness.

```ts
import CM from "colormaster";
CM(120, 99, 51, 1).closestPureHue().string(); // "hsla(120, 100%, 50%, 1.0)"
```

</details>

<!-- markdownlint-enable no-inline-html -->

### Color Harmonies (Plugin)

<!-- markdownlint-disable no-inline-html -->

<details>
<summary><code>harmony(opts?)</code></summary>
Generates a <a href='https://www.tigercolor.com/color-lab/color-theory/color-harmonies.htm'>color harmony</a> according to the selected <code>type</code>.
Note that for the 'monochromatic' color harmony, an array of tints, shades, or tones is generated based on the provided <code>monochromaticOpts</code>

```ts
import CM from "colormaster";
const ogColor = "hsla(30, 50%, 50%, 1)";
CM(ogColor)
  .harmony("analogous")
  .map((c) => c.string());
// ["hsla(0, 50%, 50%, 1.0)", "hsla(30, 50%, 50%, 1.0)", "hsla(60, 50%, 50%, 1.0)"]

CM(ogColor)
  .harmony("complementary")
  .map((c) => c.string());
// ["hsla(30, 50%, 50%, 1.0)", "hsla(210, 50%, 50%, 1.0)"]

CM(ogColor)
  .harmony("split-complementary")
  .map((c) => c.string());
// ["hsla(30, 50%, 50%, 1.0)", "hsla(180, 50%, 50%, 1.0)", "hsla(240, 50%, 50%, 1.0)"]

CM(ogColor)
  .harmony("double-split-complementary")
  .map((c) => c.string());
// ["hsla(0, 50%, 50%, 1.0)", "hsla(30, 50%, 50%, 1.0)", "hsla(60, 50%, 50%, 1.0)", "hsla(180, 50%, 50%, 1.0)", "hsla(240, 50%, 50%, 1.0)"]

CM(ogColor)
  .harmony("triad")
  .map((c) => c.string());
// ["hsla(30, 50%, 50%, 1.0)", "hsla(150, 50%, 50%, 1.0)", "hsla(270, 50%, 50%, 1.0)"]

CM(ogColor)
  .harmony("rectangle")
  .map((c) => c.string());
// ["hsla(30, 50%, 50%, 1.0)", "hsla(90, 50%, 50%, 1.0)",  "hsla(210, 50%, 50%, 1.0)", "hsla(270, 50%, 50%, 1.0)"]

CM(ogColor)
  .harmony("square")
  .map((c) => c.string());
// ["hsla(30, 50%, 50%, 1.0)", "hsla(120, 50%, 50%, 1.0)", "hsla(210, 50%, 50%, 1.0)", "hsla(300, 50%, 50%, 1.0)"]

CM(ogColor)
  .harmony("monochromatic", { effect: "tints" })
  .map((c) => c.string());
// ["hsla(30, 50%, 50%, 1.0)", "hsla(30, 50%, 60%, 1.0)", "hsla(30, 50%, 70%, 1.0)", "hsla(30, 50%, 80%, 1.0)", "hsla(30, 50%, 90%, 1.0)", "hsla(30, 50%, 100%, 1.0)"]

CM(ogColor)
  .harmony("monochromatic", { effect: "shades" })
  .map((c) => c.string());
// ["hsla(30, 50%, 50%, 1.0)", "hsla(30, 50%, 40%, 1.0)", "hsla(30, 50%, 30%, 1.0)", "hsla(30, 50%, 20%, 1.0)", "hsla(30, 50%, 10%, 1.0)", "hsla(30, 50%, 0%, 1.0)"]

CM(ogColor)
  .harmony("monochromatic", { effect: "tones" })
  .map((c) => c.string());
// ["hsla(30, 50%, 50%, 1.0)", "hsla(30, 40%, 50%, 1.0)", "hsla(30, 30%, 50%, 1.0)", "hsla(30, 20%, 50%, 1.0)", "hsla(30, 10%, 50%, 1.0)", "hsla(30, 0%, 50%, 1.0)"]
```

</details>

<!-- markdownlint-enable no-inline-html -->

### Color Mixing (Plugin)

<!-- markdownlint-disable no-inline-html -->

<details>
<summary><code>mix(color, ratio?)</code></summary>
```ts
example
```
</details>

<!-- markdownlint-enable no-inline-html -->

## Plugins

**ColorMaster** comes out of the box with an extendable plugin mechanism that adds extra functionality to the core library.

<!-- markdownlint-disable no-inline-html -->

<details>
<summary><code>A11yPlugin</code> (<b>Accessibility</b>)</summary>

```ts
import CM from "colormaster";
```

</details>

<details>
<summary><code>NamePlugin</code> (<b>CSS Names</b>)</summary>

```ts
import CM from "colormaster";
```

</details>

<details>
<summary><code>MixPlugin</code> (<b>Color Mixtures</b>)</summary>

```ts
import CM from "colormaster";
```

</details>

<details>
<summary><code>HarmonyPlugin</code> (<b>Color Harmonies</b>)</summary>

```ts
import CM from "colormaster";
```

</details>
<br/>

<!-- markdownlint-enable no-inline-html -->

**Note**: More plugins will be added to accommodate user demands & improve ColorMaster as a whole

## 😍 Strongly Typed

Rather than using pure JavaScript which can lead to hard to debug errors during development, **ColorMaster** was written in [TypeScript](https://www.typescriptlang.org/) (strict mode) to provide a pleasant development experience.

The type definitions are included with the module, so you get intellisense right out of the box.

Additionally, **ColorMaster** exports all of its types and interfaces so that you can use them in your code.

Next we present how to type your code for RGBA, HEXA, and HSLA color space objects, but you can follow the same principles for all supported color spaces.

```ts
import { Irgb, Irgba, Ihex, Ihexa, Ihsl, Ihsla } from "colormaster/types";

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

- [x] CSS/HTML name handling
- [x] Color wheel manipulation (rotation, saturation, lightness, grayscale)
- [x] Proper handling of improper input values
- [x] `brightness`, `luminance`, `contrast` accessibility functions - along with other helpful wrappers
- [x] Setting/adjusting channel values in all color spaces
- [x] Plugin Mechanism to extend functionality of core library
- [x] Color harmony generation
- [x] Color mixing (done in LCHA color space)
- [x] `RGBA` color space conversion & parsing
- [x] `HEXA` color space conversion & parsing
- [x] `HSLA` color space conversion & parsing
- [ ] `XYZ` color space ~~conversion~~ & parsing
- [ ] `LAB` color space ~~conversion~~ & parsing
- [ ] `LCH`color space ~~conversion~~ & parsing
- [ ] `HSV` color space ~~conversion~~ & parsing
- [ ] `HWB` color space conversion & parsing
- [ ] `RYB` color space conversion & parsing
- [ ] `CMYK` color space conversion & parsing

## License [![GitHub License](https://img.shields.io/github/license/lbragile/colormaster?color=00D800&label=License&logo=github&style=flat-square)](https://github.com/lbragile/ColorMaster/blob/master/LICENSE)

All of the code used in **ColorMaster** is released under the [MIT License](https://github.com/lbragile/ColorMaster/blob/master/LICENSE).

[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Flbragile%2FColorMaster.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2Flbragile%2FColorMaster?utm_source=share_link)
