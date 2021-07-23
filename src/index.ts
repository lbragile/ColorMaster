import RGBColors, { Irgba } from "./models/rgb";

/**
 * Wrapper for instantiating a RGBColors object
 * @param rgbObj RGBA values as an object
 *
 * @example { r: 128, g: 128, b: 128, a: 0.5 }
 * @see {@link https://www.typescriptlang.org/docs/handbook/2/functions.html#function-overloads} for function overloading in TS
 */
export function rgb(rgbObj: Irgba): RGBColors;

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
 * @param r Red channel → [0, 255]
 * @param g Green channel → [0, 255]
 * @param b Blue channel → [0, 255]
 * @param a Alpha channel → [0, 1]
 *
 * @see {@link https://www.typescriptlang.org/docs/handbook/2/functions.html#function-overloads} for function overloading in TS
 */
export function rgb(r: number, g: number, b: number, a?: number): RGBColors;

export function rgb(rOrValues: Irgba | number[] | number, g?: number, b?: number, a?: number): RGBColors {
  if (rOrValues.constructor.name.toLowerCase() === "object") {
    const { r, g, b, a } = rOrValues as Irgba;
    return new RGBColors(r, g, b, a);
  } else if (Array.isArray(rOrValues)) {
    const [r, g, b, a] = rOrValues as number[];
    return new RGBColors(r, g, b, a);
  } else {
    if (g && b) return new RGBColors(rOrValues as number, g, b, a);
    else throw new Error("Red, Green, and Blue channel values must be provided");
  }
}
