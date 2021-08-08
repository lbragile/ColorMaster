import { RGBExtended } from "./enums/colors";
import { HEXtoRGB, hexaParser } from "./parsers/hex";
import { HSLtoRGB, hslaParser } from "./parsers/hsl";
import { rgbaParser, RGBtoHEX, RGBtoHSL } from "./parsers/rgb";
import { Irgba, TInput, Ihexa, Ihsla, TNumArr, IStringOpts } from "./types/common";
import { clamp, round } from "./utils/numeric";
import { isHEXObject, isHSLObject, isRGBObject } from "./utils/typeGuards";

/**
 * Generates color space instances that ColorMaster interpret.
 * This allows the user to manipulate colors via helpful functions/wrappers.
 *
 * @note If a color's values are not valid, ColorMaster uses "black" or a mixture
 *       with provided values that are valid (in the corresponding colorspace) by default
 */
export class ColorMaster {
  #color: Irgba = { r: 0, g: 0, b: 0, a: 1 };
  #format: "rgb" | "hex" | "hsl" = "rgb";

  constructor(values: TInput) {
    if (values.constructor.name.toLowerCase() === "object") {
      if (isHEXObject(values)) {
        this.#color = HEXtoRGB(values as Ihexa);
        this.#format = "hex";
      } else if (isHSLObject(values)) {
        this.#color = HSLtoRGB(values as Ihsla);
        this.#format = "hsl";
      } else if (isRGBObject(values)) {
        this.#color = values as Irgba;
        this.#format = "rgb";
      }
    } else if (typeof values === "string") {
      const hexaMatch = hexaParser(values);
      const hslaMatch = hslaParser(values);
      const rgbaMatch = rgbaParser(values);

      if (hexaMatch) {
        this.#color = hexaMatch;
        this.#format = "hex";
      } else if (hslaMatch) {
        this.#color = hslaMatch;
        this.#format = "hsl";
      } else if (rgbaMatch) {
        this.#color = rgbaMatch;
        this.#format = "rgb";
      }
    }

    const { r, g, b, a } = this.#color;
    this.#color = { r: clamp(0, r, 255), g: clamp(0, g, 255), b: clamp(0, b, 255), a: clamp(0, a, 1) };
  }

  get red(): number {
    return this.#color.r;
  }

  get blue(): number {
    return this.#color.b;
  }

  get green(): number {
    return this.#color.g;
  }

  get alpha(): number {
    return this.#color.a;
  }

  get hue(): number {
    return RGBtoHSL(this.#color).h;
  }

  get saturation(): number {
    return RGBtoHSL(this.#color).s;
  }

  get lightness(): number {
    return RGBtoHSL(this.#color).l;
  }

  get format(): "rgb" | "hex" | "hsl" {
    return this.#format;
  }

  get array(): Required<TNumArr> {
    return Object.values(this.#color) as Required<TNumArr>;
  }

  rgba(): Irgba {
    return this.#color;
  }

  hsla(): Ihsla {
    return RGBtoHSL(this.#color);
  }

  hexa(): Ihexa {
    return RGBtoHEX(this.#color);
  }

  string({ withAlpha = true, precision = [0, 0, 0, 1] }: IStringOpts = {}): string {
    const [r, g, b, a] = this.array.map((val, i) => round(val, precision[i] ?? 1));
    return withAlpha ? `rgba(${r}, ${g}, ${b}, ${a})` : `rgb(${r}, ${g}, ${b})`;
  }

  name({ exact = true }: { exact?: boolean } = {}): string {
    const { a } = this.#color;

    if (a === 0) return "transparent";

    const rgbStr = this.string({ withAlpha: false });
    const parsedObj = rgbaParser(rgbStr);
    const [keys, values] = Object.entries(RGBExtended);

    let matchStr: string | undefined;
    if (parsedObj) {
      const { r, g, b } = parsedObj;

      if (exact) {
        matchStr = keys.find((key) => RGBExtended[key as keyof typeof RGBExtended] === rgbStr);
      } else {
        let minDist = Number.POSITIVE_INFINITY;
        for (let i = 0; i < values.length; i++) {
          const [Rp, Gp, Bp] = Object.values(rgbaParser(values[i]) as Irgba) as TNumArr;
          const currDist = Math.abs(Rp - r) + Math.abs(Gp - g) + Math.abs(Bp - b);
          if (currDist < minDist) {
            minDist = currDist;
            matchStr = keys[i];
          }
        }
      }
    }

    return matchStr ? matchStr + (a < 1 ? " (with opacity)" : "") : "undefined";
  }

  // random(): RGBColors {
  //   return new RGBColors(random(255), random(255), random(255), Math.random());
  // }

  // fromName(name: keyof typeof RGBExtended): RGBColors {
  //   return new RGBColors(RGBExtended[name]);
  // }
}
