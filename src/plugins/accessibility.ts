import { HSLtoRGB } from "../conversions/hsl";
import { WebSafe as WebSafeArr } from "../enums/colors";
import { IA11yOpts, IReadable, TInput, TPlugin, Irgba, IPureHue } from "../types";
import { channelWiseDifference, getRGBArr, sRGB } from "../utils/numeric";

declare module ".." {
  interface ColorMaster {
    /**
     * Finds the normalized brightness of the color
     *
     * @see https://www.w3.org/TR/AERT/#color-contrast
     * @default opts = { precision: 4, percentage: false }
     * @returns A value in the range [0, 1] = [dim (black), bright (white)] (or [0, 100] if `percentage = true`)
     */
    brightness(opts?: Omit<IA11yOpts, "ratio" | "bgColor">): number;

    /**
     * Finds normalized relative luminance of the color
     *
     * @see https://www.w3.org/TR/WCAG20/#relativeluminancedef
     * @default opts = { precision: 4, percentage: false }
     * @returns A value in the range [0, 1] = [darkest black, lightest white] (or [0, 100] if `percentage = true`)
     */
    luminance(opts?: Omit<IA11yOpts, "ratio" | "bgColor">): number;

    /**
     * Given a background color as input, determines the contrast ratio if the current color is used as the foreground color
     *
     * @note This ratio will range from `1:1 → white fg : white bg` to `21:1 → black fg : white bg`
     * @see {@link ColorMaster.readableOn readableOn} for readable contrast ratios
     * @default opts = { bgColor: "#fff", precision: 4, ratio: false }
     * @returns The contrast between current color instance and `bgColor` as a number (value → `ratio = false`) or string ("value:1" → `ratio = true`)
     */
    contrast(opts?: Omit<IA11yOpts, "percentage">): string | number;

    /**
     * Given a background color as input, determines if the current color is readable if it is used as the foreground color
     *
     * |           | Minimum  | Enhanced  |
     * | :-------- | :------: | :-------: |
     * | **Body**  |  4.5:1   |  7.0:1    |
     * | **Large** |  3.0:1   |  4.5:1    |
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/Accessibility/Understanding_WCAG/Perceivable/Color_contrast
     * @default opts = { bgColor: "#fff", size: "body", ratio: "minimum" }
     * @returns Whether or not the color is readable on `bgColor`
     */
    readableOn(opts?: IReadable): boolean;

    /**
     * Given an input color to compare with, determine if that color is identical to the current color instance
     * @param cmpColor The color to compare against for equality
     *
     * @default cmpColor = "#fff"
     * @note Alpha values are included in the equality checks
     * @returns True if the two color instances are identical (same RGBA channel values). False otherwise.
     */
    equalTo(cmpColor?: TInput | ColorMaster): boolean;

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
     * @see https://www.tigercolor.com/color-lab/color-theory/color-theory-intro.htm
     * @see https://www.canva.com/colors/color-wheel/
     */
    isCool(): boolean;

    /**
     * "Warm colors are vivid and energetic, and tend to advance in space"
     *
     * These typically contain more red and yellow pigmentation (lower hue)
     *
     * @see https://www.tigercolor.com/color-lab/color-theory/color-theory-intro.htm
     * @see https://www.canva.com/colors/color-wheel/
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
     *
     * @note `reason` only provides extra information when the color instance is not pure hue
     * @default opts = { reason: true }
     * @returns boolean (if reason is truthy) OR an object containing the reason for purity determination (if reason is falsy)
     */
    isPureHue(opts?: IPureHue): boolean | { pure: boolean; reason: "tinted" | "shaded" | "toned" | "N/A" };

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
     * Finds the closest Web Safe color to the current color
     *
     * @see https://www.rapidtables.com/web/color/Web_Safe.html
     * @returns The instance that was acted upon → for function chaining
     */
    closestWebSafe(): ColorMaster;
  }
}

const A11yPlugin: TPlugin = (CM): void => {
  CM.prototype.brightness = function ({ precision = 4, percentage = false } = {}) {
    const { r, g, b } = this.rgba();
    const brightness = +((r * 0.299 + g * 0.587 + b * 0.114) / 255).toFixed(precision);
    return percentage ? brightness * 100 : brightness;
  };

  CM.prototype.luminance = function ({ precision = 4, percentage = false } = {}) {
    const { r, g, b } = this.rgba();
    const L = +(0.2126 * sRGB(r) + 0.7152 * sRGB(g) + 0.0722 * sRGB(b)).toFixed(precision);
    return percentage ? L * 100 : L;
  };

  CM.prototype.contrast = function ({ bgColor = "#fff", precision = 4, ratio = false } = {}) {
    const Lf = this.luminance();
    const Lb = (bgColor instanceof CM ? bgColor : new CM(bgColor)).luminance();
    const contrast = ((Math.max(Lf, Lb) + 0.05) / (Math.min(Lf, Lb) + 0.05)).toFixed(precision);
    return ratio ? contrast + ":1" : +contrast;
  };

  CM.prototype.readableOn = function ({ bgColor = "#fff", size = "body", level = "minimum" } = {}) {
    const contrast = this.contrast({ bgColor });
    if (size === "body" && level === "enhanced") return contrast >= 7.0;
    else if (size === "large" && level === "minimum") return contrast >= 3.0;
    else return contrast >= 4.5;
  };

  CM.prototype.equalTo = function (cmpColor = "#fff") {
    const currArr = Object.values(this.rgba());
    const cmpArr = Object.values((cmpColor instanceof CM ? cmpColor : new CM(cmpColor)).rgba());
    return currArr.toString() === cmpArr.toString();
  };

  CM.prototype.isLight = function () {
    return this.brightness() >= 0.5;
  };

  CM.prototype.isDark = function () {
    return !this.isLight();
  };

  CM.prototype.isCool = function () {
    const { h } = this.hsla();
    return 75 <= h && h < 255;
  };

  CM.prototype.isWarm = function () {
    return !this.isCool();
  };

  CM.prototype.isTinted = function () {
    return this.hsla().l > 50.0;
  };

  CM.prototype.isShaded = function () {
    return this.hsla().l < 50.0;
  };

  CM.prototype.isToned = function () {
    return this.hsla().s < 100.0;
  };

  CM.prototype.isPureHue = function ({ reason = true } = {}) {
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
      [Rc, Gc, Bc] = getRGBArr(WebSafeArr[i], [Rc, Gc, Bc]);

      const currDist = channelWiseDifference([Rc, Gc, Bc], [r, g, b]);
      if (currDist < minDist) {
        minDist = currDist;
        closestMatch = { r: Rc, g: Gc, b: Bc, a };
      }
    }

    return new CM(closestMatch);
  };
};

export default A11yPlugin;
