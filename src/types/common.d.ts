type THexBase = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";
type THexLower = "a" | "b" | "c" | "d" | "e" | "f";
type THexUpper = "A" | "B" | "C" | "D" | "E" | "F";

export type THexStr =
  | `${THexBase}${THexBase}`
  | `${THexBase}${THexLower}`
  | `${THexLower}${THexBase}`
  | `${THexBase}${THexUpper}`
  | `${THexUpper}${THexBase}`
  | `${THexLower}${THexLower}`
  | `${THexLower}${THexUpper}`
  | `${THexUpper}${THexLower}`
  | `${THexUpper}${THexUpper}`
  | THexBase
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

export interface Ihex {
  r: string;
  g: string;
  b: string;
}

export interface Irgba extends Irgb {
  a: number;
}

export interface Ihsla extends Ihsl {
  a: number;
}

export interface Ihexa extends Ihex {
  a: string;
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
  withAlpha?: boolean;
  precision?: TNumArr;
}

/**
 * Formatting options for accessibility function outputs
 */
export interface IA11yOpts {
  precision?: number;
  percentage?: boolean;
  ratio?: boolean;
}

/**
 * Options for determining if a color is readable
 */
export interface IReadable {
  size?: "body" | "large";
  ratio?: "minimum" | "enhanced";
}

/**
 * Options for the inverting process
 */
export interface IAlphaInvert {
  includeAlpha?: boolean;
}

/**
 * When using the monochromatic harmony, the user has more choices to pick from
 */
export interface IMonochromatic {
  effect?: TMonoEffect;
  amount?: number;
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
