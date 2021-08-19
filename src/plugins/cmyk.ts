import { RGBtoCMYK } from "../conversions/rgb";
import { cmykaParser } from "../parsers/cmyk";
import { TPlugin, Icmyka } from "../types";
import { round } from "../utils/numeric";

declare module ".." {
  interface ColorMaster {
    /**
     * Converts a RGBA color instance to CMYKA color object
     *
     * @link https://www.w3.org/TR/css-color-4/#color-conversion-code
     */
    cmyka(): Icmyka;

    /**
     * Gives the string representation of an input CMYKA color object
     * @param opts -
     *  - alpha → whether or not to include the alpha channel in the output
     *  - precision → how many decimal places to include for each value
     * @example CM({ r: 200, g: 150, b: 100, a: 0.7 }).stringCMYK() → "cmyka(0, 25, 50, 22)"
     * @default { alpha: true, precision: [0, 0, 0, 1] }
     * @returns ```device-cmyk(C, M, Y, K[, A])```
     */
    stringCMYK({
      alpha,
      precision
    }?: {
      alpha?: boolean;
      precision?: [number, number, number, number, number];
    }): string;
  }
}

const CMYKPlugin: TPlugin = (CM): void => {
  CM.prototype.cmyka = function (): Icmyka {
    return RGBtoCMYK(this.rgba());
  };

  CM.prototype.stringCMYK = function ({ alpha = true, precision = [0, 0, 0, 0, 1] } = {}): string {
    const [c, m, y, k, a] = Object.values(this.cmyka() as Icmyka).map((val, i) => round(val, precision[i]));
    return alpha ? `device-cmyk(${c}, ${m}, ${y}, ${k}, ${a})` : `device-cmyk(${c}, ${m}, ${y}, ${k})`;
  };

  CM.Parsers.push(cmykaParser);
};

export default CMYKPlugin;
