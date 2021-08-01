import { IA11yOpts, IReadable, THEXAInput, TStrArr } from "..";
import HEXColors from "../models/hex";
import HSLColors from "../models/hsl";
import RGBColors from "../models/rgb";
import { IAlphaInvert, IStringOpts, TChannel, TOperator } from "./common";

export interface Ihex {
  r: string;
  g: string;
  b: string;
}

export interface Ihexa extends Ihex {
  a: string;
}

export interface IHEXColors {
  /**
   * the HEXA color instance as an object
   */
  readonly object: Ihexa;

  /**
   * the HEXA color instance as an array
   */
  readonly array: Required<TStrArr>;

  /**
   * the color format of a HEXA color instance
   * @note Useful when you are using variables and are not sure what color space the color is from
   */
  readonly format: string;

  /**
   * the red channel value of this HEXA color instance as a 2 character string
   */
  readonly red: string;

  /**
   * the blue channel value of this HEXA color instance as a 2 character string
   */
  readonly blue: string;

  /**
   * the green channel value of this HEXA color instance as a 2 character string
   */
  readonly green: string;

  /**
   * the alpha channel channel value of this HEXA color instance as a 2 character string
   */
  readonly alpha: string;

  /**
   * the hue channel value from the corresponding HSLA color space
   */
  readonly hue: number;

  /**
   * the saturation channel value from the corresponding HSLA color space
   */
  readonly saturation: number;

  /**
   * the lightness channel value from the corresponding HSLA color space
   */
  readonly lightness: number;

  /**
   * Gives the string representation of an input HSLA color object
   * @param opts withAlpha → whether or not to include the alpha channel in the output
   * @returns ```#RRGGBBAA?```
   * @example ({ r: "FF", g: "77", b: "00", a: "77" }).string() → "#FF770077"
   */
  string: ({ withAlpha }: IStringOpts) => string;

  /**
   * Gets the color table HTML/CSS name for a given color in RGBA color space
   * @param opts - exact → If true - attempts to find an exact match (undefined if not found), else finds the nearest color name
   *
   * @note Colors with an alpha value of '00' return 'transparent'. Also, colors with alpha < "FF", return `CSS_NAME (with opacity)`
   * @example CM.HEXAFrom("#800000").name() → "maroon"
   * @see {@link RGBColors.name} for functionality
   * @returns The color's HTML/CSS name
   */
  name: (opts: { exact?: boolean }) => string;

  /**
   * Converts a HEXA color to RGBA color
   *
   * @returns {RGBColors} An RGBA instance that can be acted upon → for function chaining
   */
  rgb: () => RGBColors;

  /**
   * Converts a HEXA color to HSLA color
   *
   * @note First the color is converted to RGBA space, then HSLA
   * @returns {HSLColors} An HSLA instance that can be acted upon → for function chaining
   */
  hsl: () => HSLColors;

  /**
   * Lets you set a single channel value to a specific number
   * @param channel Which HEXA channel to set
   * @param value In range ['00', 'FF']
   *
   * @note 'value' can also be 1 character, in which case it will be padded with a leading '0'
   * @returns The instance that was acted upon → for function chaining
   */
  changeValueTo: (channel: TChannel, value: string) => HEXColors;

  /**
   * Instead of setting the value as in {@link HEXColors.changeValueTo changeValueTo}, this allows you to adjust the channel value by `delta` amount.
   * @param channel Which HEXA channel to increment/decrement
   * @param delta A 1 or 2 character string to adjust the channel by
   * @param type Either 'add' or 'sub' indicating whether the delta should be positive or negative
   * @returns The instance that was acted upon → for function chaining
   */
  changeValueBy: (channel: TChannel, delta: string, type: TOperator) => HEXColors;

  // TODO
  // hueTo: (value: number) => HEXColors;

  // TODO
  // hueBy: (delta: number) => HEXColors;

  /**
   * Syntactic sugar for {@link HEXColors.changeValueTo changeValueTo} with "alpha" as the channel
   * @param value Must be in range ["00", "FF"]
   * @returns The instance that was acted upon → for function chaining
   */
  alphaTo: (value: string) => HEXColors;

  /**
   * Syntactic sugar for {@link HEXColors.changeValueBy changeValueBy} with "alpha" as the channel
   * @param delta When added to current alpha value, range must remain in ["00", "FF"]
   * @param type Either 'add' or 'sub' indicating whether the delta should be positive or negative
   * @returns The instance that was acted upon → for function chaining
   */
  alphaBy: (delta: string, type: TOperator) => HEXColors;

  /**
   * Given an input color, get its inverse value by subtracting current value from the upper bound for each channel
   * @param { includeAlpha } opts Whether or not to also invert the alpha channel
   *
   * @note Here ColorMaster first converts to RGBA color space, does the inversion, and converts back to HSLA colorspace
   * @link https://pinetools.com/invert-color
   * @returns The corresponding inverse color
   */
  invert: ({ includeAlpha }: IAlphaInvert) => HEXColors;

  /**
   * Syntactic sugar for {@link HEXColors.changeValueBy changeValueBy} with "saturation" as the channel
   * @param delta When added to current saturation value, range must remain in [0, 100]
   *
   * @note A negative value can be used, but we recommend using {@link HEXColors.desaturateBy desaturateBy} for clarity
   * @returns The instance that was acted upon → for function chaining
   */
  saturateBy: (delta: string) => HEXColors;

  /**
   * Syntactic sugar for {@link HEXColors.saturateBy saturateBy} with a negative value
   * @param delta When added to current saturation value, range must remain in [0, 100]
   * @returns The instance that was acted upon → for function chaining
   */
  desaturateBy: (delta: string) => HEXColors;

  /**
   * Syntactic sugar for {@link HEXColors.changeValueBy changeValueBy} with "lightness" as the channel
   * @param delta When added to current lightness value, range must remain in [0, 100]
   *
   * @note A negative value can be used, but we recommend using {@link HEXColors.darkerBy darkerBy} for clarity
   * @returns The instance that was acted upon → for function chaining
   */
  lighterBy: (delta: string) => HEXColors;

  /**
   * Syntactic sugar for {@link HEXColors.lighterBy lighterBy} with a negative value
   * @param delta When added to current saturation value, range must remain in [0, 100]
   * @returns The instance that was acted upon → for function chaining
   */
  darkerBy: (delta: string) => HEXColors;

  /**
   * Syntactic sugar for {@link HEXColors.desaturateBy desaturateBy} with a very large delta. Sets the saturation to 0%
   *
   * @note The lightness of the color remains unchanged by this operation
   * @returns The instance that was acted upon → for function chaining
   */
  grayscale: () => HEXColors;

  /**
   * Rotation changes the hue of a color by `value` degrees in HSLA space
   * @returns The instance that was acted upon → for function chaining
   */
  rotate: (value: number) => HEXColors;

  /**
   * Finds the closest Web Safe color (via RGBA color space) to the current color from the list at: https://www.rapidtables.com/web/color/Web_Safe.html
   *
   * @see {@link RGBColors.closestWebSafe} for functionality
   * @returns The instance that was acted upon → for function chaining
   */
  closestWebSafe: () => HEXColors;

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
   * @see {@link HEXColors.readableOn readableOn} for readable contrast ratios
   * @returns The contrast between current color instance and `bgColor` as a number (value → `ratio = false`) or string ("value:1" → `ratio = true`)
   */
  contrast: (bgColor: THEXAInput | HEXColors, opts: IA11yOpts) => string | number;

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
   * @param bgColor the background HEXA color instance
   * @param opts -
   * - size → Either "body" or "large" text size (large is 120-150% larger than body text)
   * - ratio → Either "minimum" ("AA" rating) or "enhanced" ("AAA" rating)
   *
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/Accessibility/Understanding_WCAG/Perceivable/Color_contrast}
   * @returns Whether or not the color is readable on `bgColor`
   */
  readableOn: (bgColor: THEXAInput | HEXColors, opts: IReadable) => boolean;

  /**
   * Given an input color to compare with, determine if that color is identical to the current color instance
   * @returns True if the two color instances are identical (same HEXA channel values). False otherwise.
   */
  equalTo: (compareColor: THEXAInput | HEXColors) => boolean;
}
