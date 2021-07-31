/**
 * This file is meant for quick debugging and is not included in the final build
 * Triggered by the following npm script: `npm run debug`
 */

import CM from "./index";

/* luminance */
console.log("\nluminance\n");

console.log(CM.RGBAFrom("128, 128, 128, 1").luminance());
console.log(CM.RGBAFrom("128, 128, 128, 1").luminance({ percentage: true }));
console.log(CM.RGBAFrom("204, 221, 238, 1").luminance({ percentage: true }));
console.log(CM.RGBAFrom("255, 255, 255, 1").luminance({ percentage: true }));

console.log("\n--------\n");

/* contrast */
console.log("\ncontrast\n");

console.log(CM.RGBAFrom("255, 255, 255, 1").contrast([255, 255, 0]));
console.log(CM.RGBAFrom("255, 0, 0, 1").contrast());
console.log(CM.RGBAFrom("255, 0, 0, 1").contrast([255, 255, 0], { ratio: true }));

console.log("\n--------\n");

/* readableOn */
console.log("\nreadableOn\n");

console.log(CM.RGBAFrom("0, 0, 0, 1").readableOn());
console.log(CM.RGBAFrom("128, 128, 128, 1").readableOn());
console.log(CM.RGBAFrom("255, 255, 255, 1").readableOn([0, 0, 0]));
console.log(CM.RGBAFrom("230, 0, 0, 1").readableOn([255, 255, 71]));
console.log(CM.RGBAFrom("230, 0, 0, 1").readableOn([255, 255, 71], { ratio: "enhanced" }));
console.log(CM.RGBAFrom("230, 0, 0, 1").readableOn([255, 255, 71], { size: "large", ratio: "enhanced" }));

console.log("\n--------\n");

/* equalTo */
console.log("\nequalTo\n");

console.log(CM.RGBAFrom("0, 0, 0, 1").equalTo([0, 0, 0]));
console.log(CM.RGBAFrom("0, 0, 0, 1").equalTo([255, 255, 255]));
console.log(CM.RGBAFrom("0, 0, 0, 1").equalTo([0, 0, 0, 0.5]));
console.log(CM.RGBAFrom("230, 0, 0, 1").equalTo([230, 0, 0]));
console.log(CM.RGBAFrom("230, 0, 0, 1").equalTo(CM.RGBAFrom("230, 0, 0, 1")));
console.log(CM.RGBAFrom("230, 0, 0, 1").equalTo(CM.RGBAFrom("229, 0, 0, 1")));

console.log("\n--------\n");

/* random */
console.log("\nrandom\n");

console.log(CM.random().string());
console.log(CM.random().string());
console.log(CM.random().string());
console.log(CM.random().string());
console.log(CM.random().string());
console.log(CM.random().string());
console.log(CM.random().string());
console.log(CM.random().string());

console.log("\n--------\n");

/* getters */
console.log("\ngetter RGBA\n");

console.log(CM.RGBAFrom("230, 0, 0, 1").red);
console.log(CM.RGBAFrom("230, 0, 0, 1").blue);
console.log(CM.RGBAFrom("230, 0, 0, 1").green);
console.log(CM.RGBAFrom("230, 0, 0, 1").alpha);
console.log(CM.RGBAFrom("230, 0, 0, 1").hue);
console.log(CM.RGBAFrom("230, 0, 0, 1").saturation);
console.log(CM.RGBAFrom("230, 0, 0, 1").lightness);

console.log("\ngetter HEXA\n");

console.log(CM.HEXAFrom("#aabbccdd").red);
console.log(CM.HEXAFrom("#aabbccdd").blue);
console.log(CM.HEXAFrom("#aabbccdd").green);
console.log(CM.HEXAFrom("#aabbccdd").alpha);
console.log(CM.HEXAFrom("#aabbccdd").hue);
console.log(CM.HEXAFrom("#aabbccdd").saturation);
console.log(CM.HEXAFrom("#aabbccdd").lightness);

console.log("\ngetter HSLA\n");

console.log(CM.HSLAFrom("0, 50%, 50%").red);
console.log(CM.HSLAFrom("0, 50%, 50%").blue);
console.log(CM.HSLAFrom("0, 50%, 50%").green);
console.log(CM.HSLAFrom("0, 50%, 50%").alpha);
console.log(CM.HSLAFrom("0, 50%, 50%").hue);
console.log(CM.HSLAFrom("0, 50%, 50%").saturation);
console.log(CM.HSLAFrom("0, 50%, 50%").lightness);

console.log("\n--------\n");
