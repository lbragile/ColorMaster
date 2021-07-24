import RGBColors from "./models/rgb";
import { Irgb, Irgba } from "./types/rgb";

/**
 * Wrapper for instantiating a RGBColors object
 * @param rgbObj RGBA values as an object
 *
 * @example { r: 128, g: 128, b: 128, a: 0.5 }
 * @see {@link https://www.typescriptlang.org/docs/handbook/2/functions.html#function-overloads} for function overloading in TS
 */
export function rgb(rgbObj: Irgb | Irgba): RGBColors;

/**
 * Wrapper for instantiating a RGBColors object
 * @param rgbArr RGBA values as an array
 *
 * @example [128, 128, 128, 0.5]
 * @see {@link https://www.typescriptlang.org/docs/handbook/2/functions.html#function-overloads} for function overloading in TS
 */
export function rgb(rgbArr: number[]): RGBColors;

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

/**
 * Wrapper for instantiating a RGBColors object
 * @param rgba A CSS string representation of an rgb or rgba color.
 *
 * @note Must be in format rgba?\((\d+,){3,4}\)
 * @see {@link https://www.typescriptlang.org/docs/handbook/2/functions.html#function-overloads} for function overloading in TS
 */
export function rgb(rgba: string): RGBColors;

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
