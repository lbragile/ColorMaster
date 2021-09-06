import { RGBtoLUV } from "../conversions/rgb";
import { luvaParser } from "../parsers/luv";
import { TPlugin, Iluva, TNumArr, IStringOpts } from "../types";
import { round } from "../utils/numeric";

declare module ".." {
  interface ColorMaster {
    /**
     * Converts a RGBA color instance to LUVA color object
     * @see http://www.easyrgb.com/en/math.php
     * @see http://www.brucelindbloom.com/index.html?Eqn_Luv_to_XYZ.html
     */
    luva(): Iluva;

    /**
     * Gives the string representation of an input LUVA color object
     *
     * @example CM({ r: 200, g: 150, b: 100, a: 0.7 }).stringLUV() → "color(luva 66%, 39%, 31%, 0.7)"
     * @default opts = { alpha: true, precision: [0, 0, 0, 1] }
     * @returns ```color(luv[a] L, A, B[, A])```
     */
    stringLUV(opts?: IStringOpts): string;
  }
}

const LUVPlugin: TPlugin = (CM): void => {
  CM.prototype.luva = function (): Iluva {
    return RGBtoLUV(this.rgba());
  };

  CM.prototype.stringLUV = function ({ alpha = true, precision = [0, 0, 0, 1] as Required<TNumArr> } = {}): string {
    const [l, u, v, a] = Object.values(this.luva() as Iluva).map((val, i) => round(val, precision[i]));
    return alpha ? `color(luva ${l}%, ${u}%, ${v}%, ${a})` : `color(luv ${l}%, ${u}%, ${v}%)`;
  };

  CM.Parsers.push(luvaParser);
};

export default LUVPlugin;
