import { HueColors, RGBExtended } from "../enums/colors";
import HEXColors from "../models/hex";
import HSLColors from "../models/hsl";
import RGBColors from "../models/rgb";
import { THEXAInput, THSLAInput, TRGBAInput } from "./common";

export interface IColorMaster {
  /**
   * Wrapper for instantiating a RGBColors object
   *
   * @param {!number} r red channel → [0, 255]
   * @param {!number} g green channel → [0, 255]
   * @param {!number} b blue channel → [0, 255]
   * @param {?number} a alpha channel → [0, 1]
   *
   * @see {@link https://www.typescriptlang.org/docs/handbook/2/functions.html#function-overloads} for function overloading in TS
   * @returns {RGBColors} An RGBColors object instance
   */ /**
   * Wrapper for instantiating a RGBColors object
   *
   * @param {TRGBAInput} values -
   * - ```Irgb | Irgba``` → RGBA values as an object
   * - ```TNumArr``` → RGBA values as an array of values
   * - ```string``` →  A CSS string representation of an rgb or rgba color
   *
   * @example Irgb | Irgba → { r: 128, g: 128, b: 128, a: 0.5 }
   * @example TNumArr → [128, 128, 128, 0.5]
   * @example string → 'rgba(128, 128, 128, 0.5)'
   *
   * @see {@link https://www.typescriptlang.org/docs/handbook/2/functions.html#function-overloads} for function overloading in TS
   * @returns {RGBColors} An RGBColors object instance
   */
  RGBAFrom(rOrValues: TRGBAInput | number, g?: number, b?: number, a?: number): RGBColors;

  /**
   * Wrapper for instantiating a HSLColors object
   *
   * @param {!number} h hue channel → [0, 359]
   * @param {!number} s saturation channel → [0, 100]
   * @param {!number} l lightness channel → [0, 100]
   * @param {?number} a alpha channel → [0, 1]
   *
   * @see {@link https://www.typescriptlang.org/docs/handbook/2/functions.html#function-overloads} for function overloading in TS
   * @returns {HSLColors} An HSLColors object instance
   */ /**
   * Wrapper for instantiating a HSLColors object
   *
   * @param {keyof typeof HueColors} h CSS/HTML Name
   * @param {!number} s saturation channel → [0, 100]
   * @param {!number} l lightness channel → [0, 100]
   * @param {?number} a alpha channel → [0, 1]
   *
   * @see {@link https://www.typescriptlang.org/docs/handbook/2/functions.html#function-overloads} for function overloading in TS
   * @returns {HSLColors} An HSLColors object instance
   */ /**
   * Wrapper for instantiating a HSLColors object
   *
   * @param {THSLAInput} values -
   * - ```Ihsl | Ihsla``` → HSLA values as an object
   * - ```TNumArr``` → HSLA values as an array of values
   * - ```string``` →  A CSS string representation of an hsl or hsla color
   *
   * @example Ihsl | Ihsla → { h: 0, s: 0, l: 50.2, a: 0.5 }
   * @example TNumArr → [0, 0, 50.2, 0.5]
   * @example string → 'hsla(0, 0%, 50%, 0.5)'
   *
   * @see {@link https://www.typescriptlang.org/docs/handbook/2/functions.html#function-overloads} for function overloading in TS
   * @returns {HSLColors} An HSLColors object instance
   */
  HSLAFrom(hOrValues: THSLAInput | keyof typeof HueColors | number, s?: number, l?: number, a?: number): HSLColors;

  /**
   * Wrapper for instantiating a HEXColors object
   *
   * @param {!number} r red channel → ["00", "FF"]
   * @param {!number} g green channel → ["00", "FF"]
   * @param {!number} b blue channel → ["00", "FF"]
   * @param {?number}a alpha channel → ["00", "FF"]
   *
   * @see {@link https://www.typescriptlang.org/docs/handbook/2/functions.html#function-overloads} for function overloading in TS
   * @returns An HEXColors object instance
   */ /**
   * Wrapper for instantiating a HEXColors object
   *
   * @param {THEXAInput} values -
   * - ```Ihex | Ihexa``` → HEXA values as an object
   * - ```TStrArr``` → HEXA values as an array of values
   * - ```string``` →  A CSS string representation of an hex or hexa color
   *
   * @example Ihex | Ihexa → { r: "66", g: "77", b: "88", a: "99" }
   * @example TStrArr → ["66", "77", "88", "99"]
   * @example string → '#66778899'
   *
   * @see {@link https://www.typescriptlang.org/docs/handbook/2/functions.html#function-overloads} for function overloading in TS
   * @returns An HEXColors object instance
   */
  HEXAFrom(rOrValues: THEXAInput, g?: string, b?: string, a?: string): HEXColors;

  /**
   * Generates a random RGBA color which can then be converted into any color space
   * @returns A random RGBA color instance that is properly bounded
   */
  random(): RGBColors;

  /**
   * Generates an RGBA color from an input CSS/HTML name
   * @param name CSS/HTML color name to find
   *
   * @see {@link https://www.rapidtables.com/web/color/RGB_Color.html} for list of names
   * @returns The RGBA color instance corresponding to the `name`
   */
  fromName(name: keyof typeof RGBExtended): RGBColors;
}
