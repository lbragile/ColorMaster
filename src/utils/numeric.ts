/**
 * Restricts the value of `val` to be between `min` and `max`
 * @param min Lower bound
 * @param val Current value
 * @param max Upper bound
 *
 * @note This clamp needs to work for both number and string inputs and thus avoids the use of Math module to accommodate
 * @returns A number in the range `[min, max]` such that `min <= val <= max`
 */
export function clamp<T>(min: T, val: T, max: T): T {
  const isAllNum = typeof min === "number" && typeof val === "number" && typeof max === "number";
  const isAllStr = typeof min === "string" && typeof val === "string" && typeof max === "string";

  if (isAllNum || isAllStr) return val < min ? min : val > max ? max : val;
  else throw new Error("All values must be the same type → 'number' or 'string'");
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
