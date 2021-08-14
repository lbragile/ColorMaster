import { Ilaba, Irgba } from "../types/colormaster";
import { XYZtoRGB } from "./xyz";

// https://en.wikipedia.org/wiki/CIELAB_color_space
export function LABtoRGB(obj: Ilaba): Irgba {
  const { l, a, b } = obj;

  const delta = 6 / 29;
  const whiteD50Ref = [0.96422, 1.0, 0.82521]; // D50 reference white

  const Ty = (l + 16) / 116;
  const Tx = Ty + a / 500;
  const Tz = Ty - b / 200;

  const [X, Y, Z] = [Tx, Ty, Tz].map(
    (val, i) => (val > delta ? Math.pow(val, 3) : 3 * Math.pow(delta, 2) * (val - 4 / 29)) * whiteD50Ref[i]
  );

  return XYZtoRGB({ x: X, y: Y, z: Z, a: obj.alpha });
}
