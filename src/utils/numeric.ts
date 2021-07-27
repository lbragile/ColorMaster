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
