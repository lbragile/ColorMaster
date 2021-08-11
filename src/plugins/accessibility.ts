import { HSLtoRGB } from "../parsers/hsl";
import { TPlugin } from "../types/colormaster";
import { IA11yOpts } from "../types/common";
import { sRGB } from "../utils/numeric";

declare module "../colormaster" {
  interface ColorMaster {
    /**
     * Finds the normalized brightness of the color
     *
     * @param opts -
     * - precision → How many decimal places to use in the output
     * - percentage → Whether or not to multiply the output by 100
     *
     * @see {@link https://www.w3.org/TR/AERT/#color-contrast}
     * @returns A value in the range [0, 1] = [dim (black), bright (white)] (or [0, 100] if `percentage = true`)
     */
    brightness(opts?: IA11yOpts): number;

    /**
     * Finds normalized relative luminance of the color
     *
     * @param opts -
     * - precision → How many decimal places to use in the output
     * - percentage → Whether or not to multiply the output by 100
     *
     * @see {@link https://www.w3.org/TR/WCAG20/#relativeluminancedef}
     * @returns A value in the range [0, 1] = [darkest black, lightest white] (or [0, 100] if `percentage = true`)
     */
    luminance(opts?: IA11yOpts): number;

    // TODO
    // /**
    //  * Given a background color as input, determines the contrast ratio if the current color is used as the foreground color
    //  *
    //  * @param bgColor the background RGBA color instance
    //  * @param opts -
    //  * - precision → How many decimal places to use in the output
    //  * - ratio → Whether or not to append `:1` to the output (express as a ratio)
    //  *
    //  * @note This ratio will range from `1:1 → white fg : white bg` to `21:1 → black fg : white bg`
    //  * @see {@link RGBColors.readableOn readableOn} for readable contrast ratios
    //  * @returns The contrast between current color instance and `bgColor` as a number (value → `ratio = false`) or string ("value:1" → `ratio = true`)
    //  */
    // contrast(bgColor: TRGBAInput | RGBColors, opts: IA11yOpts): string | number;

    /**
     * Determines if a given color is light based on its brightness (brightness ≥ 0.50)
     */
    isLight(): boolean;

    /**
     * Determines if a given color is dark based on its brightness (brightness < 0.50)
     */
    isDark(): boolean;

    /**
     * "Cool colors give an impression of calm, and create a soothing impression"
     *
     * These typically contain more blue and green pigmentation (higher hue)
     *
     * @see {@link https://www.tigercolor.com/color-lab/color-theory/color-theory-intro.htm} or {@link https://www.canva.com/colors/color-wheel/}
     */
    isCool(): boolean;

    /**
     * "Warm colors are vivid and energetic, and tend to advance in space"
     *
     * These typically contain more red and yellow pigmentation (lower hue)
     *
     * @see {@link https://www.tigercolor.com/color-lab/color-theory/color-theory-intro.htm} or {@link https://www.canva.com/colors/color-wheel/}
     */
    isWarm(): boolean;

    /**
     * Finds the closest cool color instance to the current color (in HSLA space)
     */
    closestCool(): ColorMaster;

    /**
     * Finds the closest warm color instance to the current color (in HSLA space)
     */
    closestWarm(): ColorMaster;

    /**
     * Helper for determining if a given color instance is tinted (lightness deviated upwards from a pure hue whose lightness is 50%)
     */
    isTinted(): boolean;

    /**
     * Helper for determining if a given color instance is shaded (lightness deviated downwards from a pure hue whose lightness is 50%)
     */
    isShaded(): boolean;

    /**
     * Helper for determining if a given color instance is toned (saturation deviated from a pure hue whose saturation is 100%)
     */
    isToned(): boolean;

    /**
     * Helper for determining if a given color instance is pure (not tinted, shaded, or toned)
     * @param opts - reason → Whether or not to include a reason for the output
     *
     * @note `reason` only provides extra information when the color instance is not pure hue
     */
    isPureHue(opts?: { reason?: boolean }): boolean | { pure: boolean; reason: string };

    /**
     * Finds the closest pure hue color instance corresponding to the current color (in HSLA space)
     *
     * @note Alpha channel value is preserved
     */
    closestPureHue(): ColorMaster;
  }
}

const A11yPlugin: TPlugin = (CM): void => {
  CM.prototype.brightness = function ({ precision = 4, percentage = false }: IA11yOpts = {}): number {
    const { r, g, b } = this.rgba();
    const brightness = +((r * 0.299 + g * 0.587 + b * 0.114) / 255).toFixed(precision);
    return percentage ? brightness * 100 : brightness;
  };

  CM.prototype.luminance = function ({ precision = 4, percentage = false }: IA11yOpts = {}): number {
    const { r, g, b } = this.rgba();
    const L = +(0.2126 * sRGB(r) + 0.7152 * sRGB(g) + 0.0722 * sRGB(b)).toFixed(precision);
    return percentage ? L * 100 : L;
  };

  // contrast(bgColor: TInput = this.#color, { precision = 4, ratio = false }: IA11yOpts = {}): string | number {
  //   bgColor = bgColor instanceof HSLColors ? bgColor : CM.HSLAFrom(bgColor);
  //   return this.rgb().contrast(bgColor.rgb(), { precision, ratio });
  // }

  // readableOn(
  //   bgColor: THSLAInput | HSLColors = [0, 0, 100, 1.0],
  //   { size = "body", ratio = "minimum" }: IReadable = {}
  // ): boolean {
  //   bgColor = bgColor instanceof HSLColors ? bgColor : CM.HSLAFrom(bgColor);
  //   return this.rgb().readableOn(bgColor.rgb(), { size, ratio });
  // }

  // equalTo(compareColor: THSLAInput | HSLColors = [0, 0, 100, 1.0]): boolean {
  //   // ! do not convert to RGB space since HSLA is a many-to-one mapping in RGBA space (example, 100% lightness)
  //   compareColor = compareColor instanceof HSLColors ? compareColor : CM.HSLAFrom(compareColor);
  //   return JSON.stringify(this.array) === JSON.stringify(compareColor.array);
  // }

  CM.prototype.isLight = function (): boolean {
    return this.brightness() >= 0.5;
  };

  CM.prototype.isDark = function (): boolean {
    return !this.isLight();
  };

  CM.prototype.isCool = function (): boolean {
    const { h } = this.hsla();
    return 75 <= h && h < 255;
  };

  CM.prototype.isWarm = function (): boolean {
    return !this.isCool();
  };

  CM.prototype.closestCool = function () {
    const { h } = this.hsla();
    if (this.isCool()) return this;
    return this.hueTo(h < 75 ? 75 : 254);
  };

  CM.prototype.closestWarm = function () {
    const { h } = this.hsla();
    if (this.isWarm()) return this;
    return this.hueTo(h < (255 + 75) / 2 ? 74 : 255);
  };

  CM.prototype.isTinted = function (): boolean {
    return this.hsla().l > 50.0;
  };

  CM.prototype.isShaded = function (): boolean {
    return this.hsla().l < 50.0;
  };

  CM.prototype.isToned = function (): boolean {
    return this.hsla().s < 100.0;
  };

  CM.prototype.isPureHue = function ({ reason = true }: { reason?: boolean } = {}):
    | boolean
    | { pure: boolean; reason: string } {
    if (this.isTinted()) {
      return reason ? { pure: false, reason: "tinted" } : false;
    } else if (this.isShaded()) {
      return reason ? { pure: false, reason: "shaded" } : false;
    } else if (this.isToned()) {
      return reason ? { pure: false, reason: "toned" } : false;
    } else {
      return reason ? { pure: true, reason: "N/A" } : true;
    }
  };

  CM.prototype.closestPureHue = function () {
    const { h, a } = this.hsla();
    const { r, g, b, a: Ap } = HSLtoRGB({ h, s: 100, l: 50, a });
    return new CM({ r, g, b, a: Ap });
  };
};

export default A11yPlugin;
