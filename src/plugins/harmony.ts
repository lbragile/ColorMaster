import { IColorHarmony, TPlugin } from "../types";
import { adjustHue, clamp } from "../utils/numeric";

declare module ".." {
  interface ColorMaster {
    /**
     * Generates an RGBA color instance array based on the corresponding harmony
     *
     * @opts Only apply to 'monochromatic' harmony
     * - type → The color harmony to apply
     * - effect → 'tints' (add white/add lightness), 'shades' (add black/remove lightness), 'tones' (add grey/remove saturation)
     * - amount → the number of elements to return
     *
     * @see {@link // https//www.tigercolor.com/color-lab/color-theory/color-harmonies.htm}
     * @note For 'monochromatic', the amount must be in range [2, 10]
     * @returns - All harmony types return an array with the original color as the first element.
     *          - The only exception to this are 'analogous' and 'double-split-complementary',
     *            which return the original color as the second element.
     *          - For 'monochromatic' the original color is always first and the array size is `amount + 1` evenly spaced colors.
     */
    harmony(opts?: IColorHarmony): ColorMaster[];
  }
}

const HarmonyPlugin: TPlugin = (CM): void => {
  CM.prototype.harmony = function ({ type = "analogous", effect = "tones", amount = 5 } = {}) {
    const { h, s, l, a } = this.hsla();

    // at most 10 harmony elements for monochromatic
    if (type === "monochromatic") {
      amount = clamp(2, amount, 10);
    }

    switch (type) {
      case "analogous":
        return [-30, 0, 30].map((angle) => new CM({ h: adjustHue(h + angle), s, l, a }));

      case "complementary":
        return [0, 180].map((angle) => new CM({ h: adjustHue(h + angle), s, l, a }));

      case "split-complementary": // aka compound
        return [0, 150, 210].map((angle) => new CM({ h: adjustHue(h + angle), s, l, a }));

      case "double-split-complementary":
        return [-30, 0, 30, 150, 210].map((angle) => new CM({ h: adjustHue(h + angle), s, l, a }));

      case "triad":
        return [0, 120, 240].map((angle) => new CM({ h: adjustHue(h + angle), s, l, a }));

      case "rectangle":
        return [0, 60, 180, 240].map((angle) => new CM({ h: adjustHue(h + angle), s, l, a }));

      case "square":
        return [0, 90, 180, 270].map((angle) => new CM({ h: adjustHue(h + angle), s, l, a }));

      case "monochromatic": {
        // tones uses saturation, tints/shades use lightness
        const valueToAdjust = effect === "tones" ? s : l;

        // form array of n (amount) evenly spaced items from current saturation/lightness to min/max value
        let delta = (effect === "tints" ? 100 - valueToAdjust : valueToAdjust) / amount;
        delta = effect === "tints" ? delta : -1 * delta;

        const valArr: number[] = [valueToAdjust];
        for (let i = 0; i < amount; i++) {
          valArr.push(valArr[i] + delta);
        }

        return effect === "tones"
          ? valArr.map((sat) => new CM({ h, s: sat, l, a }))
          : valArr.map((light) => new CM({ h, s, l: light, a }));
      }

      // no default
    }
  };
};

export default HarmonyPlugin;
