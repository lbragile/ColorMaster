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
    let r = rOrValues ?? 0;

    if (r.constructor.name.toLowerCase() === "object") {
      ({ r, g, b, a } = r as Irgba);
    } else if (Array.isArray(r) || typeof r === "string") {
      if (typeof r === "string" && !r.includes(",")) {
        [r, g, b, a] = [0, g, b, a] as TNumArr;
      } else {
        [r, g, b, a] = (typeof r === "string" ? createColorArrFromStr(r, /(rgba?)?\(|\)/g) : r) as TNumArr;
      }
    }

    return new RGBColors(r as number, g, b, a);
  }

  HSLAFrom(values: THSLAInput): HSLColors;
  HSLAFrom(h: number | keyof typeof HueColors, s: number, l: number, a?: number): HSLColors;
  HSLAFrom(hOrValues: THSLAInput | keyof typeof HueColors | number, s?: number, l?: number, a?: number): HSLColors {
    let h = hOrValues ?? 0;

    if (h.constructor.name.toLowerCase() === "object") {
      ({ h, s, l, a } = h as Ihsla);
    } else if (Array.isArray(h) || typeof h === "string") {
      if (typeof h === "string") {
        const isCSSName = h.match(/^[a-z\s]+$/i);
        const colorStr = isCSSName ? HueColors[h as keyof typeof HueColors] : h;
        [h, s, l, a] = isCSSName
          ? [this.RGBAFrom(colorStr).hue, s, l, a]
          : createColorArrFromStr(colorStr, /(hsla?)?\(|\)|%/g);
      } else {
        [h, s, l, a] = h as TNumArr;
      }
    }

    return new HSLColors(h as number, s, l, a);
  }

  HEXAFrom(values: THEXAInput): HEXColors;
  HEXAFrom(r: string, g: string, b: string, a?: string): HEXColors;
  HEXAFrom(rOrValues: THEXAInput, g?: string, b?: string, a?: string): HEXColors {
    let r = rOrValues ?? "00";

    if (r.constructor.name.toLowerCase() === "object") {
      ({ r, g, b, a } = r as Ihexa);
    } else if (Array.isArray(r) || (typeof r === "string" && r.includes(","))) {
      [r, g, b, a] = (typeof r === "string" ? r.replace(/\(|\s|\)/g, "").split(",") : r) as TStrArr;
    } else if (typeof r === "string" && r[0] === "#") {
      const hex = r.slice(1);
      const hexParts = hex.length >= 6 ? hex.match(/\w\w/gi) : hex.match(/\w/gi)?.map((item) => item.repeat(2));
      [r, g, b, a] = hexParts ?? ["00", "00", "00", "FF"];
    }

    r = r as string;
    return new HEXColors(r.length > 2 ? "00" : r, g, b, a);
  }

  random(): RGBColors {
    const MAX = BOUNDS.RGB_CHANNEL;
    return this.RGBAFrom(random(MAX), random(MAX), random(MAX), Math.random());
  }

  fromName(name: keyof typeof RGBExtended): RGBColors {
    return this.RGBAFrom(RGBExtended[name]);
  }
}
