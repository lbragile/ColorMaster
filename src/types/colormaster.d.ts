import { IStringOpts, Ihsla, Ihexa } from ".";
import { ColorMaster } from "..";
import { HueColors } from "../enums/colors";

export interface IColorMaster {
  /**
   * the color format of a RGBA color instance
   * @note Useful when you are using variables and are not sure what color space the color is from
   */
  readonly format: string;

  /**
   * the red channel value of this RGBA color instance
   */
  readonly red: number;

  /**
   * the green channel value of this RGBA color instance
   */
  readonly green: number;

  /**
   * the blue channel value of this RGBA color instance
   */
  readonly blue: number;

  /**
   * the alpha channel channel value of this RGBA color instance
   */
  readonly alpha: number;

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
   * Determines if the current color instance is valid (based on the format returned by the parsers)
   */
  isValid(): boolean;

  /**
   * Gives the string representation of an input RGBA color object
   * @param opts -
   *  - alpha → whether or not to include the alpha channel in the output
   *  - precision → how many decimal places to include for each value
   * @example ({ r: 200, g: 150, b: 100, a: 0.7 }).stringRGB() → "rgba(200, 150, 100, 0.7)"
   * @default { alpha: true, precision: [0, 0, 0, 1] }
   * @returns ```rgb[a](R, G, B[, A])```
   */
  stringRGB({ alpha, precision }?: IStringOpts): string;

  /**
   * Gives the string representation of an input HEXA color object
   * @param opts -
   *  - alpha → whether or not to include the alpha channel in the output
   * @example ({ r: 200, g: 150, b: 100, a: 0.7 }).stringHEX() → "#C89664B3"
   * @default { alpha: true }
   * @returns ```#RRGGBB[AA]```
   */
  stringHEX({ alpha }?: IStringOpts): string;

  /**
   * Gives the string representation of an input HSLA color object
   * @param opts -
   *  - alpha → whether or not to include the alpha channel in the output
   *  - precision → how many decimal places to include for each value
   * @example ({ r: 200, g: 150, b: 100, a: 0.7 }).stringHSL() → "hsla(30, 48%, 59%, 0.7)"
   * @default { alpha: true, precision: [0, 0, 0, 1] }
   * @returns ```hsl[a](H, S, L[, A])```
   */
  stringHSL({ alpha, precision }?: IStringOpts): string;

  /**
   * Converts a RGBA color to HSLA color
   *
   * @link https://www.rapidtables.com/convert/color/rgb-to-hsl.html
   * @returns {ColorMaster} An HSLA instance that can be acted upon → for function chaining
   */
  hsla(): Ihsla;

  /**
   * Converts a RGBA color to HEXA color
   *
   * @default { round: false }
   * @returns {HEXColors} An HEXA instance that can be acted upon → for function chaining
   */
  hexa({ round }?: { round: boolean }): Ihexa;

  /**
   * Syntactic sugar for {@link ColorMaster.changeValueTo changeValueTo} with "hue" as the channel (done in HSLA space and converted back to RGBA space)
   * @param value Must be in range [0, 359] or a CSS/HTML color name
   * @returns The instance that was acted upon → for function chaining
   */
  hueTo(value: number | keyof typeof HueColors): ColorMaster;

  /**
   * Syntactic sugar for {@link ColorMaster.changeValueBy changeValueBy} with "hue" as the channel (done in HSLA space and converted back to RGBA space)
   * @param delta When added to current alpha value, range must remain in [0, 359]
   * @returns The instance that was acted upon → for function chaining
   */
  hueBy(delta: number): ColorMaster;

  /**
   * Syntactic sugar for {@link ColorMaster.changeValueTo changeValueTo} with "alpha" as the channel
   * @param value Must be in range [0, 1] as this is the alpha channel
   * @returns The instance that was acted upon → for function chaining
   */
  alphaTo(value: number): ColorMaster;

  /**
   * Syntactic sugar for {@link ColorMaster.changeValueBy changeValueBy} with "alpha" as the channel
   * @param delta When added to current alpha value, range must remain in [0, 1]
   * @returns The instance that was acted upon → for function chaining
   */
  alphaBy(delta: number): ColorMaster;

  /**
   * Given an input color, get its inverse value by subtracting current value from the upper bound for each channel
   * @param { alpha } opts Whether or not to also invert the alpha channel
   *
   * @default { alpha = false }
   * @returns The corresponding inverse color
   */
  invert({ alpha }?: { alpha: boolean }): ColorMaster;

  /**
   * Saturates (intensity) the color in HSLA space to get the corresponding RGBA space color
   * @param delta When added to current saturation value, range must remain in [0, 100]
   *
   * @see {@link HSLColors.saturateBy saturateBy} for functionality
   * @note A negative value can be used, but we recommend using {@link ColorMaster.desaturateBy desaturateBy} for clarity
   * @returns The instance that was acted upon → for function chaining
   */
  saturateBy(delta: number): ColorMaster;

  /**
   * De-saturates (intensity) the color in HSLA space to get the corresponding RGBA space color
   * @param delta When added to current saturation value, range must remain in [0, 100]
   *
   * @see {@link HSLColors.desaturateBy desaturateBy} for functionality
   * @returns The instance that was acted upon → for function chaining
   */
  desaturateBy(delta: number): ColorMaster;

  /**
   * Adds lightness (tone) of the color in HSLA space to get the corresponding RGBA space color
   * @param delta When added to current lightness value, range must remain in [0, 100]
   *
   * @see {@link HSLColors.lighterBy lighterBy} for functionality
   * @note A negative value can be used, but we recommend using {@link ColorMaster.darkerBy darkerBy} for clarity
   * @returns The instance that was acted upon → for function chaining
   */
  lighterBy(delta: number): ColorMaster;

  /**
   * Removes lightness (tone) of the color in HSLA space to get the corresponding RGBA space color
   * @param delta When added to current saturation value, range must remain in [0, 100]
   *
   * @see {@link HSLColors.darkerBy darkerBy} for functionality
   * @returns The instance that was acted upon → for function chaining
   */
  darkerBy(delta: number): ColorMaster;

  /**
   * Sets the saturation of the color to 0% in HSLA space to get the corresponding RGBA space color
   *
   * @see {@link HSLColors.grayscale grayscale} for functionality
   * @note The lightness of the color remains unchanged by this operation
   * @returns The instance that was acted upon → for function chaining
   */
  grayscale(): ColorMaster;

  /**
   * Rotation changes the hue of a color by `value` degrees in HSLA space
   * @returns The instance that was acted upon → for function chaining
   */
  rotate(value: number): ColorMaster;
}
