import { RGBtoUVW } from "../conversions/rgb";
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
     * @param opts -
     *  - alpha → whether or not to include the alpha channel in the output
     *  - precision → how many decimal places to include for each value
     * @example CM({ r: 200, g: 150, b: 100, a: 0.7 }).stringUVW() → "color(uvwa 25, 35, 26, 0.7)"
     * @default { alpha: true, precision: [0, 0, 0, 1] }
     * @returns ```color(uvw[a] U, V, W[, A])```
     */
    stringUVW({ alpha, precision }?: IStringOpts): string;
  }
}

const UVWPlugin: TPlugin = (CM): void => {
  CM.prototype.uvwa = function (): Iuvwa {
    return RGBtoUVW(this.rgba());
  };

  CM.prototype.stringUVW = function ({ alpha = true, precision = [0, 0, 0, 1] as TNumArr } = {}): string {
    const [u, v, w, a] = Object.values(this.uvwa() as Iuvwa).map((val, i) => round(val, precision[i] ?? 1));
    return alpha ? `color(uvwa ${u}, ${v}, ${w}, ${a})` : `color(uvw ${u}, ${v}, ${w})`;
  };
};

export default UVWPlugin;
