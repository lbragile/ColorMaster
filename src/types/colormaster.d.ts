import { IStringOpts, Ihsla, Ihexa, Irgba } from ".";
import { HueColors } from "../enums/colors";

/**
 * For the following methods, unless otherwise specified the operation is performed in RGBA space
 */
export interface IColorMaster {
  /**
   * The color format of a RGBA color instance
   * @note Useful when you are using variables and are not sure what color space the color is from
   */
  readonly format: string;

  /**
   * The red channel value of this RGBA color instance
   */
  readonly red: number;

  /**
   * The green channel value of this RGBA color instance
   */
  readonly green: number;

  /**
   * The blue channel value of this RGBA color instance
   */
  readonly blue: number;

  /**
   * The alpha channel channel value of this RGBA color instance
   */
  readonly alpha: number;

  /**
   * The hue channel value from the corresponding HSLA color space
   */
  readonly hue: number;

  /**
   * The saturation channel value from the corresponding HSLA color space
   */
  readonly saturation: number;

  /**
   * The lightness channel value from the corresponding HSLA color space
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
   * @example CM({ r: 200, g: 150, b: 100, a: 0.7 }).stringRGB() → "rgba(200, 150, 100, 0.7)"
   * @default { alpha: true, precision: [0, 0, 0, 1] }
   * @returns ```rgb[a](R, G, B[, A])```
   */
  stringRGB({ alpha, precision }?: IStringOpts): string;

  /**
   * Gives the string representation of an input HEXA color object
   * @param opts -
   *  - alpha → whether or not to include the alpha channel in the output
   * @example CM({ r: 200, g: 150, b: 100, a: 0.7 }).stringHEX() → "#C89664B3"
   * @default { alpha: true }
   * @returns ```#RRGGBB[AA]```
   */
  stringHEX({ alpha }?: IStringOpts): string;

  /**
   * Gives the string representation of an input HSLA color object
   * @param opts -
   *  - alpha → whether or not to include the alpha channel in the output
   *  - precision → how many decimal places to include for each value
   * @example CM({ r: 200, g: 150, b: 100, a: 0.7 }).stringHSL() → "hsla(30, 48%, 59%, 0.7)"
   * @default { alpha: true, precision: [0, 0, 0, 1] }
   * @returns ```hsl[a](H, S, L[, A])```
   */
  stringHSL({ alpha, precision }?: IStringOpts): string;

  /**
   * Converts a RGBA color instance to RGBA color object
   */
  rgba(): Irgba;

  /**
   * Converts a RGBA color instance to HEXA color object
   *
   * @default { round: false }
   */
  hexa({ round }?: { round: boolean }): Ihexa;

  /**
   * Converts a RGBA color instance to HSLA color object
   *
   * @link https://www.rapidtables.com/convert/color/rgb-to-hsl.html
   */
  hsla(): Ihsla;

  /**
   * Changes the "hue" channel value TO a given input value (done in HSLA space and converted back to RGBA space)
   * @param value Must be in range [0, 360) or a CSS/HTML color name
   * @returns The instance that was acted upon → for function chaining
   */
  hueTo(value: number | keyof typeof HueColors): this;

  /**
   * Changes the "hue" channel value BY a given delta (done in HSLA space and converted back to RGBA space)
   * @param delta When added to current alpha value, range must remain in [0, 360)
   * @note `delta` can be negative
   * @returns The instance that was acted upon → for function chaining
   */
  hueBy(delta: number): this;

  /**
   * Changes the "alpha" channel value TO a given input value
   * @param value Must be in range [0, 1] as this is the alpha channel
   * @returns The instance that was acted upon → for function chaining
   */
  alphaTo(value: number): this;

  /**
   * Changes the "alpha" channel value BY a given delta
   * @param delta When added to current alpha value, range must remain in [0, 1]
   * @note `delta` can be negative
   * @returns The instance that was acted upon → for function chaining
   */
  alphaBy(delta: number): this;

  /**
   * Given an input color, get its inverse value by subtracting current value from the upper bound for each channel
   * @param opts Whether or not to also invert the alpha channel
   *
   * @default { alpha = false }
   * @returns The corresponding inverse color
   */
  invert({ alpha }?: { alpha: boolean }): this;

  /**
   * Saturates (intensity) the color in HSLA space
   * @param delta When added to current saturation value, range must remain in [0, 100]
   *
   * @note `delta` can be negative, but we recommend using {@link ColorMaster.desaturateBy desaturateBy} for clarity
   * @returns The instance that was acted upon → for function chaining
   */
  saturateBy(delta: number): this;

  /**
   * De-saturates (intensity) the color in HSLA space
   * @param delta When added to current saturation value, range must remain in [0, 100]
   *
   * @note `delta` can be negative, but we recommend using {@link ColorMaster.saturateBy saturateBy} for clarity
   * @returns The instance that was acted upon → for function chaining
   */
  desaturateBy(delta: number): this;

  /**
   * Adds lightness (tone) of the color in HSLA space
   * @param delta When added to current lightness value, range must remain in [0, 100]
   *
   * @note `delta` can be negative, but we recommend using {@link ColorMaster.darkerBy darkerBy} for clarity
   * @returns The instance that was acted upon → for function chaining
   */
  lighterBy(delta: number): this;

  /**
   * Removes lightness (tone) of the color in HSLA space
   * @param delta When added to current saturation value, range must remain in [0, 100]
   *
   * @note `delta` can be negative, but we recommend using {@link ColorMaster.lighterBy lighterBy} for clarity
   * @returns The instance that was acted upon → for function chaining
   */
  darkerBy(delta: number): this;

  /**
   * Sets the saturation of the color to 0% in HSLA space
   *
   * @note The lightness of the color remains unchanged by this operation
   * @returns The instance that was acted upon → for function chaining
   */
  grayscale(): this;

  /**
   * Rotation changes the hue of a color by `value` degrees in HSLA space
   * @note Keep in mind that the hue channel has a 360 degree rotational symmetry
   * @returns The instance that was acted upon → for function chaining
   */
  rotate(value: number): this;
}
