import { Irgba, TFormat, TParser, TInput, Ihsla, Ihexa, TPlugin, TNumArr } from "./types";
import { IColorMaster } from "./types/colormaster";
import { HueColors } from "./enums/colors";
import { adjustHue, clamp, rng, round } from "./utils/numeric";
import { RGBtoHEX, RGBtoHSL } from "./conversions/rgb";
import { HSLtoRGB } from "./conversions/hsl";
import { hexaParser } from "./parsers/hex";
import { hslaParser } from "./parsers/hsl";
import { rgbaParser } from "./parsers/rgb";

/**
 * Generates color space instances that ColorMaster interpret.
 * This allows the user to manipulate colors via helpful functions/wrappers.
 *
 * @note If a color's values are not valid, ColorMaster uses "black" or a mixture
 *       with provided values that are valid (in the corresponding colorspace) by default.
 *       Additionally, ColorMaster works in RGBA space internally by default and only converts to other color
 *       spaces as necessary. For example, printing a string requires conversion to the correct color space.
 *       On that end, it is also easier to work with HSLA space when performing rotation and other hue related adjustments.
 *       This approach ensures the highest possible accuracy when converting to other color spaces.
 */
export class ColorMaster implements IColorMaster {
  #color: Irgba = { r: 0, g: 0, b: 0, a: 1 };
  #format: TFormat = "rgb";
  static Parsers: TParser[] = [rgbaParser, hexaParser, hslaParser];

  constructor(color: TInput) {
    const result = ColorMaster.Parsers.map((parser) => parser(color)).find((parsedArr) => parsedArr[1] !== "invalid");
    if (result) {
      [this.#color, this.#format] = result;
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

  isValid(): boolean {
    return this.#format !== "invalid";
  }

  rgba(): Irgba {
    return this.#color;
  }

  hsla(): Ihsla {
    return RGBtoHSL(this.#color);
  }

  hexa({ round = false } = {}): Ihexa {
    return RGBtoHEX(this.#color, round);
  }

  stringRGB({ alpha = true, precision = [0, 0, 0, 1] as Required<TNumArr> } = {}): string {
    const [r, g, b, a] = Object.values(this.#color).map((val, i) => round(val, precision[i]));
    return alpha ? `rgba(${r}, ${g}, ${b}, ${a})` : `rgb(${r}, ${g}, ${b})`;
  }

  stringHEX({ alpha = true } = {}): string {
    const [r, g, b, a] = Object.values(this.hexa({ round: true }));
    return `#${r}${g}${b}${alpha ? a : ""}`;
  }

  stringHSL({ alpha = true, precision = [0, 0, 0, 1] as Required<TNumArr> } = {}): string {
    const [h, s, l, a] = Object.values(this.hsla()).map((val, i) => round(val, precision[i]));
    return alpha ? `hsla(${h}, ${s}%, ${l}%, ${a})` : `hsl(${h}, ${s}%, ${l}%)`;
  }

  hueTo(value: number | keyof typeof HueColors): this {
    const { h, s, l, a } = this.hsla();
    const newHue = typeof value === "number" ? adjustHue(value) : Number(HueColors[value].match(/\d{1,3}/) ?? h);
    this.#color = HSLtoRGB({ h: newHue, s, l, a });
    return this;
  }

  hueBy(delta: number): this {
    const { h, s, l, a } = this.hsla();
    this.#color = HSLtoRGB({ h: adjustHue(h + delta), s, l, a });
    return this;
  }

  saturateBy(delta: number): this {
    const { h, s, l, a } = this.hsla();
    this.#color = HSLtoRGB({ h, s: clamp(0, s + delta, 100), l, a });
    return this;
  }

  desaturateBy(delta: number): this {
    return this.saturateBy(-1 * delta);
  }

  lighterBy(delta: number): this {
    const { h, s, l, a } = this.hsla();
    this.#color = HSLtoRGB({ h, s, l: clamp(0, l + delta, 100), a });
    return this;
  }

  darkerBy(delta: number): this {
    return this.lighterBy(-1 * delta);
  }

  alphaTo(value: number): this {
    this.#color = { ...this.#color, a: clamp(0, value, 1) };
    return this;
  }

  alphaBy(delta: number): this {
    this.#color = { ...this.#color, a: clamp(0, this.#color.a + delta, 1) };
    return this;
  }

  invert({ alpha = false } = {}): this {
    const { r, g, b, a } = this.#color;
    this.#color = { r: 255 - r, g: 255 - g, b: 255 - b, a: alpha ? 1 - a : a };
    return this;
  }

  grayscale(): this {
    return this.desaturateBy(100);
  }

  rotate(value: number): this {
    return this.hueBy(value);
  }
}

/**
 * Generates a random RGBA color which can then be converted into any color space
 * @returns A random RGBA color instance that is properly bounded
 */
export function random(): ColorMaster {
  return new ColorMaster({ r: rng(255), g: rng(255), b: rng(255), a: Math.random() });
}

/**
 * ColorMaster comes with core functionality by default. This helper function allows users to extend that functionality.
 * @param plugins These extend ColorMaster's functionality
 * @see {@link https://github.com/lbragile/ColorMaster#-plugins} for a list of supported plugins
 */
export function extendPlugins(plugins: TPlugin[]): void {
  // filter unique plugins
  plugins = plugins.filter((x, i, arr) => arr.indexOf(x) === i);
  plugins.forEach((plugin) => plugin(ColorMaster));
}

export default (color: TInput): ColorMaster => new ColorMaster(color);
