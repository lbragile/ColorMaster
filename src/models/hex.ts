import CM from "../index";
import { BOUNDS } from "../enums/bounds";
import {
  IA11yOpts,
  IAlphaInvert,
  IReadable,
  IStringOpts,
  TChannel,
  THEXAInput,
  TOperator,
  TStrArr
} from "../types/common";
import { Ihexa, IHEXColors } from "../types/hex";
import { clampStr } from "../utils/numeric";
import HSLColors from "./hsl";
import RGBColors from "./rgb";

export default class HEXColors implements IHEXColors {
  #hexa: Ihexa;

  constructor(r = "00", g = "00", b = "00", a = "FF") {
    // make sure all elements are the same case when clamping. Also ensure that each channel is 2 characters
    const [Rp, Gp, Bp, Ap] = [r, g, b, a].map((val) =>
      clampStr("00", val.padStart(2, "0").toUpperCase(), BOUNDS.HEX_CHANNEL_UPPER)
    );

    this.#hexa = { r: Rp, g: Gp, b: Bp, a: Ap };
  }

  get object(): Ihexa {
    return this.#hexa;
  }

  set object(obj: Ihexa) {
    this.#hexa = obj;
  }

  get array(): Required<TStrArr> {
    return Object.values(this.object) as Required<TStrArr>;
  }

  set array(arr: TStrArr) {
    this.object = { r: arr[0], g: arr[1], b: arr[2], a: arr[3] ?? "FF" };
  }

  get format(): string {
    return "hex";
  }

  get red(): string {
    return this.object.r;
  }

  get blue(): string {
    return this.object.b;
  }

  get green(): string {
    return this.object.g;
  }

  get alpha(): string {
    return this.object.a;
  }

  get hue(): number {
    return this.hsl().object.h;
  }

  get saturation(): number {
    return this.hsl().object.s;
  }

  get lightness(): number {
    return this.hsl().object.l;
  }

  string({ withAlpha = true }: IStringOpts = {}): string {
    const [Rp, Gp, Bp, Ap] = this.array.map((val) => val.slice(0, 2));
    const alpha = withAlpha ? Ap : "";
    return `#${Rp}${Gp}${Bp}${alpha}`;
  }

  name(): string {
    return this.rgb().name();
  }

  rgb(): RGBColors {
    const [r, g, b, a] = this.array.map((part) => parseInt(part, 16));
    return new RGBColors(r, g, b, a / BOUNDS.RGB_CHANNEL);
  }

  hsl(): HSLColors {
    return this.rgb().hsl();
  }

  changeValueTo(channel: TChannel, value: string): HEXColors {
    value = value.toUpperCase() > "FF" ? "FF" : value;
    const argVal = parseInt(value.padStart(2, "0"), 16);

    return this.rgb()
      .changeValueTo(channel, channel === "alpha" ? argVal / BOUNDS.RGB_CHANNEL : argVal)
      .hex();
  }

  changeValueBy(channel: TChannel, delta: string, type: TOperator): HEXColors {
    const numericDelta = parseInt(delta.padStart(2, "0"), 16);
    const signedDelta = type === "add" ? numericDelta : -1 * numericDelta;
    return this.rgb()
      .changeValueBy(channel, channel === "alpha" ? signedDelta / BOUNDS.RGB_CHANNEL : signedDelta)
      .hex();
  }

  alphaTo(value: string): HEXColors {
    return this.changeValueTo("alpha", value);
  }

  alphaBy(delta: string, type: TOperator): HEXColors {
    return this.changeValueBy("alpha", delta, type);
  }

  invert({ includeAlpha = true }: IAlphaInvert = {}): HEXColors {
    return this.rgb().invert({ includeAlpha }).hex();
  }

  saturateBy(delta: string): HEXColors {
    return this.hsl()
      .saturateBy((parseInt(delta, 16) * BOUNDS.HSL_SATURATION) / BOUNDS.RGB_CHANNEL)
      .hex();
  }

  desaturateBy(delta: string): HEXColors {
    return this.hsl()
      .desaturateBy((parseInt(delta, 16) * BOUNDS.HSL_SATURATION) / BOUNDS.RGB_CHANNEL)
      .hex();
  }

  lighterBy(delta: string): HEXColors {
    return this.hsl()
      .lighterBy((parseInt(delta, 16) * BOUNDS.HSL_LIGHTNESS) / BOUNDS.RGB_CHANNEL)
      .hex();
  }

  darkerBy(delta: string): HEXColors {
    return this.hsl()
      .darkerBy((parseInt(delta, 16) * BOUNDS.HSL_LIGHTNESS) / BOUNDS.RGB_CHANNEL)
      .hex();
  }

  grayscale(): HEXColors {
    return this.hsl().grayscale().hex();
  }

  rotate(value: number): HEXColors {
    return this.hsl().rotate(value).hex();
  }

  closestWebSafe(): HEXColors {
    return this.rgb().closestWebSafe().hex();
  }

  brightness({ precision = 4, percentage = false }: IA11yOpts = {}): number {
    return this.rgb().brightness({ precision, percentage });
  }

  luminance({ precision = 4, percentage = false }: IA11yOpts = {}): number {
    return this.rgb().luminance({ precision, percentage });
  }

  contrast(
    bgColor: THEXAInput | HEXColors = "#FFFFFFFF",
    { precision = 4, ratio = false }: IA11yOpts = {}
  ): string | number {
    bgColor = bgColor instanceof HEXColors ? bgColor : CM.HEXAFrom(bgColor);
    return this.rgb().contrast(bgColor.rgb(), { precision, ratio });
  }

  isLight(): boolean {
    return this.brightness() >= 0.5;
  }

  isDark(): boolean {
    return !this.isLight();
  }

  readableOn(
    bgColor: THEXAInput | HEXColors = "#FFFFFFFF",
    { size = "body", ratio = "minimum" }: IReadable = {}
  ): boolean {
    bgColor = bgColor instanceof HEXColors ? bgColor : CM.HEXAFrom(bgColor);
    return this.rgb().readableOn(bgColor.rgb(), { size, ratio });
  }

  equalTo(compareColor: THEXAInput | HEXColors = "#FFFFFFFF"): boolean {
    compareColor = compareColor instanceof HEXColors ? compareColor : CM.HEXAFrom(compareColor);
    return this.array.join("") === compareColor.array.join("");
  }
}
