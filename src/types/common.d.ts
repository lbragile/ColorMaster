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
  quotes?: "single" | "double";
  precision?: TNumArr;
}

/**
 * Possible Channels for RGBA and HEXA color space
 */
export type TChannel = "red" | "green" | "blue" | "alpha";

/**
 * Possible Channels for HSLA color space
 */
export type TChannelHSL = "hue" | "saturation" | "lightness" | "alpha";
