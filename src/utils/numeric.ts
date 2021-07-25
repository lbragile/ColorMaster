/**
 * Restricts the value of `val` to be between `min` and `max`
 * @param min Lower bound
 * @param val Current value
 * @param max Upper bound
 * @returns A number in the range `[min, max]` such that `min <= val <= max`
 */
export function clamp(min: number, val: number, max: number): number {
  return Math.min(Math.max(min, val), max);
}
