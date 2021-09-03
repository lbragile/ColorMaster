import {
  RGBtoCMYK,
  RGBtoHSL,
  RGBtoHSV,
  RGBtoHWB,
  RGBtoLAB,
  RGBtoLCH,
  RGBtoLUV,
  RGBtoRYB,
  RGBtoUVW,
  RGBtoXYZ
} from "../conversions/rgb";
import { IMix, TInput, TPlugin } from "../types";
import { clamp } from "../utils/numeric";
import { HSLtoRGB } from "../conversions/hsl";
import { HSVtoRGB } from "../conversions/hsv";
import { XYZtoRGB } from "../conversions/xyz";
import { LCHtoRGB } from "../conversions/lch";
import { LABtoRGB } from "../conversions/lab";
import { LUVtoRGB } from "../conversions/luv";
import { HWBtoRGB } from "../conversions/hwb";
import { RYBtoRGB } from "../conversions/ryb";
import { UVWtoRGB } from "../conversions/uvw";
import { CMYKtoRGB } from "../conversions/cmyk";

declare module ".." {
  interface ColorMaster {
    /**
     * Mix current color instance with another based on a given ratio (done in LUVA space by default for best results)
     *
     * @param opts -
     * - color → The color to mix with the current color instance
     * - ratio → The proportions to use when mixing
     * - colorspace → Which colorspace to mix in
     *
     * @note Not specifying a ratio will cause equal proportions of colors to be mixed
     *
     * @example CM("#000").mix('#fff', 0.2) → "mix 20% of white INTO 80% of the current color (black)"
     *
     * @default { color: "#fff", ratio: 0.5, colorspace: "luv" }
     * @returns A new color instance corresponding to the new mixture
     */
    mix(opts?: IMix): ColorMaster;
  }
}

const MixPlugin: TPlugin = (CM): void => {
  CM.prototype.mix = function ({ color = "#fff", ratio = 0.5, colorspace = "luv" } = {}) {
    const currentColor = this.rgba();
    const mixColor = (color instanceof CM ? color : new CM(color as TInput)).rgba();

    ratio = clamp(0, ratio, 1);

    let color1: number[], color2: number[];
    switch (colorspace) {
      case "hsl": {
        color1 = Object.values(RGBtoHSL(currentColor));
        color2 = Object.values(RGBtoHSL(mixColor));
        break;
      }

      case "hsv": {
        color1 = Object.values(RGBtoHSV(currentColor));
        color2 = Object.values(RGBtoHSV(mixColor));
        break;
      }

      case "hwb": {
        color1 = Object.values(RGBtoHWB(currentColor));
        color2 = Object.values(RGBtoHWB(mixColor));
        break;
      }

      case "lab": {
        color1 = Object.values(RGBtoLAB(currentColor));
        color2 = Object.values(RGBtoLAB(mixColor));
        break;
      }

      case "lch": {
        color1 = Object.values(RGBtoLCH(currentColor));
        color2 = Object.values(RGBtoLCH(mixColor));
        break;
      }

      case "luv": {
        color1 = Object.values(RGBtoLUV(currentColor));
        color2 = Object.values(RGBtoLUV(mixColor));
        break;
      }

      case "ryb": {
        color1 = Object.values(RGBtoRYB(currentColor));
        color2 = Object.values(RGBtoRYB(mixColor));
        break;
      }

      case "uvw": {
        color1 = Object.values(RGBtoUVW(currentColor));
        color2 = Object.values(RGBtoUVW(mixColor));
        break;
      }

      case "xyz": {
        color1 = Object.values(RGBtoXYZ(currentColor));
        color2 = Object.values(RGBtoXYZ(mixColor));
        break;
      }

      case "cmyk": {
        color1 = Object.values(RGBtoCMYK(currentColor));
        color2 = Object.values(RGBtoCMYK(mixColor));
        break;
      }

      case "hex": // fall-through (same as RGB)
      default: {
        color1 = Object.values(currentColor);
        color2 = Object.values(mixColor);
        break;
      }
    }

    // cmyka has 5 components
    const [first, second, third, forth, fifth] = color1.map((_, i) => color1[i] * (1 - ratio) + color2[i] * ratio);

    switch (colorspace) {
      case "hsl":
        return new CM(HSLtoRGB({ h: first, s: second, l: third, a: forth }));

      case "hsv":
        return new CM(HSVtoRGB({ h: first, s: second, v: third, a: forth }));

      case "hwb":
        return new CM(HWBtoRGB({ h: first, w: second, b: third, a: forth }));

      case "lab":
        return new CM(LABtoRGB({ l: first, a: second, b: third, alpha: forth }));

      case "lch":
        return new CM(LCHtoRGB({ l: first, c: second, h: third, a: forth }));

      case "luv":
        return new CM(LUVtoRGB({ l: first, u: second, v: third, a: forth }));

      case "ryb":
        return new CM(RYBtoRGB({ r: first, y: second, b: third, a: forth }));

      case "uvw":
        return new CM(UVWtoRGB({ u: first, v: second, w: third, a: forth }));

      case "xyz":
        return new CM(XYZtoRGB({ x: first, y: second, z: third, a: forth }));

      case "cmyk":
        return new CM(CMYKtoRGB({ c: first, m: second, y: third, k: forth, a: fifth }));

      case "hex": // fall-through (same as RGB)
      default:
        return new CM({ r: first, g: second, b: third, a: forth });
    }
  };
};

export default MixPlugin;
