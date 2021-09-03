import { Ixyza, Irgba } from "../types";
import { multiplyMatrix } from "../utils/matrix";
import { clamp, sRGBInv } from "../utils/numeric";

/**
 * Bradford chromatic adaptation from D50 to D65
 * @see https://www.w3.org/TR/css-color-4/#color-conversion-code
 *
 * @note For best results, RGBA color space is adapted to be D65 reference white
 */
function D50_to_D65(obj: Ixyza): Ixyza {
  const M = [
    [0.9554734527042182, -0.023098536874261423, 0.0632593086610217],
    [-0.028369706963208136, 1.0099954580058226, 0.021041398966943008],
    [0.012314001688319899, -0.020507696433477912, 1.3303659366080753]
  ];

  const [x, y, z] = multiplyMatrix(M, Object.values(obj));

  return { x, y, z, a: obj.a };
}

export function XYZtoRGB(obj: Ixyza): Irgba {
  // ensure it is adapted to D65
  const [x, y, z] = Object.values(D50_to_D65(obj)).map((val) => val / 100);

  const M = [
    [3.2409699419045226, -1.537383177570094, -0.4986107602930034],
    [-0.9692436362808796, 1.8759675015077202, 0.04155505740717559],
    [0.05563007969699366, -0.20397695888897652, 1.0569715142428786]
  ];

  const [r, g, b] = multiplyMatrix(M, [x, y, z]).map((val) => clamp(0, sRGBInv(val), 255));

  return { r, g, b, a: obj.a };
}
