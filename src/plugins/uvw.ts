import { RGBtoUVW } from "../conversions/rgb";
import { uvwaParser } from "../parsers/uvw";
import { TPlugin, Iuvwa, TNumArr, IStringOpts } from "../types";
import { round } from "../utils/numeric";

declare module ".." {
  interface ColorMaster {
    /**
     * Converts a RGBA color instance to UVWA color object
     *
     * @link https://en.wikipedia.org/wiki/CIEUVW#Cylindrical_representation_.28CIELCH.29
     */
    uvwa(): Iuvwa;

    /**
     * Gives the string representation of an input UVWA color object
     *
     * @example CM({ r: 200, g: 150, b: 100, a: 0.7 }).stringUVW() → "color(uvwa 26, 35, 40, 0.7)"
     * @default opts = { alpha: true, precision: [0, 0, 0, 1] }
     * @returns ```color(uvw[a] U, V, W[, A])```
     */
    stringUVW(opts?: IStringOpts): string;
  }
}

const UVWPlugin: TPlugin = (CM): void => {
  CM.prototype.uvwa = function (): Iuvwa {
    return RGBtoUVW(this.rgba());
  };

  CM.prototype.stringUVW = function ({ alpha = true, precision = [0, 0, 0, 1] as Required<TNumArr> } = {}): string {
    const [u, v, w, a] = Object.values(this.uvwa() as Iuvwa).map((val, i) => round(val, precision[i]));
    return alpha ? `color(uvwa ${u}, ${v}, ${w}, ${a})` : `color(uvw ${u}, ${v}, ${w})`;
  };

  CM.Parsers.push(uvwaParser);
};

export default UVWPlugin;
