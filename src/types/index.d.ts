import { ColorMaster } from "..";
import { TCSSName } from "../enums/colors";

type THexDigit = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";
type THexLower = "a" | "b" | "c" | "d" | "e" | "f";
type THexUpper = "A" | "B" | "C" | "D" | "E" | "F";

/**
 * Possible single or double digit HEX combination
 * @see https://gist.github.com/lbragile/3176be88d6c374e4b69ab86659c03e7c
 */
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

export interface Ihex {
  r: THexStr;
  g: THexStr;
  b: THexStr;
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

export interface Ihwb {
  h: number;
  w: number;
  b: number;
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

export interface Iluv {
  l: number;
  u: number;
  v: number;
}

export interface Iuvw {
  u: number;
  v: number;
  w: number;
}

export interface Iryb {
  r: number;
  y: number;
  b: number;
}

export interface Icmyk {
  c: number; // cyan
  m: number; // magenta
  y: number; // yellow
  k: number; // key (black)
}

export interface Irgba extends Irgb {
  a: number;
}

export interface Ihexa extends Ihex {
  a: string;
}

export interface Ihsla extends Ihsl {
  a: number;
}

export interface Ihsva extends Ihsv {
  a: number;
}

export interface Ihwba extends Ihwb {
  a: number;
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

export interface Iluva extends Iluv {
  a: number;
}

export interface Iuvwa extends Iuvw {
  a: number;
}

export interface Iryba extends Iryb {
  a: number;
}
export interface Icmyka extends Icmyk {
  a: number;
}

/**
 * Array value form when instantiating color space objects that have numeric values like RGBA
 */
export type TNumArr = [number, number, number, number?];

/**
 * Array value form when instantiating color space objects that have string values like HEXA
 */
export type TStrArr = [THexStr, THexStr, THexStr, THexStr?];

/**
 * Possible operator for value adjustment of HEXA color space as there is not unary operator in HEXA space
 */
export type TOperator = "add" | "sub";

/**
 * Formatting options for output string
 */
export interface IStringOpts {
  /** Whether or not to include the alpha channel in the output */
  alpha?: boolean;

  /** How many decimal places to include for each value */
  precision?: Required<TNumArr>;
}

/**
 * Formatting options for output string of CMYKA colorspace
 */
export interface ICMYKStringOpts extends Omit<IStringOpts, "precision"> {
  /** How many decimal places to include for each value */
  precision?: [number, number, number, number, number];
}

/**
 * Options for color inversion
 */
export interface IInvertOpts {
  /** Whether or not to also invert the alpha channel */
  alpha: boolean;
}

/**
 * Options for HEXA object generation
 */
export interface IHexaObjOpts {
  /**
   * Whether or not to round each channel components
   * We recommend rounding only when displaying the object values to the user.
   * Otherwise do not round to improve precision.
   */
  round: boolean;
}

/**
 * Options for color naming functionality
 */
export interface INameOpts {
  /** Whether or not to find an exact match (undefined if not found) - otherwise the nearest color name */
  exact?: boolean;
}

/**
 * Formatting options for accessibility function outputs
 */
export interface IA11yOpts {
  /** How many decimal places to use in the output */
  precision?: number;

  /** Whether or not to multiply the output by 100 */
  percentage?: boolean;

  /** Whether or not to append `:1` to the output (express as a ratio) */
  ratio?: boolean;

  /** The background color to contrast against */
  bgColor?: TInput | ColorMaster;
}

/**
 * Options for determining if a color is readable
 */
export interface IReadable extends Pick<IA11yOpts, "bgColor"> {
  /**
   * Text size
   * - body → Regular typically 12pt/16px and not bold
   * - large → Large is typically 14pt/18.66px or larger and bold OR 18pt/24px or larger and not bold
   */
  size?: "body" | "large";

  /**
   * WCAG 2.0 level
   * - minimum → AA rating
   * - enhanced → AAA rating
   */
  level?: "minimum" | "enhanced";
}

/**
 * Options that can be provided for pure hue determination
 */
export interface IPureHue {
  /** Whether or not to include a reason for the output */
  reason?: boolean;
}

/**
 * Options for mixing colors
 */
export interface IMix {
  /** The color to mix with the current color instance */
  color?: TInput | ColorMaster;

  /** The proportions to use when mixing */
  ratio?: number;

  /** Which colorspace to mix in */
  colorspace?: Exclude<TFormat, "invalid" | "name">;
}

/**
 * When using the monochromatic harmony, the user has more choices to pick from
 */
export interface IHarmony {
  /** The color harmony to compute */
  type?: THarmony;

  /**
   * Only applied when `type === "monochromatic"`
   * - `tints` → add white/add lightness
   * - `shades` → add black/remove lightness
   * - `tones` → add grey/remove saturation
   */
  effect?: TMonoEffect;

  /** For `type === "monochromatic"` → the number of elements (color harmonies) to compute */
  amount?: number;
}

/**
 * Hue adjustment types for monochromatic harmony
 */
export type TMonoEffect = "tones" | "tints" | "shades";

/**
 * The different well know color harmonies
 * @see https://www.tigercolor.com/color-lab/color-theory/color-theory-intro.htm
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
export type TInput =
  // eslint-disable-next-line @typescript-eslint/ban-types
  | (string & {}) // https://stackoverflow.com/a/61048124/4298115 ← allows intellisense for TCSSName & regular strings
  | TCSSName
  | Irgb
  | Irgba
  | Ihex
  | Ihexa
  | Ihsl
  | Ihsla
  | Ihsv
  | Ihsva
  | Ihwb
  | Ihwba
  | Ixyz
  | Ixyza
  | Ilab
  | Ilaba
  | Ilch
  | Ilcha
  | Iluv
  | Iluva
  | Iuvw
  | Iuvwa
  | Iryb
  | Iryba
  | Icmyk
  | Icmyka;

/**
 * Possible formats the the input can be (omits alpha)
 */
export type TFormat =
  | "invalid"
  | "name"
  | "rgb"
  | "hex"
  | "hsl"
  | "hsv"
  | "hwb"
  | "xyz"
  | "lab"
  | "lch"
  | "ryb"
  | "luv"
  | "uvw"
  | "cmyk";

/**
 * Allows parsing of inputs to correctly determine their format & allocate the corresponding
 * channels with proper values (depending on color space)
 */
export type TParser = (color: TInput) => [Irgba, TFormat];

/**
 * Plugins allow the user to extend ColorMaster's core functionality
 */
export type TPlugin = (CM: typeof ColorMaster) => void;
