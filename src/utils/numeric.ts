/**
 * Restricts the value of `val` to be between `min` and `max` for number inputs
 * @param min Lower bound (0)
 * @param val Current value
 * @param max Upper bound (typically 100, 255, 359)
 *
 * @returns A number in the range `[min, max]` such that `min <= val <= max`
 */
export function clamp(min: number, val: number, max: number): number {
  return val < min ? min : val > max ? max : val;
}

/**
 * Given a value, rounds the value to a given precision (number of decimal places)
 * @param value The value that needs to be rounded
 * @param precision How many decimal places to include in the result
 *
 * @note Providing a negative precision value will skip this conversion
 * @returns The input value with "precision" amount of decimal places
 */
export function round(value: number, precision: number): string {
  return precision >= 0 ? value.toFixed(precision) : value.toString();
}

/**
 * Converts a RGB color space channel value into its corresponding standard RGB (sRGB) color space value
 * @param value The RGB channel value to convert
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/Accessibility/Understanding_Colors_and_Luminance}
 * @returns standard RGB equivalent of the RGB channel value provided
 */
export function sRGB(value: number): number {
  value /= 255;
  return value <= 0.04045 ? value / 12.92 : Math.pow((value + 0.055) / 1.055, 2.4);
}

/**
 * Helper for generating random numbers (integer) from an upper bounded range
 *
 * @param max Output will be bounded to [0, max]
 * @returns A positive integer that is randomly generated and guaranteed to be less than `max`
 */
export function random(max: number): number {
  return Math.floor(Math.random() * max);
}
