import HEXColors from "../models/hex";
import HSLColors from "../models/hsl";
import RGBColors from "../models/rgb";
import { IAlphaInvert, IStringOpts, TChannel } from "./common";

export interface Irgb {
  r: number;
  g: number;
  b: number;
}

export interface Irgba extends Irgb {
  a: number;
}

export interface IRGBColors {
  /**
   * Gives the string representation of an input RGBA color object
   * @param opts -
   *  - withAlpha → whether or not to include the alpha channel in the output
   *  - quotes → type of quotes to use around the output
   *  - precision → how many decimal places to include for each value
   * @returns ```rgba?(r, g, b, a?)```
   * @example ({ r: 128, g: 64, b: 32, a: 0.5 }).string() → "rgba(128, 64, 32, 0.5)"
   */
  string: ({ withAlpha, precision }: IStringOpts) => string;

  /**
   * Gets the color table HTML/CSS name for a given color
   *
   * @note Colors with an alpha value of '0' return 'transparent'. Also, colors with alpha < 1, return `CSS_NAME (with opacity)`
   * @example CM.RGBAFrom("rgb(128, 0, 0)") → "maroon"
   * @returns The color's HTML/CSS name
   */
  name: () => string;

  /**
   * Converts a RGBA color to HSLA color
   *
   * @link https://www.rapidtables.com/convert/color/rgb-to-hsl.html
   * @returns {RGBColors} An HSLA instance that can be acted upon → for function chaining
   */
  hsl: () => HSLColors;

  /**
   * Converts a RGBA color to HEXA color
   *
   * @returns {HEXColors} An HEXA instance that can be acted upon → for function chaining
   */
  hex: () => HEXColors;

  /**
   * Lets you set a single channel value to a specific number
   * @param channel Which RGBA channel to set
   * @param value In range [0, 255] for red, green, blue. In range [0, 1] for alpha
   * @returns The instance that was acted upon → for function chaining
   */
  changeValueTo: (channel: TChannel, value: number) => RGBColors;

  /**
   * Instead of setting the value as in {@link RGBColors.changeValueTo changeValueTo}, this allows you to adjust the channel value by `delta` amount.
   * @param channel Which RGBA channel to increment/decrement
   * @param delta A positive OR negative integer/decimal number to adjust the channel by
   * @returns The instance that was acted upon → for function chaining
   */
  changeValueBy: (channel: TChannel, delta: number) => RGBColors;

  // TODO
  // hueTo: (value: number) => RGBColors;

  // TODO
  // hueBy: (delta: number) => RGBColors;

  /**
   * Syntactic sugar for {@link RGBColors.changeValueTo changeValueTo} with "alpha" as the channel
   * @param value Must be in range [0, 1] as this is the alpha channel
   * @returns The instance that was acted upon → for function chaining
   */
  alphaTo: (value: number) => RGBColors;

  /**
   * Syntactic sugar for {@link RGBColors.changeValueBy changeValueBy} with "alpha" as the channel
   * @param delta When added to current alpha value, range must remain in [0, 1]
   * @returns The instance that was acted upon → for function chaining
   */
  alphaBy: (delta: number) => RGBColors;

  /**
   * Given an input color, get its inverse value by subtracting current value from the upper bound for each channel
   * @param { includeAlpha } opts Whether or not to also invert the alpha channel
   * @returns The corresponding inverse color
   */
  invert: ({ includeAlpha }: IAlphaInvert) => RGBColors;

  /**
   * Saturates (intensity) the color in HSLA space to get the corresponding RGBA space color
   * @param delta When added to current saturation value, range must remain in [0, 100]
   *
   * @see {@link HSLColors.saturateBy saturateBy} for functionality
   * @note A negative value can be used, but we recommend using {@link RGBColors.desaturateBy desaturateBy} for clarity
   * @returns The instance that was acted upon → for function chaining
   */
  saturateBy: (delta: number) => RGBColors;

  /**
   * De-saturates (intensity) the color in HSLA space to get the corresponding RGBA space color
   * @param delta When added to current saturation value, range must remain in [0, 100]
   *
   * @see {@link HSLColors.desaturateBy desaturateBy} for functionality
   * @returns The instance that was acted upon → for function chaining
   */
  desaturateBy: (delta: number) => RGBColors;

  /**
   * Adds lightness (tone) of the color in HSLA space to get the corresponding RGBA space color
   * @param delta When added to current lightness value, range must remain in [0, 100]
   *
   * @see {@link HSLColors.lighterBy lighterBy} for functionality
   * @note A negative value can be used, but we recommend using {@link RGBColors.darkerBy darkerBy} for clarity
   * @returns The instance that was acted upon → for function chaining
   */
  lighterBy: (delta: number) => RGBColors;

  /**
   * Removes lightness (tone) of the color in HSLA space to get the corresponding RGBA space color
   * @param delta When added to current saturation value, range must remain in [0, 100]
   *
   * @see {@link HSLColors.darkerBy darkerBy} for functionality
   * @returns The instance that was acted upon → for function chaining
   */
  darkerBy: (delta: number) => RGBColors;

  /**
   * Sets the saturation of the color to 0% in HSLA space to get the corresponding RGBA space color
   *
   * @see {@link HSLColors.grayscale grayscale} for functionality
   * @note The lightness of the color remains unchanged by this operation
   * @returns The instance that was acted upon → for function chaining
   */
  grayscale: () => RGBColors;

  /**
   * Rotation changes the hue of a color by `value` degrees in HSLA space
   * @returns The instance that was acted upon → for function chaining
   */
  rotate: (value: number) => RGBColors;

  /**
   * Finds the closest Web Safe color to the current color from the list at: https://www.rapidtables.com/web/color/Web_Safe.html
   * @returns The instance that was acted upon → for function chaining
   */
  closestWebSafe: () => RGBColors;
}
