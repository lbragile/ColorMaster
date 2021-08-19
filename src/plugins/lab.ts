import { RGBtoLAB } from "../conversions/rgb";
import { labaParser } from "../parsers/lab";
import { TPlugin, Ilaba, TNumArr, IStringOpts } from "../types";
import { round } from "../utils/numeric";

declare module ".." {
  interface ColorMaster {
    /**
     * Converts a RGBA color instance to LABA color object
     *
     * @link https://www.w3.org/TR/css-color-4/#color-conversion-code
     */
    laba(): Ilaba;

    /**
     * Gives the string representation of an input LABA color object
     * @param opts -
     *  - alpha → whether or not to include the alpha channel in the output
     *  - precision → how many decimal places to include for each value
     * @example CM({ r: 200, g: 150, b: 100, a: 0.7 }).stringLAB() → "laba(66%, 15, 34, 0.7)"
     * @default { alpha: true, precision: [0, 0, 0, 1] }
     * @returns ```lab[a](L, A, B[, A])```
     */
    stringLAB({ alpha, precision }?: IStringOpts): string;
  }
}

const LABPlugin: TPlugin = (CM): void => {
  CM.prototype.laba = function (): Ilaba {
    return RGBtoLAB(this.rgba());
  };

  CM.prototype.stringLAB = function ({ alpha = true, precision = [0, 0, 0, 1] as Required<TNumArr> } = {}): string {
    const [l, a, b, A] = Object.values(this.laba() as Ilaba).map((val, i) => round(val, precision[i]));
    return alpha ? `laba(${l}%, ${a}, ${b}, ${A})` : `lab(${l}%, ${a}, ${b})`;
  };

  CM.Parsers.push(labaParser);
};

export default LABPlugin;
