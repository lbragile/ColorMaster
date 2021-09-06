import { RGBtoHWB } from "../conversions/rgb";
import { hwbaParser } from "../parsers/hwb";
import { TPlugin, Ihwba, TNumArr, IStringOpts } from "../types";
import { adjustHue, round } from "../utils/numeric";

declare module ".." {
  interface ColorMaster {
    /**
     * Converts a RGBA color instance to HWBA color object
     * @link https://en.wikipedia.org/wiki/HWB_color_model#:~:text=HWB%20is%20a%20cylindrical%2Dcoordinate,and%20slightly%20faster%20to%20compute
     */
    hwba(): Ihwba;

    /**
     * Gives the string representation of an input HWBA color object
     *
     * @example CM({ r: 200, g: 150, b: 100, a: 0.7 }).stringHWB() → "hwba(30, 39%, 22%, 0.7)"
     * @default opts = { alpha: true, precision: [0, 0, 0, 1] }
     * @returns ```hwb[a](H, W, B[, A])```
     */
    stringHWB(opts?: IStringOpts): string;
  }
}

const HWBPlugin: TPlugin = (CM): void => {
  CM.prototype.hwba = function (): Ihwba {
    return RGBtoHWB(this.rgba());
  };

  CM.prototype.stringHWB = function ({ alpha = true, precision = [0, 0, 0, 1] as Required<TNumArr> } = {}): string {
    const [h, w, b, a] = Object.values(this.hwba() as Ihwba).map((val, i) => round(val, precision[i]));
    return alpha ? `hwba(${adjustHue(h)}, ${w}%, ${b}%, ${a})` : `hwb(${adjustHue(h)}, ${w}%, ${b}%)`;
  };

  CM.Parsers.push(hwbaParser);
};

export default HWBPlugin;
