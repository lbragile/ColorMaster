import { HueColors } from "./enums/colors";
import { HEXtoRGB, hexaParser } from "./parsers/hex";
import { HSLtoRGB, hslaParser } from "./parsers/hsl";
import { rgbaParser, RGBtoHEX, RGBtoHSL } from "./parsers/rgb";
import { IColorMaster } from "./types/colormaster";
import {
  Irgba,
  TInput,
  Ihexa,
  Ihsla,
  TNumArr,
  IStringOpts,
  IAlphaInvert,
  THarmony,
  IMonochromatic
} from "./types/common";
import { clamp, round } from "./utils/numeric";
import { isHEXObject, isHSLObject, isRGBObject } from "./utils/typeGuards";

/**
 * Generates color space instances that ColorMaster interpret.
 * This allows the user to manipulate colors via helpful functions/wrappers.
 *
 * @note If a color's values are not valid, ColorMaster uses "black" or a mixture
 *       with provided values that are valid (in the corresponding colorspace) by default
 */
export class ColorMaster implements IColorMaster {
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

  stringRGB({ withAlpha = true, precision = [0, 0, 0, 1] }: IStringOpts = {}): string {
    const [r, g, b, a] = this.array.map((val, i) => round(val, precision[i] ?? 1));
    return withAlpha ? `rgba(${r}, ${g}, ${b}, ${a})` : `rgb(${r}, ${g}, ${b})`;
  }

  stringHEX({ withAlpha = true, precision = [0, 0, 0, 1] }: IStringOpts = {}): string {
    const [r, g, b, a] = this.array.map((val, i) => round(val, precision[i] ?? 1));
    return `#${r}${g}${b}${withAlpha ? a : ""}`;
  }

  stringHSL({ withAlpha = true, precision = [0, 0, 0, 1] }: IStringOpts = {}): string {
    const [h, s, l, a] = this.array.map((val, i) => round(val, precision[i] ?? 1));
    return withAlpha ? `hsla(${h}, ${s}%, ${l}%, ${a})` : `hsl(${h}, ${s}%, ${l}%)`;
  }

  // changeValueTo(channel: TChannelHSL, value: number): HSLColors {
  //   value = channel === "hue" ? value % 360 : clampNum(0, value, channel === "alpha" ? 1 : BOUNDS.HSL_LIGHTNESS);
  //   this.object = { ...this.object, [channel[0]]: value };
  //   return this;
  // }

  // changeValueBy(channel: TChannelHSL, delta: number): HSLColors {
  //   const firstChannelLetter = channel[0] as keyof Ihsla;
  //   const currVal = this.object[firstChannelLetter] + delta;
  //   const value =
  //     channel === "hue" ? currVal % 360 : clampNum(0, currVal, channel === "alpha" ? 1 : BOUNDS.HSL_LIGHTNESS);
  //   this.object[channel[0] as keyof Ihsla] = value < 0 ? value + 360 : value;
  //   return this;
  // }

  hueTo(value: number | keyof typeof HueColors): ColorMaster {
    const { h, s, l, a } = this.hsla();
    const newHue = typeof value === "number" ? clamp(0, value, 359) : Number(HueColors[value].match(/\d{1,3}/) ?? h);
    this.#color = HSLtoRGB({ h: newHue, s, l, a });
    return this;
  }

  hueBy(delta: number): ColorMaster {
    const { h, s, l, a } = this.hsla();
    this.#color = HSLtoRGB({ h: clamp(0, h + delta, 359), s, l, a });
    return this;
  }

  saturateBy(delta: number): ColorMaster {
    const { h, s, l, a } = this.hsla();
    this.#color = HSLtoRGB({ h, s: clamp(0, s + delta, 100), l, a });
    return this;
  }

  desaturateBy(delta: number): ColorMaster {
    return this.saturateBy(-1 * delta);
  }

  lighterBy(delta: number): ColorMaster {
    const { h, s, l, a } = this.hsla();
    this.#color = HSLtoRGB({ h, s, l: clamp(0, l + delta, 100), a });
    return this;
  }

  darkerBy(delta: number): ColorMaster {
    return this.lighterBy(-1 * delta);
  }

  alphaTo(value: number): ColorMaster {
    this.#color = { ...this.#color, a: clamp(0, value, 1) };
    return this;
  }

  alphaBy(delta: number): ColorMaster {
    this.#color = { ...this.#color, a: clamp(0, this.#color.a + delta, 1) };
    return this;
  }

  invert({ includeAlpha = false }: IAlphaInvert = {}): ColorMaster {
    const { r, g, b, a } = this.#color;
    this.#color = { r: 255 - r, g: 255 - g, b: 255 - b, a: includeAlpha ? 1 - a : a };
    return this;
  }

  grayscale(): ColorMaster {
    return this.desaturateBy(100);
  }

  rotate(value: number): ColorMaster {
    return this.hueBy(value);
  }

  harmony(type: THarmony = "analogous", { effect = "tones", amount = 5 }: IMonochromatic = {}): ColorMaster[] {
    const { h, s, l, a } = this.hsla();

    // at most 10 harmony elements for monochromatic
    if (type === "monochromatic") {
      amount = clamp(2, amount, 10);
    }

    switch (type) {
      case "analogous":
        return [-30, 0, 30].map((angle) => new ColorMaster({ h: h + angle, s, l, a }));

      case "complementary":
        return [0, 180].map((angle) => new ColorMaster({ h: h + angle, s, l, a }));

      case "split-complementary": // aka compound
        return [0, 150, 210].map((angle) => new ColorMaster({ h: h + angle, s, l, a }));

      case "double-split-complementary":
        return [-30, 0, 30, 150, 210].map((angle) => new ColorMaster({ h: h + angle, s, l, a }));

      case "triad":
        return [0, 120, 240].map((angle) => new ColorMaster({ h: h + angle, s, l, a }));

      case "rectangle":
        return [0, 60, 180, 240].map((angle) => new ColorMaster({ h: h + angle, s, l, a }));

      case "square":
        return [0, 90, 180, 270].map((angle) => new ColorMaster({ h: h + angle, s, l, a }));

      case "monochromatic": {
        // tones uses saturation, tints/shades use lightness
        const valueToAdjust = effect === "tones" ? s : l;

        // form array of n (amount) evenly spaced items from current saturation/lightness to min/max value
        let delta = (effect === "tints" ? 100 - valueToAdjust : valueToAdjust) / amount;
        delta = effect === "tints" ? delta : -1 * delta;

        const valArr: number[] = [valueToAdjust];
        for (let i = 0; i < amount; i++) {
          valArr.push(valArr[i] + delta);
        }

        return effect === "tones"
          ? valArr.map((sat) => new ColorMaster({ h, s: sat, l, a }))
          : valArr.map((light) => new ColorMaster({ h, s, l: light, a }));
      }

      // no default
    }
  }
}
