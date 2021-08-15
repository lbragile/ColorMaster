import { Ihsva, Irgba } from "../types";

/**
 * @see {@link https://www.rapidtables.com/convert/color/hsv-to-rgb.html}
 */
export function HSVtoRGB(obj: Ihsva): Irgba {
  const { h, s, v, a } = obj;
  const V = v / 100;
  const S = s / 100;

  const C = V * S;
  const X = C * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = V - C;

  const Rp = h < 60 || (300 <= h && h < 360) ? C : 120 <= h && h < 240 ? 0 : X;
  const Gp = 240 <= h && h < 360 ? 0 : 60 <= h && h < 180 ? C : X;
  const Bp = h < 120 ? 0 : 180 <= h && h < 300 ? C : X;

  const [r, g, b] = [Rp, Gp, Bp].map((val) => (val + m) * 255);
  return { r, g, b, a: a ?? 1 };
}
