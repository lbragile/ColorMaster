import { RGBtoXYZ } from "../conversions/rgb";
import { xyzaParser } from "../parsers/xyz";
import { TPlugin, Ixyza, TNumArr, IStringOpts } from "../types";
import { round } from "../utils/numeric";

declare module ".." {
  interface ColorMaster {
    /**
     * Converts a RGBA color instance to XYZA color object
     *
     * @link https://www.w3.org/TR/css-color-4/#color-conversion-code
     */
    xyza(): Ixyza;

    /**
     * Gives the string representation of an input XYZA color object
     * @param opts -
     *  - alpha → whether or not to include the alpha channel in the output
     *  - precision → how many decimal places to include for each value
     * @example CM({ r: 200, g: 150, b: 100, a: 0.7 }).stringXYZ() → "color(xyza 37, 35, 17, 0.7)"
     * @default { alpha: true, precision: [0, 0, 0, 1] }
     * @see https://www.w3.org/TR/css-color-4/#predefined
     * @returns ```color(xyz[a] X, Y, Z[, A])```
     */
    stringXYZ({ alpha, precision }?: IStringOpts): string;
  }
}

const XYZPlugin: TPlugin = (CM): void => {
  CM.prototype.xyza = function (): Ixyza {
    return RGBtoXYZ(this.rgba());
  };

  CM.prototype.stringXYZ = function ({ alpha = true, precision = [0, 0, 0, 1] as Required<TNumArr> } = {}): string {
    const [x, y, z, a] = Object.values(this.xyza() as Ixyza).map((val, i) => round(val, precision[i]));
    return alpha ? `color(xyza ${x}, ${y}, ${z}, ${a})` : `color(xyz ${x}, ${y}, ${z})`;
  };

  CM.Parsers.push(xyzaParser);
};

export default XYZPlugin;
