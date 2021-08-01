import { IColorMaster } from "./types/colormaster";
import { BOUNDS } from "./enums/bounds";
import { HueColors, RGBExtended } from "./enums/colors";
import HEXColors from "./models/hex";
import HSLColors from "./models/hsl";
import RGBColors from "./models/rgb";
import { THEXAInput, THSLAInput, TNumArr, TRGBAInput, TStrArr } from "./types/common";
import { Ihexa } from "./types/hex";
import { Ihsla } from "./types/hsl";
import { Irgba } from "./types/rgb";
import { random } from "./utils/numeric";
import { createColorArrFromStr } from "./utils/string";

/**
 * Generates color space instances that ColorMaster interpret.
 * This allows the user to manipulate colors via helpful functions/wrappers.
 *
 * @note If a color's values are not valid, ColorMaster uses "black" or a mixture
 *       with provided values that are valid (in the corresponding colorspace) by default
 */
export class ColorMaster implements IColorMaster {
  RGBAFrom(values: TRGBAInput): RGBColors;
  RGBAFrom(r: number, g: number, b: number, a?: number): RGBColors;
  RGBAFrom(rOrValues: TRGBAInput | number, g?: number, b?: number, a?: number): RGBColors {
    let r = rOrValues;

    if (rOrValues.constructor.name.toLowerCase() === "object") {
      ({ r, g, b, a } = rOrValues as Irgba);
    } else if (Array.isArray(rOrValues) || typeof rOrValues === "string") {
      [r, g, b, a] = (
        typeof rOrValues === "string" ? createColorArrFromStr(rOrValues, /(rgba?)?\(|\)/g) : rOrValues
      ) as TNumArr;
    }

    return new RGBColors(r as number, g, b, a);
  }

  HSLAFrom(values: THSLAInput): HSLColors;
  HSLAFrom(h: number, s: number, l: number, a?: number): HSLColors;
  HSLAFrom(h: keyof typeof HueColors, s: number, l: number, a?: number): HSLColors;
  HSLAFrom(hOrValues: THSLAInput | keyof typeof HueColors | number, s?: number, l?: number, a?: number): HSLColors {
    let h = hOrValues;

    if (hOrValues.constructor.name.toLowerCase() === "object") {
      ({ h, s, l, a } = hOrValues as Ihsla);
    } else if (Array.isArray(hOrValues) || typeof hOrValues === "string") {
      if (typeof hOrValues === "string") {
        const isCSSName = hOrValues.match(/^[a-z\s]+$/i);
        const colorStr = isCSSName ? HueColors[hOrValues as keyof typeof HueColors] : hOrValues;
        [h, s, l, a] = isCSSName
          ? [this.RGBAFrom(colorStr).hue, s, l, a]
          : createColorArrFromStr(colorStr, /(hsla?)?\(|\)|%/g);
      } else {
        [h, s, l, a] = hOrValues as TNumArr;
      }
    }

    return new HSLColors(h as number, s, l, a);
  }

  HEXAFrom(values: THEXAInput): HEXColors;
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

  random(): RGBColors {
    const MAX = BOUNDS.RGB_CHANNEL;
    return this.RGBAFrom(random(MAX), random(MAX), random(MAX), Math.random());
  }

  fromName(name: keyof typeof RGBExtended): RGBColors {
    return this.RGBAFrom(RGBExtended[name]);
  }
}
