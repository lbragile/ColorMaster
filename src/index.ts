import HSLColors from "./models/hsl";
import RGBColors from "./models/rgb";
import { Irgb, Irgba } from "./types/rgb";

/**
 * Wrapper for instantiating a RGBColors object
 * @param values -
 * - ```{ Irgb | Irgba }``` → RGBA values as an object
 * - ```{ number[] }``` → RGBA values as an array of values
 * - ```{ string }``` →  A CSS string representation of an rgb or rgba color
 *
 * @example { Irgb | Irgba } → { r: 128, g: 128, b: 128, a: 0.5 }
 * @example { number[] } → [128, 128, 128, 0.5]
 * @example { string } → 'rgba(128, 128, 128, 0.5)'
 *
 * @see {@link https://www.typescriptlang.org/docs/handbook/2/functions.html#function-overloads} for function overloading in TS
 */
export function rgb(values: Irgb | Irgba | number[] | string): RGBColors;

/**
 * Wrapper for instantiating a RGBColors object
 * @param r red channel → [0, 255]
 * @param g green channel → [0, 255]
 * @param b blue channel → [0, 255]
 * @param a alpha channel → [0, 1]
 *
 * @see {@link https://www.typescriptlang.org/docs/handbook/2/functions.html#function-overloads} for function overloading in TS
 */
export function rgb(r: number, g: number, b: number, a?: number): RGBColors;

export function rgb(
  rOrValues: Irgba | Irgb | number[] | number | string,
  g?: number,
  b?: number,
  a?: number
): RGBColors {
  if (rOrValues.constructor.name.toLowerCase() === "object") {
    const { r, g, b, a } = rOrValues as Irgba;
    return new RGBColors(r, g, b, a);
  } else if (Array.isArray(rOrValues) || typeof rOrValues === "string") {
    rOrValues =
      typeof rOrValues === "string"
        ? rOrValues
            .replace(/(rgba?)?\(|\)/g, "")
            .split(",")
            .map((val) => +val)
        : (rOrValues as number[]);

    const [r, g, b, a] = rOrValues;
    return new RGBColors(r, g, b, a);
  } else {
    return new RGBColors(rOrValues as number, g as number, b as number, a);
  }
}

const hsl = new HSLColors(360, 100, 50, 0.3);
console.log(hsl.string({ withAlpha: true }));
// console.log(hsl.rgb().string({ withAlpha: true }));
// console.log(hsl.grayscale().string({ withAlpha: true }));
console.log(hsl.lighterBy(10).string({ withAlpha: true }));
console.log(hsl.darkerBy(20).string({ withAlpha: true }));
console.log(hsl.darkerBy(1000).string({ withAlpha: true }));
console.log(hsl.lighterBy(1000).string({ withAlpha: true }));
console.log(hsl.grayscale().string({ withAlpha: true }));
