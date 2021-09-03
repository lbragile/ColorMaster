import { D50Ref, delta } from "../enums/cie";
import { Ilaba, Irgba } from "../types";
import { XYZtoRGB } from "./xyz";

/**
 * @see https://en.wikipedia.org/wiki/CIELAB_color_space
 */
export function LABtoRGB(obj: Ilaba): Irgba {
  const { l, a, b } = obj;

  const Ty = (l + 16) / 116;
  const Tx = Ty + a / 500;
  const Tz = Ty - b / 200;

  const refArr = Object.values(D50Ref);
  const [X, Y, Z] = [Tx, Ty, Tz].map(
    (val, i) => (val > delta ? Math.pow(val, 3) : 3 * Math.pow(delta, 2) * (val - 4 / 29)) * refArr[i] * 100
  );

  return XYZtoRGB({ x: X, y: Y, z: Z, a: obj.alpha });
}
