import CM from "../index";
import { IA11yOpts, IAlphaInvert, IReadable, IStringOpts, TChannel, TNumArr, TRGBAInput } from "../types/common";
import { Irgba, IRGBColors } from "../types/rgb";
import { BOUNDS } from "../enums/bounds";
import { RGBExtended, WebSafe } from "../enums/colors";
import { clampNum, round, sRGB } from "../utils/numeric";
import { createColorArrFromStr } from "../utils/string";
import HSLColors from "./hsl";
import HEXColors from "./hex";

export default class RGBColors implements IRGBColors {
  #rgba: Irgba;

  constructor(r = 0, g = 0, b = 0, a = 1) {
    // clamp the values
    const [Rp, Gp, Bp] = [r, g, b].map((val) => clampNum(0, val, BOUNDS.RGB_CHANNEL));
    const Ap = clampNum(0, a, 1);

    this.#rgba = { r: Rp, g: Gp, b: Bp, a: Ap };
  }

  get object(): Irgba {
    return this.#rgba;
  }

  set object(obj: Irgba) {
    this.#rgba = obj;
  }

  get array(): Required<TNumArr> {
    return Object.values(this.object) as Required<TNumArr>;
  }

  set array(arr: TNumArr) {
    this.object = { r: arr[0], g: arr[1], b: arr[2], a: arr[3] ?? 1 };
  }

  get format(): string {
    return "rgb";
  }

  get red(): number {
    return this.object.r;
  }

  get blue(): number {
    return this.object.b;
  }

  get green(): number {
    return this.object.g;
  }

  get alpha(): number {
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

  string({ withAlpha = true, precision = [0, 0, 0, 1] }: IStringOpts = {}): string {
    const [Rp, Gp, Bp, Ap] = this.array.map((val, i) => round(val, precision[i] ?? 1));
    const alpha = withAlpha ? ", " + Ap : "";
    return `rgb${withAlpha ? "a" : ""}(${Rp}, ${Gp}, ${Bp}${alpha})`;
  }

  name({ exact = true }: { exact?: boolean } = {}): string {
    const { a } = this.object;
    const re = /rgb\(|\)/g;

    if (a === 0) return "transparent";

    const rgbStr = this.string({ withAlpha: false }).replace(/\s/g, "");
    const [r, g, b] = createColorArrFromStr(rgbStr, re);

    const keys = Object.keys(RGBExtended);
    const values = Object.values(RGBExtended);

    let matchStr: string | undefined;
    if (exact) {
      matchStr = keys.find((key) => RGBExtended[key as keyof typeof RGBExtended] === rgbStr);
    } else {
      let minDist = Number.POSITIVE_INFINITY;
      for (let i = 0; i < values.length; i++) {
        const [Rp, Gp, Bp] = createColorArrFromStr(values[i], re);
        const currDist = Math.abs(Rp - r) + Math.abs(Gp - g) + Math.abs(Bp - b);
        if (currDist < minDist) {
          minDist = currDist;
          matchStr = keys[i];
        }
      }
    }

    return matchStr ? matchStr + (a < 1 ? " (with opacity)" : "") : "undefined";
  }

  hsl(): HSLColors {
    const { r, g, b, a } = this.object;
    const Rp = r / BOUNDS.RGB_CHANNEL;
    const Gp = g / BOUNDS.RGB_CHANNEL;
    const Bp = b / BOUNDS.RGB_CHANNEL;

    const Cmax = Math.max(Rp, Gp, Bp);
    const Cmin = Math.min(Rp, Gp, Bp);
    const delta = Cmax - Cmin;

    const H =
      delta === 0
        ? 0
        : Cmax === Rp
        ? ((Gp - Bp) / delta) % 6
        : Cmax === Gp
        ? (Bp - Rp) / delta + 2
        : (Rp - Gp) / delta + 4;
    const L = (Cmax + Cmin) / 2;
    const S = delta === 0 ? 0 : delta / (1 - Math.abs(2 * L - 1));

    return new HSLColors(H * 60, S * BOUNDS.HSL_SATURATION, L * BOUNDS.HSL_LIGHTNESS, a);
  }

  hex(): HEXColors {
    const { r, g, b, a } = this.object;
    const [Rp, Gp, Bp, Ap] = [r, g, b, Math.round(a * BOUNDS.RGB_CHANNEL)].map((x) => x.toString(16).padStart(2, "0"));
    return new HEXColors(Rp, Gp, Bp, Ap);
  }

  changeValueTo(channel: TChannel, value: number): RGBColors {
    value = clampNum(0, value, channel === "alpha" ? 1 : BOUNDS.RGB_CHANNEL);
    this.object = { ...this.object, [channel[0]]: value };
    return this;
  }

  changeValueBy(channel: TChannel, delta: number): RGBColors {
    const firstChannelLetter = channel[0] as keyof Irgba;
    const value = clampNum(0, this.object[firstChannelLetter] + delta, channel === "alpha" ? 1 : BOUNDS.RGB_CHANNEL);
    this.object[channel[0] as keyof Irgba] = value;
    return this;
  }

  alphaTo(value: number): RGBColors {
    return this.changeValueTo("alpha", value);
  }

  alphaBy(delta: number): RGBColors {
    return this.changeValueBy("alpha", delta);
  }

  invert({ includeAlpha = true }: IAlphaInvert = {}): RGBColors {
    const { r, g, b, a } = this.object;
    const [Rnew, Gnew, Bnew] = [r, g, b].map((val) => BOUNDS.RGB_CHANNEL - val);
    const Anew = includeAlpha ? 1 - a : a;
    this.object = { r: Rnew, g: Gnew, b: Bnew, a: Anew };
    return this;
  }

  saturateBy(delta: number): RGBColors {
    return this.hsl().saturateBy(delta).rgb();
  }

  desaturateBy(delta: number): RGBColors {
    return this.hsl().desaturateBy(delta).rgb();
  }

  lighterBy(delta: number): RGBColors {
    return this.hsl().lighterBy(delta).rgb();
  }

  darkerBy(delta: number): RGBColors {
    return this.hsl().darkerBy(delta).rgb();
  }

  grayscale(): RGBColors {
    return this.hsl().grayscale().rgb();
  }

  rotate(value: number): RGBColors {
    return this.hsl().rotate(value).rgb();
  }

  closestWebSafe(): RGBColors {
    const { r, g, b, a } = this.object;
    const webSafeArr = Object.values(WebSafe).map((str) => str.replace(/rgb\(|\)/g, ""));

    let closestVal = new Array(3).fill(0);
    let minDist = Number.POSITIVE_INFINITY;
    for (let i = 0; i < webSafeArr.length; i++) {
      const [Rs, Gs, Bs] = webSafeArr[i].split(",").map((val) => +val);

      // channel wise distance
      const currDist = Math.abs(Rs - r) + Math.abs(Gs - g) + Math.abs(Bs - b);
      if (currDist < minDist) {
        closestVal = [Rs, Gs, Bs];
        minDist = currDist;
      }
    }

    this.array = [...closestVal, a] as Required<TNumArr>;
    return this;
  }

  brightness({ precision = 4, percentage = false }: IA11yOpts = {}): number {
    const { r, g, b } = this.object;
    const brightness = +((r * 0.299 + g * 0.587 + b * 0.114) / BOUNDS.RGB_CHANNEL).toFixed(precision);
    return percentage ? brightness * 100 : brightness;
  }

  luminance({ precision = 4, percentage = false }: IA11yOpts = {}): number {
    const { r, g, b } = this.object;
    const L = +(0.2126 * sRGB(r) + 0.7152 * sRGB(g) + 0.0722 * sRGB(b)).toFixed(precision);
    return percentage ? L * 100 : L;
  }

  contrast(
    bgColor: TRGBAInput | RGBColors = [255, 255, 255, 1.0],
    { precision = 4, ratio = false }: IA11yOpts = {}
  ): string | number {
    bgColor = bgColor instanceof RGBColors ? bgColor : CM.RGBAFrom(bgColor);
    const Lf = this.luminance();
    const Lb = bgColor.luminance();
    const contrast = ((Math.max(Lf, Lb) + 0.05) / (Math.min(Lf, Lb) + 0.05)).toFixed(precision);
    return ratio ? contrast + ":1" : +contrast;
  }

  isLight(): boolean {
    return this.brightness() >= 0.5;
  }

  isDark(): boolean {
    return !this.isLight();
  }

  readableOn(
    bgColor: TRGBAInput | RGBColors = [255, 255, 255, 1.0],
    { size = "body", ratio = "minimum" }: IReadable = {}
  ): boolean {
    const contrast = this.contrast(bgColor);
    if (size === "body" && ratio === "enhanced") return contrast >= 7.0;
    else if (size === "large" && ratio === "minimum") return contrast >= 3.0;
    else return contrast >= 4.5;
  }

  equalTo(compareColor: TRGBAInput | RGBColors = [255, 255, 255, 1.0]): boolean {
    compareColor = compareColor instanceof RGBColors ? compareColor : CM.RGBAFrom(compareColor);
    return JSON.stringify(this.array) === JSON.stringify(compareColor.array);
  }
}
