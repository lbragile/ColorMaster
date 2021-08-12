import { ColorMaster } from "..";
import { WebSafe as WebSafeArr } from "../enums/colors";
import { HSLtoRGB } from "../parsers/hsl";
import { IA11yOpts, IReadable, Irgba, TInput, TPlugin } from "../types/colormaster";
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

    /**
     * Given a background color as input, determines the contrast ratio if the current color is used as the foreground color
     *
     * @param opts -
     * - precision → How many decimal places to use in the output
     * - ratio → Whether or not to append `:1` to the output (express as a ratio)
     *
     * @note This ratio will range from `1:1 → white fg : white bg` to `21:1 → black fg : white bg`
     * @see {@link RGBColors.readableOn readableOn} for readable contrast ratios
     * @returns The contrast between current color instance and `bgColor` as a number (value → `ratio = false`) or string ("value:1" → `ratio = true`)
     */
    contrast(opts?: IA11yOpts): string | number;

    /**
     * Given a background color as input, determines if the current color is readable if it is used as the foreground color
     *
     * |           | Minimum | Enhanced |
     * | :-------- | :------ | :------- |
     * | **Body**  |  4.5:1  |  7.0:1   |
     * | **Large** |  3.0:1  |  4.5:1   |
     *
     * @param opts -
     * - size → Either "body" or "large" text size (large is 120-150% larger than body text)
     * - ratio → Either "minimum" ("AA" rating) or "enhanced" ("AAA" rating)
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/Accessibility/Understanding_WCAG/Perceivable/Color_contrast}
     * @returns Whether or not the color is readable on `bgColor`
     */
    readableOn(opts?: IReadable): boolean;

    /**
     * Given an input color to compare with, determine if that color is identical to the current color instance
     * @returns True if the two color instances are identical (same RGBA channel values). False otherwise.
     */
    equalTo(compareColor?: TInput): boolean;

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
     * Finds the closest cool color instance to the current color (in HSLA space)
     */
    closestCool(): ColorMaster;

    /**
     * Finds the closest warm color instance to the current color (in HSLA space)
     */
    closestWarm(): ColorMaster;

    /**
     * Finds the closest pure hue color instance corresponding to the current color (in HSLA space)
     *
     * @note Alpha channel value is preserved
     */
    closestPureHue(): ColorMaster;

    /**
     * Finds the closest Web Safe color to the current color from the list at: https://www.rapidtables.com/web/color/Web_Safe.html
     * @returns The instance that was acted upon → for function chaining
     */
    closestWebSafe(): ColorMaster;
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

  CM.prototype.contrast = function ({ bgColor = "#fff", precision = 4, ratio = false }: IA11yOpts = {}):
    | string
    | number {
    const bgColorObj = new ColorMaster(bgColor);
    const Lf = this.luminance();
    const Lb = bgColorObj.luminance();
    const contrast = ((Math.max(Lf, Lb) + 0.05) / (Math.min(Lf, Lb) + 0.05)).toFixed(precision);
    return ratio ? contrast + ":1" : +contrast;
  };

  CM.prototype.readableOn = function ({ bgColor = "#fff", size = "body", ratio = "minimum" }: IReadable = {}): boolean {
    const contrast = this.contrast({ bgColor });
    if (size === "body" && ratio === "enhanced") return contrast >= 7.0;
    else if (size === "large" && ratio === "minimum") return contrast >= 3.0;
    else return contrast >= 4.5;
  };

  CM.prototype.equalTo = function (compareColor = "#fff"): boolean {
    return JSON.stringify(this.array) === JSON.stringify(new ColorMaster(compareColor).array);
  };

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

  CM.prototype.closestPureHue = function () {
    const { h, a } = this.hsla();
    const { r, g, b, a: Ap } = HSLtoRGB({ h, s: 100, l: 50, a });
    return new CM({ r, g, b, a: Ap });
  };

  CM.prototype.closestWebSafe = function () {
    const { r, g, b, a } = this.rgba();

    let [Rc, Gc, Bc] = new Array(3).fill(0);
    let minDist = Number.POSITIVE_INFINITY;

    let closestMatch: Irgba = { r, g, b, a };
    for (let i = 0; i < WebSafeArr.length; i++) {
      const matches = WebSafeArr[i].match(/\d{1,3}/g);
      if (matches) {
        [Rc, Gc, Bc] = matches.map((val) => +val);
      }

      // channel wise distance
      const currDist = Math.abs(Rc - r) + Math.abs(Gc - g) + Math.abs(Bc - b);
      if (currDist < minDist) {
        minDist = currDist;
        closestMatch = { r: Rc, g: Gc, b: Bc, a };
      }
    }

    return new ColorMaster(closestMatch);
  };
};

export default A11yPlugin;
