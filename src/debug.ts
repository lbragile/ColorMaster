/**
 * This file is meant for quick debugging and is not included in the final build
 * Triggered by the following npm script: `npm run debug`
 */

import CM from "./index";

console.log("\n🔸 luminance\n");

console.log(CM.RGBAFrom("128, 128, 128, 1").luminance());
console.log(CM.RGBAFrom("128, 128, 128, 1").luminance({ percentage: true }));
console.log(CM.RGBAFrom("204, 221, 238, 1").luminance({ percentage: true }));
console.log(CM.RGBAFrom("255, 255, 255, 1").luminance({ percentage: true }));

console.log("\n--------\n");

console.log("🔸 contrast\n");

console.log(CM.RGBAFrom("255, 255, 255, 1").contrast([255, 255, 0]));
console.log(CM.RGBAFrom("255, 0, 0, 1").contrast());
console.log(CM.RGBAFrom("255, 0, 0, 1").contrast([255, 255, 0], { ratio: true }));

console.log("\n--------\n");

console.log("🔸 readableOn\n");

console.log(CM.RGBAFrom("0, 0, 0, 1").readableOn());
console.log(CM.RGBAFrom("128, 128, 128, 1").readableOn());
console.log(CM.RGBAFrom("255, 255, 255, 1").readableOn([0, 0, 0]));
console.log(CM.RGBAFrom("230, 0, 0, 1").readableOn([255, 255, 71]));
console.log(CM.RGBAFrom("230, 0, 0, 1").readableOn([255, 255, 71], { ratio: "enhanced" }));
console.log(CM.RGBAFrom("230, 0, 0, 1").readableOn([255, 255, 71], { size: "large", ratio: "enhanced" }));

console.log("\n--------\n");

console.log("🔸 equalTo\n");

console.log(CM.RGBAFrom("0, 0, 0, 1").equalTo([0, 0, 0]));
console.log(CM.RGBAFrom("0, 0, 0, 1").equalTo([255, 255, 255]));
console.log(CM.RGBAFrom("0, 0, 0, 1").equalTo([0, 0, 0, 0.5]));
console.log(CM.RGBAFrom("230, 0, 0, 1").equalTo([230, 0, 0]));
console.log(CM.RGBAFrom("230, 0, 0, 1").equalTo(CM.RGBAFrom("230, 0, 0, 1")));
console.log(CM.RGBAFrom("230, 0, 0, 1").equalTo(CM.RGBAFrom("229, 0, 0, 1")));

console.log("\n--------\n");

console.log("🔸 random\n");

console.log(CM.random().string());
console.log(CM.random().string());
console.log(CM.random().string());
console.log(CM.random().string());
console.log(CM.random().string());
console.log(CM.random().string());
console.log(CM.random().string());
console.log(CM.random().string());

console.log("\n--------\n");

console.log("🔸 getter RGBA\n");

console.log(CM.RGBAFrom("230, 0, 0, 1").red);
console.log(CM.RGBAFrom("230, 0, 0, 1").blue);
console.log(CM.RGBAFrom("230, 0, 0, 1").green);
console.log(CM.RGBAFrom("230, 0, 0, 1").alpha);
console.log(CM.RGBAFrom("230, 0, 0, 1").hue);
console.log(CM.RGBAFrom("230, 0, 0, 1").saturation);
console.log(CM.RGBAFrom("230, 0, 0, 1").lightness);

console.log("\n🔸 getter HEXA\n");

console.log(CM.HEXAFrom("#aabbccdd").red);
console.log(CM.HEXAFrom("#aabbccdd").blue);
console.log(CM.HEXAFrom("#aabbccdd").green);
console.log(CM.HEXAFrom("#aabbccdd").alpha);
console.log(CM.HEXAFrom("#aabbccdd").hue);
console.log(CM.HEXAFrom("#aabbccdd").saturation);
console.log(CM.HEXAFrom("#aabbccdd").lightness);

console.log("\n🔸 getter HSLA\n");

console.log(CM.HSLAFrom("0, 50%, 50%").red);
console.log(CM.HSLAFrom("0, 50%, 50%").blue);
console.log(CM.HSLAFrom("0, 50%, 50%").green);
console.log(CM.HSLAFrom("0, 50%, 50%").alpha);
console.log(CM.HSLAFrom("0, 50%, 50%").hue);
console.log(CM.HSLAFrom("0, 50%, 50%").saturation);
console.log(CM.HSLAFrom("0, 50%, 50%").lightness);

console.log("\n--------\n");

console.log("🔸 name\n");

console.log(CM.RGBAFrom("0, 0, 0, 1").name());
console.log(CM.RGBAFrom("0, 0, 1, 1").name({ exact: false }));
console.log(CM.RGBAFrom("0, 0, 1, 1").name());
console.log(CM.HEXAFrom("#000000FF").name());
console.log(CM.HEXAFrom("#000001FF").name({ exact: false }));
console.log(CM.HEXAFrom("#000001FF").name());
console.log(CM.HSLAFrom("0, 0, 0, 1").name());
console.log(CM.HSLAFrom("0, 0, 1, 1").name({ exact: false }));
console.log(CM.HSLAFrom("0, 0, 1, 1").name());

console.log("\n--------\n");

console.log("🔸 name\n");
console.log("OG", CM.HSLAFrom("30, 50, 50, 1").string());

console.log("\nAnalogous\n");

console.log(
  CM.HSLAFrom("30, 50, 50, 1")
    .harmony("analogous")
    .map((color) => color.string())
);

console.log("\nComplementary\n");

console.log(
  CM.HSLAFrom("30, 50, 50, 1")
    .harmony("complementary")
    .map((color) => color.string())
);

console.log("\nSplit Complementary\n");

console.log(
  CM.HSLAFrom("30, 50, 50, 1")
    .harmony("split-complementary")
    .map((color) => color.string())
);

console.log("\nDouble Split Complementary\n");

console.log(
  CM.HSLAFrom("30, 50, 50, 1")
    .harmony("double-split-complementary")
    .map((color) => color.string())
);

console.log("\nTriad\n");

console.log(
  CM.HSLAFrom("30, 50, 50, 1")
    .harmony("triad")
    .map((color) => color.string())
);

console.log("\nRectangle\n");

console.log(
  CM.HSLAFrom("30, 50, 50, 1")
    .harmony("rectangle")
    .map((color) => color.string())
);

console.log("\nSquare\n");

console.log(
  CM.HSLAFrom("30, 50, 50, 1")
    .harmony("square")
    .map((color) => color.string())
);

console.log("\nMonochromatic - tints\n");

console.log(
  CM.HSLAFrom("30, 50, 50, 1")
    .harmony("monochromatic", { effect: "tints" })
    .map((color) => color.string())
);

console.log("\nMonochromatic - shades\n");

console.log(
  CM.HSLAFrom("30, 50, 50, 1")
    .harmony("monochromatic", { effect: "shades" })
    .map((color) => color.string())
);

console.log("\nMonochromatic - tones\n");

console.log(
  CM.HSLAFrom("30, 50, 50, 1")
    .harmony("monochromatic", { effect: "tones" })
    .map((color) => color.string())
);

console.log("\n--------\n");

console.log("Tinted/Shaded/Toned\n");

console.log(CM.HSLAFrom("100, 50, 50.1, 1").isTinted());
console.log(CM.HSLAFrom("100, 50, 50, 1").isTinted()); // false
console.log(CM.HSLAFrom("100, 50, 49.9, 1").isTinted()); // false
console.log(CM.HSLAFrom("100, 50, 50.1, 1").isShaded()); // false
console.log(CM.HSLAFrom("100, 50, 50, 1").isShaded()); // false
console.log(CM.HSLAFrom("100, 50, 49.9, 1").isShaded());
console.log(CM.HSLAFrom("100, 99.9, 50, 1").isToned());
console.log(CM.HSLAFrom("100, 100, 50, 1").isToned()); // false

console.log("\n--------\n");

console.log("Cool/Warm\n");

console.log(CM.HSLAFrom("254.9, 50, 50, 1").isCool());
console.log(CM.HSLAFrom("255, 50, 50, 1").isWarm());
console.log(CM.HSLAFrom("0, 50, 50, 1").isWarm());
console.log(CM.HSLAFrom("180, 50, 50, 1").isCool());
console.log(CM.HSLAFrom("74.9, 50, 50, 1").isWarm());
console.log(CM.HSLAFrom("75, 50, 50, 1").isCool());
console.log(CM.HSLAFrom("75, 50, 50, 1").isWarm()); // false

console.log("\n--------\n");

console.log("HSLA from CSS Name\n");

console.log(CM.HSLAFrom("red", 100, 50, 1).hue);
console.log(CM.HSLAFrom("orange", 100, 50, 1).hue);
console.log(CM.HSLAFrom("yellow", 100, 50, 1).hue);
console.log(CM.HSLAFrom("lime", 100, 50, 1).hue);
console.log(CM.HSLAFrom("green", 100, 50, 1).hue);
console.log(CM.HSLAFrom("green cyan", 100, 50, 1).hue);
console.log(CM.HSLAFrom("cyan", 100, 50, 1).hue);
console.log(CM.HSLAFrom("cyan blue", 100, 50, 1).hue);
console.log(CM.HSLAFrom("blue", 100, 50, 1).hue);
console.log(CM.HSLAFrom("purple", 100, 50, 1).hue);
console.log(CM.HSLAFrom("pink", 100, 50, 1).hue);
console.log(CM.HSLAFrom("pink red", 100, 50, 1).hue);
