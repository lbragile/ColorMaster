/**
 * Restricts the value of `val` to be between `min` and `max` for number inputs
 * @param min Lower bound (0)
 * @param val Current value
 * @param max Upper bound (typically 100, 255, 359)
 *
 * @returns A number in the range `[min, max]` such that `min <= val <= max`
 */
export function clampNum(min: number, val: number, max: number): number {
  return val < min ? min : val > max ? max : val;
}

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
