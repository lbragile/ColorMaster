import { ColorMaster } from "..";
import { TCSSName } from "../enums/colors";

type THexDigit = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";
type THexLower = "a" | "b" | "c" | "d" | "e" | "f";
type THexUpper = "A" | "B" | "C" | "D" | "E" | "F";

/**
 * Possible single or double digit HEX combination
 * @see {@link https://gist.github.com/lbragile/3176be88d6c374e4b69ab86659c03e7c}
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
export interface IColorHarmony {
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
  | Ilab
  | Ilaba
  | Ilch
  | Ilcha
  | Ixyz
  | Ixyza
  | Icmyk
  | Icmyka;

/**
 * Possible formats the the input can be (omits alpha)
 */
export type TFormat = "invalid" | "name" | "rgb" | "hex" | "hsl" | "hsv" | "hwb" | "lab" | "lch" | "xyz" | "cmyk";

/**
 * Allows parsing of inputs to correctly determine their format & allocate the corresponding
 * channels with proper values (depending on color space)
 */
export type TParser = (color: TInput) => [Irgba, TFormat];

/**
 * Plugins allow the user to extend ColorMaster's core functionality
 */
export type TPlugin = (CM: typeof ColorMaster) => void;
