import { Icmyka, Irgba } from "../types";

/**
 * Converting Between Uncalibrated CMYK and sRGB-Based Colors
 * @see https://www.rapidtables.com/convert/color/cmyk-to-rgb.html
 */
export function CMYKtoRGB(obj: Icmyka): Irgba {
  const { c, m, y, k, a } = obj;
  const [r, g, b] = [c, m, y].map((val) => 255 * (1 - val / 100) * (1 - k / 100));
  return { r, g, b, a };
}
