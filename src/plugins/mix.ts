import { RGBtoLCH } from "../conversions/rgb";
import { LCHtoRGB } from "../conversions/lch";
import { TInput, TPlugin } from "../types";
import { clamp } from "../utils/numeric";

declare module ".." {
  interface ColorMaster {
    /**
     * Mix current color instance with another based on a given ratio (done in LCHA space for best results)
     * @note The ratio represents a percentage of the input `color` that will be mixed
     *       with the remaining portion of the current color instance
     * @example CM("#000").mix('#fff', 0.2) → "mix 20% of white INTO 80% of the current color (black)"
     * @see {@link https://math.stackexchange.com/a/3263100} For argument of why LCH space should be used over LAB space
     * @returns A new color instance corresponding to the new mixture
     */
    mix(color: TInput | ColorMaster, ratio?: number): ColorMaster;
  }
}

const MixPlugin: TPlugin = (CM): void => {
  CM.prototype.mix = function (color, ratio = 0.5) {
    ratio = clamp(0, ratio, 1);

    const lcha1 = Object.values(RGBtoLCH(this.rgba()));
    const lcha2 = Object.values(RGBtoLCH((color instanceof CM ? color : new CM(color as TInput)).rgba()));

    const [l, c, h, a] = lcha1.map((val, i) => val * (1 - ratio) + lcha2[i] * ratio);

    return new CM(LCHtoRGB({ l, c, h, a }));
  };
};

export default MixPlugin;
