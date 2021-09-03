import { RGBtoRYB } from "../conversions/rgb";
import { rybaParser } from "../parsers/ryb";
import { TPlugin, Iryba, TNumArr, IStringOpts } from "../types";
import { round } from "../utils/numeric";

declare module ".." {
  interface ColorMaster {
    /**
     * Converts a RGBA color instance to RYBA color object
     *
     * @see http://nishitalab.org/user/UEI/publication/Sugita_IWAIT2015.pdf
     * @see https://web.archive.org/web/20130525061042/www.insanit.net/tag/rgb-to-ryb/
     */
    ryba(): Iryba;

    /**
     * Gives the string representation of an input RYBA color object
     * @param opts -
     *  - alpha → whether or not to include the alpha channel in the output
     *  - precision → how many decimal places to include for each value
     * @example CM({ r: 200, g: 150, b: 100, a: 0.7 }).stringRYB() → "color(ryba 200, 200, 100, 0.7)"
     * @default { alpha: true, precision: [0, 0, 0, 1] }
     * @returns ```color(ryb[a] R, Y, B[, A])```
     */
    stringRYB({ alpha, precision }?: IStringOpts): string;
  }
}

const RYBPlugin: TPlugin = (CM): void => {
  CM.prototype.ryba = function (): Iryba {
    return RGBtoRYB(this.rgba());
  };

  CM.prototype.stringRYB = function ({ alpha = true, precision = [0, 0, 0, 1] as TNumArr } = {}): string {
    const [r, y, b, a] = Object.values(this.ryba() as Iryba).map((val, i) => round(val, precision[i]));
    return alpha ? `color(ryba ${r}, ${y}, ${b}, ${a})` : `color(ryb ${r}, ${y}, ${b})`;
  };

  CM.Parsers.push(rybaParser);
};

export default RYBPlugin;
