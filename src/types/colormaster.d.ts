import { ColorMaster } from "../colormaster";
import { HueColors, RGBExtended } from "../enums/colors";

type THexDigit = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";
type THexLower = "a" | "b" | "c" | "d" | "e" | "f";
type THexUpper = "A" | "B" | "C" | "D" | "E" | "F";

export type THexStr =
  | `${THexDigit}${THexDigit}`
  | `${THexDigit}${THexLower}`
  | `${THexLower}${THexDigit}`
  | `${THexDigit}${THexUpper}`
  | `${THexUpper}${THexDigit}`
  | `${THexLower}${THexLower}`
  | `${THexLower}${THexUpper}`
  | `${THexUpper}${THexLower}`
  | `${THexUpper}${THexUpper}`
  | THexDigit
  | THexLower
  | THexUpper;

export interface Irgb {
  r: number;
  g: number;
  b: number;
}

export interface Ihsl {
  h: number;
  s: number;
  l: number;
}

export interface Ihsv {
  h: number;
  s: number;
  v: number;
}

export interface Ihex {
  r: THexStr;
  g: THexStr;
  b: THexStr;
}

export interface Ixyz {
  x: number;
  y: number;
  z: number;
}

export interface Ilab {
  l: number;
  a: number;
  b: number;
}

export interface Ilch {
  l: number;
  c: number;
  h: number;
}

export interface Irgba extends Irgb {
  a: number;
}

export interface Ihsla extends Ihsl {
  a: number;
}

export interface Ihsva extends Ihsv {
  a: number;
}

export interface Ihexa extends Ihex {
  a: string;
}

export interface Ixyza extends Ixyz {
  a: number;
}

export interface Ilaba extends Ilab {
  alpha: number;
}

export interface Ilcha extends Ilch {
  a: number;
}

/**
 * Array value form when instantiating a RGBA or HSLA object
 */
export type TNumArr = [number, number, number, number?];

/**
 * Array value form when instantiating a HEXA object
 */
export type TStrArr = [THexStr, THexStr, THexStr, THexStr?];

/**
 * Possible operator for value adjustment of HEXA color space
 */
export type TOperator = "add" | "sub";

/**
 * Formatting options for output string
 */
export interface IStringOpts {
  alpha?: boolean;
  precision?: Required<TNumArr>;
}

/**
 * Formatting options for accessibility function outputs
 */
export interface IA11yOpts {
  precision?: number;
  percentage?: boolean;
  ratio?: boolean;
  bgColor?: TInput | ColorMaster;
}

/**
 * Options for determining if a color is readable
 */
export interface IReadable extends Pick<IA11yOpts, "bgColor"> {
  size?: "body" | "large";
  ratio?: "minimum" | "enhanced";
}

/**
 * When using the monochromatic harmony, the user has more choices to pick from
 */
export interface IMonochromatic {
  effect?: TMonoEffect;
  amount?: number;
  type?: THarmony;
}

/**
 * Hue adjustment types for monochromatic harmony
 */
export type TMonoEffect = "tones" | "tints" | "shades";

/**
 * The different well know color harmonies
 * @see {@link https://www.tigercolor.com/color-lab/color-theory/color-theory-intro.htm}
 */
export type THarmony =
  | "analogous"
  | "complementary"
  | "split-complementary"
  | "double-split-complementary"
  | "triad"
  | "rectangle"
  | "square"
  | "monochromatic";

/**
 * Possible Channels for RGBA and HEXA color space
 */
export type TChannel = "red" | "green" | "blue" | "alpha";

/**
 * Possible Channels for HSLA color space
 */
export type TChannelHSL = "hue" | "saturation" | "lightness" | "alpha";

/**
 * Simplified type that combines all possible color space inputs
 */
export type TInput = string | Irgb | Irgba | Ihex | Ihexa | Ihsl | Ihsla;

export type TFormat = "invalid" | "name" | "rgb" | "hex" | "hsl" | "xyz" | "lab" | "lch";

export type TPlugin = (CM: typeof ColorMaster) => void;

export type TParser = (color: TInput | keyof typeof RGBExtended) => [Irgba, TFormat];

export interface IColorMaster {
  /**
   * the RGBA color instance as an array
   */
  readonly array: Required<TNumArr>;

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

  /**
   * Mix current color instance with another based on a given ratio (done in LCHA space for best results)
   * @note The ratio represents a percentage of the input `color` that will be mixed
   *       with the remaining portion of the current color instance
   * @example mix('#fff', 0.2) → "mix 80% of the current color with 20% of white"
   * @see {@link https://math.stackexchange.com/a/3263100} For argument of why LCH space should be used over LAB space
   * @returns A new color instance corresponding to the new mixture
   */
  mix(color: TInput, ratio: number): ColorMaster;
}
