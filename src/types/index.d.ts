import { ColorMaster } from "..";
import { RGBExtended } from "../enums/colors";

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
  | string
  | Irgb
  | Irgba
  | Ihex
  | Ihexa
  | Ihsl
  | Ihsla
  | Ihsv
  | Ihsva
  | Ixyz
  | Ixyza
  | Ilab
  | Ilaba
  | Ilch
  | Ilcha;

/**
 * Possible formats the the input can be (omits alpha)
 */
export type TFormat = "invalid" | "name" | "rgb" | "hex" | "hsl" | "xyz" | "lab" | "lch";

/**
 * Allows parsing of inputs to correctly determine their format & allocate the corresponding
 * channels with proper values (depending on color space)
 */
export type TParser = (color: TInput | keyof typeof RGBExtended) => [Irgba, TFormat];

/**
 * Plugins allow the user to extend ColorMaster's core functionality
 */
export type TPlugin = (CM: typeof ColorMaster) => void;
