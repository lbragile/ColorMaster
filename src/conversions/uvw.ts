import { Iuvwa, Irgba } from "../types";
import { multiplyMatrix } from "../utils/matrix";
import { XYZtoRGB } from "./xyz";

/**
 * @see {@link http://cs.haifa.ac.il/hagit/courses/ist/Lectures/IST05_ColorLABx4.pdf}
 */
export function UVWtoRGB(obj: Iuvwa): Irgba {
  const { u, v, w } = obj;

  const M = [
    [1.5, 0, 0],
    [0, 1, 0],
    [1.5, -3, 2]
  ];

  const [x, y, z] = multiplyMatrix(M, [u, v, w]);
  return XYZtoRGB({ x, y, z, a: obj.a });
}
