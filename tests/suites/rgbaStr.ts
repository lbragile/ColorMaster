import { add, complete, cycle, suite, rgb, colord, tinycolor2, color, chroma, acColor } from "./common";

// Used in suite below for all libraries
const RGBA_STR = "rgba(128, 128, 128, 0.5)";

module.exports = suite(
  "Parse RGB Input and convert to RGBA string",

  add("ColorMaster", () => rgb(RGBA_STR).string()),
  add("Colord", () => colord(RGBA_STR).toRgbString()),
  add("Color", () => color(RGBA_STR).string()),
  add("TinyColor2", () => tinycolor2(RGBA_STR).toString()),
  add("chroma-js", () => chroma(RGBA_STR).css()),
  add("ac-colors", () => new acColor({ color: RGBA_STR }).rgbString),

  cycle(),
  complete()
);
