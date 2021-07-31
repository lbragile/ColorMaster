import { BOUNDS } from "./enums/bounds";
import HEXColors from "./models/hex";
import HSLColors from "./models/hsl";
import RGBColors from "./models/rgb";
import { TAllColors, THEXAInput, THSLAInput, TNumArr, TRGBAInput, TStrArr } from "./types/common";
import { Ihexa } from "./types/hex";
import { Ihsla } from "./types/hsl";
import { Irgba } from "./types/rgb";
import { random } from "./utils/numeric";

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
  RGBAFrom(values: TRGBAInput): RGBColors;

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

  RGBAFrom(rOrValues: TRGBAInput | number, g?: number, b?: number, a?: number): RGBColors {
    let r = rOrValues;

    if (rOrValues.constructor.name.toLowerCase() === "object") {
      ({ r, g, b, a } = rOrValues as Irgba);
    } else if (Array.isArray(rOrValues) || typeof rOrValues === "string") {
      [r, g, b, a] = (
        typeof rOrValues === "string"
          ? rOrValues
              .replace(/(rgba?)?\(|\)/g, "")
              .split(",")
              .map((val) => +val)
          : rOrValues
      ) as TNumArr;
    }

    return new RGBColors(r as number, g, b, a);
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
  HSLAFrom(values: THSLAInput): HSLColors;

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

  HSLAFrom(hOrValues: THSLAInput | number, s?: number, l?: number, a?: number): HSLColors {
    let h = hOrValues;

    if (hOrValues.constructor.name.toLowerCase() === "object") {
      ({ h, s, l, a } = hOrValues as Ihsla);
    } else if (Array.isArray(hOrValues) || typeof hOrValues === "string") {
      [h, s, l, a] = (
        typeof hOrValues === "string"
          ? hOrValues
              .replace(/(hsla?)?\(|\)|%/g, "")
              .split(",")
              .map((val) => +val)
          : hOrValues
      ) as TNumArr;
    }

    return new HSLColors(h as number, s, l, a);
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
  HEXAFrom(values: THEXAInput): HEXColors;

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

  HEXAFrom(rOrValues: THEXAInput, g?: string, b?: string, a?: string): HEXColors {
    let r = rOrValues;

    if (rOrValues.constructor.name.toLowerCase() === "object") {
      ({ r, g, b, a } = rOrValues as Ihexa);
    } else if (Array.isArray(rOrValues) || (typeof rOrValues === "string" && rOrValues.includes(","))) {
      [r, g, b, a] = (
        typeof rOrValues === "string" ? rOrValues.replace(/\(|\s|\)/g, "").split(",") : rOrValues
      ) as TStrArr;
    } else if (typeof rOrValues === "string" && rOrValues[0] === "#") {
      const hex = rOrValues.slice(1);
      const hexParts = hex.length >= 6 ? hex.match(/\w\w/gi) : hex.match(/\w/gi)?.map((item) => item.repeat(2));
      [r, g, b, a] = hexParts ?? ["00", "00", "00", "FF"];
    }

    return new HEXColors(r as string, g, b, a);
  }

  random(): TAllColors {
    const MAX = BOUNDS.RGB_CHANNEL;
    let randomColor: TAllColors = new RGBColors(random(MAX), random(MAX), random(MAX), Math.random());

    switch (Math.floor(Math.random() * 3)) {
      case 0:
        randomColor = randomColor.hex();
        break;

      case 1:
        randomColor = randomColor.hsl();
        break;

      default:
        break;
    }

    return randomColor;
  }
}

const CM = new ColorMaster();
export default CM;

export {
  TNumArr,
  TStrArr,
  TOperator,
  IStringOpts,
  IA11yOpts,
  IReadable,
  IAlphaInvert,
  TChannel,
  TChannelHSL,
  TRGBAInput,
  THSLAInput,
  THEXAInput,
  TAllInput,
  TAllColors
} from "./types/common";
export { Irgb, Irgba } from "./types/rgb";
export { Ihex, Ihexa } from "./types/hex";
export { Ihsl, Ihsla } from "./types/hsl";
