import { RGBtoLCH } from "../conversions/rgb";
import { lchaParser } from "../parsers/lch";
import { TPlugin, Ilcha, TNumArr, IStringOpts } from "../types";
import { round } from "../utils/numeric";

declare module ".." {
  interface ColorMaster {
    /**
     * Converts a RGBA color instance to LCHA color object
     * @link https://www.w3.org/TR/css-color-4/#color-conversion-code
     */
    lcha(): Ilcha;

    /**
     * Gives the string representation of an input LCHA color object
     *
     * @example CM({ r: 200, g: 150, b: 100, a: 0.7 }).stringLCH() → "lcha(66%, 36, 69, 0.7)"
     * @default { alpha: true, precision: [0, 0, 0, 1] }
     * @returns ```lch[a](L, C, H[, A])```
     */
    stringLCH(opts?: IStringOpts): string;
  }
}

const LCHPlugin: TPlugin = (CM): void => {
  CM.prototype.lcha = function (): Ilcha {
    return RGBtoLCH(this.rgba());
  };

  CM.prototype.stringLCH = function ({ alpha = true, precision = [0, 0, 0, 1] as Required<TNumArr> } = {}): string {
    const [l, c, h, a] = Object.values(this.lcha() as Ilcha).map((val, i) => round(val, precision[i]));
    return alpha ? `lcha(${l}%, ${c}, ${h}, ${a})` : `lch(${l}%, ${c}, ${h})`;
  };

  CM.Parsers.push(lchaParser);
};

export default LCHPlugin;
