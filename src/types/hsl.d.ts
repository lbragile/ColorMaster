import { IA11yOpts, IReadable, THSLAInput, TNumArr } from "..";
import { HueColors } from "../enums/colors";
import HEXColors from "../models/hex";
import HSLColors from "../models/hsl";
import RGBColors from "../models/rgb";
import { IAlphaInvert, IMonochromatic, IStringOpts, TChannelHSL, THarmony } from "./common";

export interface Ihsl {
  h: number;
  s: number;
  l: number;
}

export interface Ihsla extends Ihsl {
  a: number;
}

export interface IHSLColors {
  /**
   * the HSLA color instance as an object
   */
  readonly object: Ihsla;

  /**
   * the HSLA color instance as an array
   */
  readonly array: Required<TNumArr>;

  /**
   * the color format of a HSLA color instance
   * @note Useful when you are using variables and are not sure what color space the color is from
   */
  readonly format: string;

  /**
   * the red channel value from the corresponding RGBA color space
   */
  readonly red: number;

  /**
   * the blue channel value from the corresponding RGBA color space
   */
  readonly blue: number;

  /**
   * the green channel value from the corresponding RGBA color space
   */
  readonly green: number;

  /**
   * the alpha channel value of this HSLA color instance
   */
  readonly alpha: number;

  /**
   * the hue channel value of this HSLA color instance
   */
  readonly hue: number;

  /**
   * the saturation channel value of this HSLA color instance
   */
  readonly saturation: number;

  /**
   * the lightness channel value of this HSLA color instance
   */
  readonly lightness: number;

  /**
   * Gives the string representation of an input HSLA color object
   * @param opts -
   *  - withAlpha → whether or not to include the alpha channel in the output
   *  - precision → how many decimal places to include for each value
   * @returns ```hsla?(h, s%, l%, a?)```
   * @example ({ h: 128, s: 100, l: 100, a: 0.5 }).string() → "hsla(128, 100%, 100%, 0.5)"
   */
  string: ({ withAlpha, precision }: IStringOpts) => string;

  /**
   * Converts a HSLA color to RGBA color
   *
   * @link https://www.rapidtables.com/convert/color/hsl-to-rgb.html
   * @returns {RGBColors} An RGBA instance that can be acted upon → for function chaining
   */
  rgb: () => RGBColors;

  /**
   * Gets the color table HTML/CSS name for a given color in RGBA color space
   * @param opts - exact → If true - attempts to find an exact match (undefined if not found), else finds the nearest color name
   *
   * @note Colors with an alpha value of '00' return 'transparent'. Also, colors with alpha < "FF", return `CSS_NAME (with opacity)`
   * @example CM.HSLAFrom("hsl(0, 100%, 25.1%)").name() → "maroon"
   * @see {@link RGBColors.name} for functionality
   * @returns The color's HTML/CSS name
   */
  name: (opts: { exact?: boolean }) => string;

  /**
   * Converts a HSLA color to HEXA color
   *
   * @note First we convert to RGBA space, then to HEXA space
   * @returns {RGBColors} An HEXA instance that can be acted upon → for function chaining
   */
  hex: () => HEXColors;

  /**
   * Lets you set a single channel value to a specific number
   * @param channel Which HSLA channel to set
   * @param value In range [0, 359] for `hue`. In range [0, 1] for `alpha`
   *
   * @note Hue is degrees based, thus clamping does not apply. Instead a k*360 multiple is added/subtracted from the value to get a value in range [0, 359]
   * @returns The instance that was acted upon → for function chaining
   */
  changeValueTo: (channel: TChannelHSL, value: number) => HSLColors;

  /**
   * Instead of setting the value as in {@link HSLColors.changeValueTo changeValueTo}, this allows you to adjust the channel value by `delta` amount.
   * @param channel Which HSLA channel to increment/decrement
   * @param delta A positive OR negative integer/decimal number to adjust the channel by
   *
   * @note Hue is degrees based, thus clamping does not apply. Instead a k*360 multiple is added/subtracted from the value to get a value in range [0, 359]
   * @returns The instance that was acted upon → for function chaining
   */
  changeValueBy: (channel: TChannelHSL, delta: number) => HSLColors;

  /**
   * Syntactic sugar for {@link HSLColors.changeValueTo changeValueTo} with "hue" as the channel
   * @param value Must be in range [0, 359] or a CSS/HTML color name
   * @returns The instance that was acted upon → for function chaining
   */
  hueTo: (value: number | keyof typeof HueColors) => HSLColors;

  /**
   * Syntactic sugar for {@link HSLColors.changeValueBy changeValueBy} with "hue" as the channel
   * @param delta When added to current alpha value, range must remain in [0, 359]
   * @returns The instance that was acted upon → for function chaining
   */
  hueBy: (delta: number) => HSLColors;

  /**
   * Syntactic sugar for {@link HSLColors.changeValueTo changeValueTo} with "alpha" as the channel
   * @param value Must be in range [0, 1] as this is the alpha channel
   * @returns The instance that was acted upon → for function chaining
   */
  alphaTo: (value: number) => HSLColors;

  /**
   * Syntactic sugar for {@link HSLColors.changeValueBy changeValueBy} with "alpha" as the channel
   * @param delta When added to current alpha value, range must remain in [0, 1]
   * @returns The instance that was acted upon → for function chaining
   */
  alphaBy: (delta: number) => HSLColors;

  /**
   * Given an input color, get its inverse value by subtracting current value from the upper bound for each channel
   * @param { includeAlpha } opts Whether or not to also invert the alpha channel
   *
   * @note Here ColorMaster first converts to RGBA color space, does the inversion, and converts back to HSLA colorspace
   * @link https://pinetools.com/invert-color
   * @returns The corresponding inverse color
   */
  invert: ({ includeAlpha }: IAlphaInvert) => HSLColors;

  /**
   * Syntactic sugar for {@link HSLColors.changeValueBy changeValueBy} with "saturation" as the channel
   * @param delta When added to current saturation value, range must remain in [0, 100]
   *
   * @note A negative value can be used, but we recommend using {@link HSLColors.desaturateBy desaturateBy} for clarity
   * @returns The instance that was acted upon → for function chaining
   */
  saturateBy: (delta: number) => HSLColors;

  /**
   * Syntactic sugar for {@link HSLColors.saturateBy saturateBy} with a negative value
   * @param delta When added to current saturation value, range must remain in [0, 100]
   * @returns The instance that was acted upon → for function chaining
   */
  desaturateBy: (delta: number) => HSLColors;

  /**
   * Syntactic sugar for {@link HSLColors.changeValueBy changeValueBy} with "lightness" as the channel
   * @param delta When added to current lightness value, range must remain in [0, 100]
   *
   * @note A negative value can be used, but we recommend using {@link HSLColors.darkerBy darkerBy} for clarity
   * @returns The instance that was acted upon → for function chaining
   */
  lighterBy: (delta: number) => HSLColors;

  /**
   * Removes lightness (tone) of the color in HSLA space
   * @param delta When added to current saturation value, range must remain in [0, 100]
   *
   * @see {@link HSLColors.darkerBy darkerBy} for functionality
   * @returns The instance that was acted upon → for function chaining
   */
  darkerBy: (delta: number) => HSLColors;

  /**
   * Syntactic sugar for {@link HSLColors.desaturateBy desaturateBy} with a very large delta. Sets the saturation to 0%
   *
   * @note The lightness of the color remains unchanged by this operation
   * @returns The instance that was acted upon → for function chaining
   */
  grayscale: () => HSLColors;

  /**
   * Rotation changes the hue of a color by `value` degrees
   * This is syntactic sugar for {@link HSLColors.hueBy hueBy}
   * @returns The instance that was acted upon → for function chaining
   */
  rotate: (value: number) => HSLColors;

  /**
   * Finds the closest Web Safe color (via RGBA color space) to the current color from the list at: https://www.rapidtables.com/web/color/Web_Safe.html
   *
   * @see {@link RGBColors.closestWebSafe} for functionality
   * @returns The instance that was acted upon → for function chaining
   */
  closestWebSafe: () => HSLColors;

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
  brightness: () => number;

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
  luminance: (opts: IA11yOpts) => number;

  /**
   * Given a background color as input, determines the contrast ratio if the current color is used as the foreground color
   *
   * @param bgColor the background RGBA color instance
   * @param opts -
   * - precision → How many decimal places to use in the output
   * - ratio → Whether or not to append `:1` to the output (express as a ratio)
   *
   * @note This ratio will range from `1:1 → white fg : white bg` to `21:1 → black fg : white bg`
   * @see {@link HSLColors.readableOn readableOn} for readable contrast ratios
   * @returns The contrast between current color instance and `bgColor` as a number (value → `ratio = false`) or string ("value:1" → `ratio = true`)
   */
  contrast: (bgColor: THSLAInput | HSLColors, opts: IA11yOpts) => string | number;

  /**
   * Determines if a given color is light based on its brightness (brightness ≥ 0.50)
   */
  isLight: () => boolean;

  /**
   * Determines if a given color is dark based on its brightness (brightness < 0.50)
   */
  isDark: () => boolean;

  /**
   * Given a background color as input, determines if the current color is readable if it is used as the foreground color
   *
   * |           | Minimum | Enhanced |
   * | :-------- | :------ | :------- |
   * | **Body**  |  4.5:1  |  7.0:1   |
   * | **Large** |  3.0:1  |  4.5:1   |
   *
   * @param bgColor the background RGBA color instance
   * @param opts -
   * - size → Either "body" or "large" text size (large is 120-150% larger than body text)
   * - ratio → Either "minimum" ("AA" rating) or "enhanced" ("AAA" rating)
   *
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/Accessibility/Understanding_WCAG/Perceivable/Color_contrast}
   * @returns Whether or not the color is readable on `bgColor`
   */
  readableOn: (bgColor: THSLAInput | HSLColors, opts: IReadable) => boolean;

  /**
   * Given an input color to compare with, determine if that color is identical to the current color instance
   * @returns True if the two color instances are identical (same RGBA channel values). False otherwise.
   */
  equalTo: (compareColor: THSLAInput | HSLColors) => boolean;

  /**
   * Generates an HSLA color instance array based on the corresponding harmony
   *
   * @param type The color harmony to apply
   * @opts Only apply to 'monochromatic' harmony
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
  harmony: (type: THarmony, opts: IMonochromatic) => HSLColors[];

  /**
   * "Cool colors give an impression of calm, and create a soothing impression"
   *
   * These typically contain more blue and green pigmentation (higher hue)
   *
   * @see {@link https://www.tigercolor.com/color-lab/color-theory/color-theory-intro.htm} or {@link https://www.canva.com/colors/color-wheel/}
   */
  isCool: () => boolean;

  /**
   * "Warm colors are vivid and energetic, and tend to advance in space"
   *
   * These typically contain more red and yellow pigmentation (lower hue)
   *
   * @see {@link https://www.tigercolor.com/color-lab/color-theory/color-theory-intro.htm} or {@link https://www.canva.com/colors/color-wheel/}
   */
  isWarm: () => boolean;

  /**
   * Helper for determining if a given color instance is tinted (lightness deviated upwards from a pure hue whose lightness is 50%)
   */
  isTinted: () => boolean;

  /**
   * Helper for determining if a given color instance is shaded (lightness deviated downwards from a pure hue whose lightness is 50%)
   */
  isShaded: () => boolean;

  /**
   * Helper for determining if a given color instance is toned (saturation deviated from a pure hue whose saturation is 100%)
   */
  isToned: () => boolean;
}
