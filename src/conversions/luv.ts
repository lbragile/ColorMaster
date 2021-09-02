import { D50Ref, epsilon, kappa } from "../enums/cie";
import { Iluva, Irgba } from "../types";
import { XYZtoRGB } from "./xyz";

/**
 * @see http://www.easyrgb.com/en/math.php
 * @see http://www.brucelindbloom.com/index.html?Eqn_Luv_to_XYZ.html
 */
export function LUVtoRGB(obj: Iluva): Irgba {
  const { l, u, v } = obj;

  const Y = l > kappa * epsilon ? Math.pow((l + 16) / 116, 3) : l / kappa;
  const denominator = D50Ref.x + 15 * D50Ref.y + 3 * D50Ref.z;
  const u0 = (4 * D50Ref.x) / denominator;
  const v0 = (9 * D50Ref.y) / denominator;

  const a = ((52 * l) / (u && l ? u + 13 * l * u0 : 1) - 1) / 3;
  const b = -5 * Y;
  const c = -1 / 3;
  const d = Y * ((39 * l) / (v && l ? v + 13 * l * v0 : 1) - 5);
  const X = a === -1 / 3 ? d - b : (d - b) / (a - c);
  const Z = a * X + b;

  return XYZtoRGB({ x: X * 100, y: Y * 100, z: Z * 100, a: obj.a });
}
