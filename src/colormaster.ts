import { HueColors } from "./enums/colors";
import { hexaParser } from "./parsers/hex";
import { hslaParser, HSLtoRGB } from "./parsers/hsl";
import { LCHtoRGB } from "./parsers/lch";
import { rgbaParser, RGBtoHEX, RGBtoHSL, RGBtoLCH } from "./parsers/rgb";
import {
  IAlphaInvert,
  IColorMaster,
  Ihexa,
  Ihsla,
  Irgba,
  IStringOpts,
  TFormat,
  TInput,
  TNumArr
} from "./types/colormaster";
import { adjustHue, clamp, rng, round } from "./utils/numeric";

/**
 * Generates color space instances that ColorMaster interpret.
 * This allows the user to manipulate colors via helpful functions/wrappers.
 *
 * @note If a color's values are not valid, ColorMaster uses "black" or a mixture
 *       with provided values that are valid (in the corresponding colorspace) by default
 */
export class ColorMaster implements IColorMaster {
  #color: Irgba = { r: 0, g: 0, b: 0, a: 1 };
  #format: TFormat = "rgb";
  #parsers = [rgbaParser, hexaParser, hslaParser];

  constructor(color: TInput) {
    const result = this.#parsers.map((parser) => parser(color)).find((parsedArr) => parsedArr[1] !== "invalid");
    if (result) {
      const { r, g, b, a } = result[0];
      this.#format = result[1];
      this.#color = { r: clamp(0, r, 255), g: clamp(0, g, 255), b: clamp(0, b, 255), a: clamp(0, a, 1) };
    } else {
      this.#format = "invalid";
    }
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

  get format(): TFormat {
    return this.#format;
  }

  get array(): Required<TNumArr> {
    return Object.values(this.#color) as Required<TNumArr>;
  }

  isValid(): boolean {
    return this.#format !== "invalid";
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

  stringHEX({ withAlpha = true }: IStringOpts = {}): string {
    const [r, g, b, a] = Object.values(this.hexa()).map((val) => val.toUpperCase());
    return `#${r}${g}${b}${withAlpha ? a : ""}`;
  }

  stringHSL({ withAlpha = true, precision = [0, 0, 0, 1] }: IStringOpts = {}): string {
    const [h, s, l, a] = Object.values(this.hsla()).map((val, i) => round(val, precision[i] ?? 1));
    return withAlpha ? `hsla(${adjustHue(h)}, ${s}%, ${l}%, ${a})` : `hsl(${adjustHue(h)}, ${s}%, ${l}%)`;
  }

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

  mix(color: TInput, ratio = 0.5): ColorMaster {
    ratio = clamp(0, ratio, 1);

    const lcha1 = Object.values(RGBtoLCH(this.rgba()));
    const lcha2 = Object.values(RGBtoLCH(new ColorMaster(color).rgba()));

    const [l, c, h, a] = lcha1.map((val, i) => val * (1 - ratio) + lcha2[i] * ratio);

    return new ColorMaster(LCHtoRGB({ l, c, h, a }));
  }
}

/**
 * Generates a random RGBA color which can then be converted into any color space
 * @returns A random RGBA color instance that is properly bounded
 */
export function random(): ColorMaster {
  return new ColorMaster({ r: rng(255), g: rng(255), b: rng(255), a: Math.random() });
}

export default (color: TInput): ColorMaster => new ColorMaster(color);
