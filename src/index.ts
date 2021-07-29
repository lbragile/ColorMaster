import HEXColors from "./models/hex";
import HSLColors from "./models/hsl";
import RGBColors from "./models/rgb";
import { TNumArr, TStrArr } from "./types/common";
import { Ihex, Ihexa } from "./types/hex";
import { Ihsl, Ihsla } from "./types/hsl";
import { Irgb, Irgba } from "./types/rgb";

/**
 * Generates color space instances that ColorMaster interpret.
 * This allows the user to manipulate colors via helpful functions/wrappers.
 *
 * @note If a color's values are not valid, ColorMaster uses "black" or a mixture
 *       with provided values that are valid (in the corresponding colorspace) by default
 */
class ColorMaster {
  /**
   * Wrapper for instantiating a RGBColors object
   * @param values -
   * - ```{ Irgb | Irgba }``` → RGBA values as an object
   * - ```{ TNumArr }``` → RGBA values as an array of values
   * - ```{ string }``` →  A CSS string representation of an rgb or rgba color
   *
   * @example { Irgb | Irgba } → { r: 128, g: 128, b: 128, a: 0.5 }
   * @example { TNumArr } → [128, 128, 128, 0.5]
   * @example { string } → 'rgba(128, 128, 128, 0.5)'
   *
   * @see {@link https://www.typescriptlang.org/docs/handbook/2/functions.html#function-overloads} for function overloading in TS
   * @returns An RGBColors object instance
   */
  RGBAFrom(values: Irgb | Irgba | TNumArr | string): RGBColors;

  /**
   * Wrapper for instantiating a RGBColors object
   * @param r red channel → [0, 255]
   * @param g green channel → [0, 255]
   * @param b blue channel → [0, 255]
   * @param a alpha channel → [0, 1]
   *
   * @see {@link https://www.typescriptlang.org/docs/handbook/2/functions.html#function-overloads} for function overloading in TS
   * @returns An RGBColors object instance
   */
  RGBAFrom(r: number, g: number, b: number, a?: number): RGBColors;

  RGBAFrom(rOrValues: Irgba | Irgb | TNumArr | number | string, g?: number, b?: number, a?: number): RGBColors {
    if (rOrValues.constructor.name.toLowerCase() === "object") {
      const { r, g, b, a } = rOrValues as Irgba;
      return new RGBColors(r, g, b, a);
    } else if (Array.isArray(rOrValues) || typeof rOrValues === "string") {
      const [r, g, b, a] = (
        typeof rOrValues === "string"
          ? rOrValues
              .replace(/(rgba?)?\(|\)/g, "")
              .split(",")
              .map((val) => +val)
          : rOrValues
      ) as TNumArr;
      return new RGBColors(r, g, b, a);
    } else {
      return new RGBColors(rOrValues as number, g as number, b as number, a);
    }
  }

  /**
   * Wrapper for instantiating a HSLColors object
   * @param values -
   * - ```{ Ihsl | Ihsla }``` → HSLA values as an object
   * - ```{ TNumArr }``` → HSLA values as an array of values
   * - ```{ string }``` →  A CSS string representation of an hsl or hsla color
   *
   * @example { Ihsl | Ihsla } → { h: 0, s: 0, l: 50.2, a: 0.5 }
   * @example { TNumArr } → [0, 0, 50.2, 0.5]
   * @example { string } → 'hsla(0, 0%, 50%, 0.5)'
   *
   * @see {@link https://www.typescriptlang.org/docs/handbook/2/functions.html#function-overloads} for function overloading in TS
   * @returns An HSLColors object instance
   */
  HSLAFrom(values: Ihsl | Ihsla | number[] | string): HSLColors;

  /**
   * Wrapper for instantiating a HSLColors object
   * @param h hue channel → [0, 359]
   * @param s saturation channel → [0, 100]
   * @param l lightness channel → [0, 100]
   * @param a alpha channel → [0, 1]
   *
   * @see {@link https://www.typescriptlang.org/docs/handbook/2/functions.html#function-overloads} for function overloading in TS
   * @returns An HSLColors object instance
   */
  HSLAFrom(h: number, s: number, l: number, a?: number): HSLColors;

  HSLAFrom(hOrValues: Ihsla | Ihsl | number[] | number | string, s?: number, l?: number, a?: number): HSLColors {
    if (hOrValues.constructor.name.toLowerCase() === "object") {
      const { h, s, l, a } = hOrValues as Ihsla;
      return new HSLColors(h, s, l, a);
    } else if (Array.isArray(hOrValues) || typeof hOrValues === "string") {
      const [h, s, l, a] = (
        typeof hOrValues === "string"
          ? hOrValues
              .replace(/(hsla?)?\(|\)|%/g, "")
              .split(",")
              .map((val) => +val)
          : hOrValues
      ) as TNumArr;
      return new HSLColors(h, s, l, a);
    } else {
      return new HSLColors(hOrValues as number, s as number, l as number, a);
    }
  }

  /**
   * Wrapper for instantiating a HEXColors object
   * @param values -
   * - ```{ Ihex | Ihexa }``` → HEXA values as an object
   * - ```{ TStrArr }``` → HEXA values as an array of values
   * - ```{ string }``` →  A CSS string representation of an hex or hexa color
   *
   * @example { Ihex | Ihexa } → { r: "66", g: "77", b: "88", a: "99" }
   * @example { TStrArr } → ["66", "77", "88", "99"]
   * @example { string } → '#66778899'
   *
   * @see {@link https://www.typescriptlang.org/docs/handbook/2/functions.html#function-overloads} for function overloading in TS
   * @returns An HEXColors object instance
   */
  HEXAFrom(values: Ihex | Ihexa | TStrArr | string): HEXColors;

  /**
   * Wrapper for instantiating a HEXColors object
   * @param r red channel → ["00", "FF"]
   * @param g green channel → ["00", "FF"]
   * @param b blue channel → ["00", "FF"]
   * @param a alpha channel → ["00", "FF"]
   *
   * @see {@link https://www.typescriptlang.org/docs/handbook/2/functions.html#function-overloads} for function overloading in TS
   * @returns An HEXColors object instance
   */
  HEXAFrom(r: string, g: string, b: string, a?: string): HEXColors;

  HEXAFrom(rOrValues: Ihex | Ihexa | TStrArr | string, g?: string, b?: string, a?: string): HEXColors {
    if (rOrValues.constructor.name.toLowerCase() === "object") {
      const { r, g, b, a } = rOrValues as Ihexa;
      return new HEXColors(r, g, b, a);
    } else if (Array.isArray(rOrValues) || (typeof rOrValues === "string" && rOrValues.includes(","))) {
      const [r, g, b, a] = (
        typeof rOrValues === "string" ? rOrValues.replace(/\(|\s|\)/g, "").split(",") : rOrValues
      ) as TStrArr;
      return new HEXColors(r, g, b, a);
    } else if (typeof rOrValues === "string" && rOrValues[0] === "#") {
      const hex = rOrValues.slice(1);
      const hexParts = hex.length >= 6 ? hex.match(/\w\w/gi) : hex.match(/\w/gi)?.map((item) => item.repeat(2));
      const [r, g, b, a] = hexParts ?? ["00", "00", "00", "FF"];
      return new HEXColors(r, g, b, a);
    } else {
      return new HEXColors(rOrValues as string, g as string, b as string, a);
    }
  }
}

const CM = new ColorMaster();
export default CM;

export { IStringOpts, TChannel, TChannelHSL, TOperator, TNumArr, TStrArr } from "./types/common";
export { Irgb, Irgba } from "./types/rgb";
export { Ihex, Ihexa } from "./types/hex";
export { Ihsl, Ihsla } from "./types/hsl";
