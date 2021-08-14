import { Irgba, Ixyza } from "../types/colormaster";
import { sRGBInv } from "../utils/numeric";

export function XYZtoRGB(obj: Ixyza): Irgba {
  const { x, y, z } = obj;

  const M = [
    [3.2409699419045226, -1.537383177570094, -0.4986107602930034],
    [-0.9692436362808796, 1.8759675015077202, 0.04155505740717559],
    [0.05563007969699366, -0.20397695888897652, 1.0569715142428786]
  ];

  const R = sRGBInv(M[0][0] * x + M[0][1] * y + M[0][2] * z);
  const G = sRGBInv(M[1][0] * x + M[1][1] * y + M[1][2] * z);
  const B = sRGBInv(M[2][0] * x + M[2][1] * y + M[2][2] * z);

  return { r: R, g: G, b: B, a: obj.a };
}
