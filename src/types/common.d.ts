import { Irgba, Irgb, Ihsla, Ihsl, Ihexa, Ihex } from "../index";
import HEXColors from "../models/hex";
import HSLColors from "../models/hsl";
import RGBColors from "../models/rgb";

/**
 * Array value form when instantiating a RGBA or HSLA object
 */
export type TNumArr = [number, number, number, number?];

/**
 * Array value form when instantiating a HEXA object
 */
export type TStrArr = [string, string, string, string?];

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
 * Simplified type that combines all possible RGBA inputs
 */
export type TRGBAInput = Irgba | Irgb | TNumArr | string;

/**
 * Simplified type that combines all possible HSLA inputs
 */
export type THSLAInput = Ihsla | Ihsl | TNumArr | string;

/**
 * Simplified type that combines all possible HEXA inputs
 */
export type THEXAInput = Ihexa | Ihex | TStrArr | string;

/**
 * Simplified type that combines all possible color space inputs
 */
export type TAllInput = TRGBAInput | THSLAInput | THEXAInput;

/**
 * Simplified type that combines all possible color space instances
 */
export type TAllColors = RGBColors | HEXColors | HSLColors;
