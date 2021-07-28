import HEXColors from "../models/hex";
import HSLColors from "../models/hsl";
import RGBColors from "../models/rgb";
import { IStringOpts, TChannel, TOperator } from "./common";

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
   * Gives the string representation of an input HSLA color object
   * @param opts -
   *  - withAlpha → whether or not to include the alpha channel in the output
   *  - quotes → type of quotes to use around the output
   * @returns ```'#RRGGBBAA?'``` or ```"RRGGBBAA?"```
   * @example ({ r: "FF", g: "77", b: "00", a: "77" }).string({ quotes: 'double' }) → "#FF770077"
   */
  string: ({ withAlpha, quotes, precision }: IStringOpts) => string;

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
  invert: ({ includeAlpha }: { includeAlpha?: boolean }) => HEXColors;

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
}
