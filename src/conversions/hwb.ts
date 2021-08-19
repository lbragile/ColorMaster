import { Ihwba, Irgba } from "../types";
import { HSVtoRGB } from "./hsv";

/**
 * @see {@link https://en.wikipedia.org/wiki/HWB_color_model#:~:text=HWB%20is%20a%20cylindrical%2Dcoordinate,and%20slightly%20faster%20to%20compute}
 */
export function HWBtoRGB(obj: Ihwba): Irgba {
  const { h, b, w, a } = obj;
  const s = b === 100 ? 0 : 100 - (w / (100 - b)) * 100;
  const v = 100 - b;
  return HSVtoRGB({ h, s, v, a });
}
