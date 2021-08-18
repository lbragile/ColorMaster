import { RGBtoLUV } from "../conversions/rgb";
import { luvaParser } from "../parsers/luv";
import { TPlugin, Iluva, TNumArr, IStringOpts } from "../types";
import { round } from "../utils/numeric";

declare module ".." {
  interface ColorMaster {
    /**
     * Converts a RGBA color instance to LUVA color object
     *
     * @link https://en.wikipedia.org/wiki/CIELUV#Cylindrical_representation_.28CIELCH.29
     */
    luva(): Iluva;

    /**
     * Gives the string representation of an input LUVA color object
     * @param opts -
     *  - alpha → whether or not to include the alpha channel in the output
     *  - precision → how many decimal places to include for each value
     * @example CM({ r: 200, g: 150, b: 100, a: 0.7 }).stringHWB() → "luva(66%, 38, 39, 0.7)"
     * @default { alpha: true, precision: [0, 0, 0, 1] }
     * @returns ```luv[a](L, A, B[, A])```
     */
    stringLUV({ alpha, precision }?: IStringOpts): string;
  }
}

const LUVPlugin: TPlugin = (CM): void => {
  CM.prototype.luva = function (): Iluva {
    return RGBtoLUV(this.rgba());
  };

  CM.prototype.stringLUV = function ({ alpha = true, precision = [0, 0, 0, 1] as TNumArr } = {}): string {
    const [l, u, v, a] = Object.values(this.luva() as Iluva).map((val, i) => round(val, precision[i] ?? 1));
    return alpha ? `luva(${l}%, ${u}, ${v}, ${a})` : `luv(${l}%, ${u}, ${v})`;
  };

  CM.Parsers.push(luvaParser);
};

export default LUVPlugin;
