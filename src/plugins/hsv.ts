import { RGBtoHSV } from "../conversions/rgb";
import { hsvaParser } from "../parsers/hsv";
import { TPlugin, TNumArr, IStringOpts, Ihsva } from "../types";
import { adjustHue, round } from "../utils/numeric";

declare module ".." {
  interface ColorMaster {
    /**
     * Converts a RGBA color instance to HSVA color object
     *
     * @link https://www.rapidtables.com/convert/color/rgb-to-hsv.html
     */
    hsva(): Ihsva;

    /**
     * Gives the string representation of an input HSVA color object
     * @param opts -
     *  - alpha → whether or not to include the alpha channel in the output
     *  - precision → how many decimal places to include for each value
     * @example CM({ r: 200, g: 150, b: 100, a: 0.7 }).stringHSV() → "hsva(30, 50%, 78%, 0.7)"
     * @default { alpha: true, precision: [0, 0, 0, 1] }
     * @returns ```hsv[a](H, S, V[, A])```
     */
    stringHSV({ alpha, precision }?: IStringOpts): string;
  }
}

const HSVPlugin: TPlugin = (CM): void => {
  CM.prototype.hsva = function (): Ihsva {
    return RGBtoHSV(this.rgba());
  };

  CM.prototype.stringHSV = function ({ alpha = true, precision = [0, 0, 0, 1] as Required<TNumArr> } = {}): string {
    const [h, s, v, a] = Object.values(this.hsva() as Ihsva).map((val, i) => round(val, precision[i]));
    return alpha ? `hsva(${adjustHue(h)}, ${s}%, ${v}%, ${a})` : `hsv(${adjustHue(h)}, ${s}%, ${v}%)`;
  };

  CM.Parsers.push(hsvaParser);
};

export default HSVPlugin;
