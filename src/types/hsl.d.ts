import HEXColors from "../models/hex";
import HSLColors from "../models/hsl";
import RGBColors from "../models/rgb";
import { IAlphaInvert, IStringOpts, TChannelHSL } from "./common";

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
   *
   * @note Colors with an alpha value of '00' return 'transparent'. Also, colors with alpha < "FF", return `CSS_NAME (with opacity)`
   * @example CM.HSLAFrom("hsl(0, 100%, 25.1%)") → "maroon"
   * @see {@link RGBColors.name} for functionality
   * @returns The color's HTML/CSS name
   */
  name: () => string;

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
   * @param value Must be in range [0, 359]
   * @returns The instance that was acted upon → for function chaining
   */
  hueTo: (value: number) => HSLColors;

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
}
