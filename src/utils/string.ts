import { clampNum } from "./numeric";

/**
 * Restricts the value of `val` to be between `min` and `max` for string inputs
 * @param min Lower bound ("00")
 * @param val Current value
 * @param max Upper bound ("FF")
 *
 * @returns A an uppercase 2 character string in the range `[min, max]` such that `min <= val <= max`
 */
export function clampStr(min: string, val: string, max: string): string {
  const clampVal = clampNum(parseInt(min, 16), parseInt(val, 16), parseInt(max, 16));
  return clampVal.toString(16).padStart(2, "0").toUpperCase();
}

/**
 * Converts an input color space string `val` into an array of color number values, given a RegExp `re`
 * @param val The color string that will be transformed into [r, g, b]
 * @param re Regular expression to use for removing unnecessary information form the color string provided by `val`
 * @returns An array of color values in the form [r, g, b]
 */
export function createColorArrFromStr(val: string, re: RegExp): number[] {
  return val
    .replace(/\s/g, "")
    .replace(re, "")
    .split(",")
    .map((val) => +val);
}
