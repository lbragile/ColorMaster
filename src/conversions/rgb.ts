import { Irgba, Ixyza, Ihexa, THexStr, Ihsla, Ihsva, Ilaba, Ilcha } from "../types";
import { multiplyMatrix } from "../utils/matrix";
import { sRGB, adjustHue } from "../utils/numeric";

/**
 * Calculation for HSLA and HSVA from RGBA space is almost identical, thus this groups the common logic
 * @returns The necessary details to compute the required color space properties
 */
function commonHS(obj: Irgba) {
  const [Rp, Gp, Bp] = Object.values(obj).map((val) => val / 255);

  const Cmax = Math.max(Rp, Gp, Bp);
  const Cmin = Math.min(Rp, Gp, Bp);
  const delta = Cmax - Cmin;

  const H =
    delta === 0
      ? 0
      : Cmax === Rp
      ? ((Gp - Bp) / delta) % 6
      : Cmax === Gp
      ? (Bp - Rp) / delta + 2
      : (Rp - Gp) / delta + 4;

  return { Cmin, Cmax, H, delta };
}

/**
 * Bradford chromatic adaptation from D50 to D65
 * @see {@link https://www.w3.org/TR/css-color-4/#color-conversion-code}
 *
 * @note For best results, XYZ color space is assumed to be adapted to a D50 reference white
 */
function D65_to_D50(obj: Ixyza): Ixyza {
  const M = [
    [1.0479298208405488, 0.022946793341019088, -0.05019222954313557],
    [0.029627815688159344, 0.990434484573249, -0.01707382502938514],
    [-0.009243058152591178, 0.015055144896577895, 0.7518742899580008]
  ];

  const [x, y, z] = multiplyMatrix(M, Object.values(obj));

  return { x, y, z, a: obj.a };
}

export function RGBtoHEX(obj: Irgba, round = false): Ihexa {
  let { r, g, b, a } = obj;
  if (a) a *= 255;

  if (round) {
    [r, g, b, a] = [r, g, b, a].map((val) => val && Math.round(val));
  }
  const [Rp, Gp, Bp, Ap] = [r, g, b, a ?? 255].map((x) => x.toString(16).padStart(2, "0").toUpperCase() as THexStr);
  return { r: Rp, g: Gp, b: Bp, a: Ap };
}

/**
 * @see {@link https://www.rapidtables.com/convert/color/rgb-to-hsl.html}
 */
export function RGBtoHSL(obj: Irgba): Ihsla {
  const { Cmin, Cmax, H, delta } = commonHS(obj);
  const L = (Cmax + Cmin) / 2;
  const S = delta === 0 ? 0 : delta / (1 - Math.abs(2 * L - 1));

  return { h: adjustHue(H * 60), s: S * 100, l: L * 100, a: obj.a ?? 1 };
}

/**
 * @see {@link https://www.rapidtables.com/convert/color/rgb-to-hsv.html}
 */
export function RGBtoHSV(obj: Irgba): Ihsva {
  const { Cmax, H, delta } = commonHS(obj);
  const S = delta === 0 ? 0 : delta / Cmax;

  return { h: adjustHue(H * 60), s: S * 100, v: Cmax * 100, a: obj.a ?? 1 };
}

/**
 * @see {@link https://www.image-engineering.de/library/technotes/958-how-to-convert-between-srgb-and-ciexyz}
 * @see {@link https://www.w3.org/TR/css-color-4/#color-conversion-code}
 */
export function RGBtoXYZ(obj: Irgba): Ixyza {
  const M = [
    [0.41239079926595934, 0.357584339383878, 0.1804807884018343],
    [0.21263900587151027, 0.715168678767756, 0.07219231536073371],
    [0.01933081871559182, 0.11919477979462598, 0.9505321522496607]
  ];

  const [x, y, z] = multiplyMatrix(
    M,
    Object.values(obj).map((val) => sRGB(val))
  );

  // ensure it is adapted to D50
  return D65_to_D50({ x, y, z, a: obj.a });
}

/**
 * @see {@link https://www.w3.org/TR/css-color-4/#color-conversion-code}
 */
export function RGBtoLAB(obj: Irgba): Ilaba {
  const epsilon = 6 ** 3 / 29 ** 3;
  const kappa = 29 ** 3 / 3 ** 3;
  const whiteD50Ref = [0.96422, 1.0, 0.82521];

  const XYZ = Object.values(RGBtoXYZ(obj)).map((val, i) => val / whiteD50Ref[i]);
  const F = XYZ.map((val) => (val > epsilon ? Math.cbrt(val) : (kappa * val + 16) / 116));

  const L = 116 * F[1] - 16;
  const a = 500 * (F[0] - F[1]);
  const b = 200 * (F[1] - F[2]);

  return { l: L, a, b, alpha: obj.a };
}

/**
 * @see {@link https://www.w3.org/TR/css-color-4/#color-conversion-code}
 */
export function RGBtoLCH(obj: Irgba): Ilcha {
  const { l, a, b } = RGBtoLAB(obj);

  const hue = (Math.atan2(b, a) * 180) / Math.PI;
  const c = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));

  return { l, c, h: adjustHue(hue), a: obj.a };
}
