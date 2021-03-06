import { TNumArr } from "../types";

/**
 * Restricts the value of `val` to be between `min` and `max` for number inputs
 * @param min Lower bound (0)
 * @param val Current value
 * @param max Upper bound (typically 100, 255, 359)
 *
 * @returns A number in the range `[min, max]` such that `min <= val <= max`
 */
export function clamp(min: number, val: number, max: number): number {
  return Math.max(min, Math.min(val, max));
}

/**
 * Given a value, rounds the value to a given precision (number of decimal places)
 * @param value The value that needs to be rounded
 * @param precision How many decimal places to include in the result
 *
 * @note Providing a negative precision value will skip this conversion
 * @returns The input value with "precision" amount of decimal places
 */
export function round(value: number, precision: number): number {
  return +value.toFixed(precision >= 0 ? precision : 0);
}

/**
 * Given a hue (`value`) - ensure that it is in range [0, 359]
 * @param value The value that needs to be rounded
 *
 * @returns A positively bounded hue value
 */
export function adjustHue(value: number): number {
  const modHue = value % 360;
  return modHue < 0 ? modHue + 360 : modHue;
}

/**
 * Helper function to correctly determine or clamp the alpha channel value
 * @param alpha A numeric value corresponding to the alpha channel
 *
 * @note This utility function is provided to provide identical logic for alpha channel value determination.
 *       Unlike other channels, the alpha channel is optional, thus it needs to be handled differently.
 * @returns A valid alpha channel value in range [0, 1]
 */
export function adjustAlpha(alpha: number): number {
  return alpha !== undefined ? clamp(0, alpha, 1) : 1;
}

/**
 * Converts a RGB color space channel value into its corresponding standard RGB (sRGB) color space value
 * @param value The RGB channel value to convert
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/Accessibility/Understanding_Colors_and_Luminance
 * @returns standard RGB equivalent of the RGB channel value provided
 */
export function sRGB(value: number): number {
  value /= 255;
  return value < 0.04045 ? value / 12.92 : Math.pow((value + 0.055) / 1.055, 2.4);
}

/**
 * Inverse of sRGB - converts sRGB to RGB color space value
 * @param value The sRGB channel value to convert
 *
 * @see https://www.w3.org/TR/css-color-4/#color-conversion-code
 * @returns RGB equivalent of the standard RGB channel value provided
 */
export function sRGBInv(value: number): number {
  return (value > 0.0031308 ? 1.055 * Math.pow(value, 1 / 2.4) - 0.055 : 12.92 * value) * 255.0;
}

/**
 * Helper for generating random numbers (integer) from an upper bounded range
 *
 * @param max Output will be bounded to [0, max]
 * @returns A positive integer that is randomly generated and guaranteed to be less than `max`
 */
export function rng(max: number): number {
  return Math.floor(Math.random() * max);
}

/**
 * Transforms an input RGBA string into an RGBA ([r, g, b, a]) numeric array
 * @param str Input RGBA string from which the RGB values are extracted
 * @param alternative If the string is not RGBA, this array is returned instead
 *
 * @returns An RGBA array based on the input string in the form [r, g, b, a]
 */
export function getRGBArr(str: string, alternative = [0, 0, 0, 1]): Required<TNumArr> {
  return (str.match(/\d{1,3}/g)?.map((val) => +val) ?? alternative) as Required<TNumArr>;
}

/**
 * Given two RGB arrays, this computes the sum of their channel wise difference
 * @param rgb1 First RGB array
 * @param rgb2 Second RGB array
 *
 * @returns The sum of absolute differences between the channels of the two input RGB arrays
 */
export function channelWiseDifference(rgb1: TNumArr, rgb2: TNumArr): number {
  return Math.abs(rgb1[0] - rgb2[0]) + Math.abs(rgb1[1] - rgb2[1]) + Math.abs(rgb1[2] - rgb2[2]);
}
