import CM from "../index";
import { BOUNDS } from "../enums/bounds";
import {
  IA11yOpts,
  IAlphaInvert,
  IMonochromatic,
  IReadable,
  IStringOpts,
  TChannelHSL,
  THarmony,
  THSLAInput,
  TNumArr
} from "../types/common";
import { Ihsla, IHSLColors } from "../types/hsl";
import { clampNum, round } from "../utils/numeric";
import HEXColors from "./hex";
import RGBColors from "./rgb";
import { HueColors } from "../enums/colors";

export default class HSLColors implements IHSLColors {
  #hsla: Ihsla;

  constructor(h = 0, s: number = BOUNDS.HSL_SATURATION, l = 0, a = 1) {
    // clamp the values
    h %= 360;
    h = h < 0 ? h + 360 : h; // 0 === 360 degrees
    s = clampNum(0, s, BOUNDS.HSL_SATURATION);
    l = clampNum(0, l, BOUNDS.HSL_LIGHTNESS);
    a = clampNum(0, a, 1);

    this.#hsla = { h, s, l, a };
  }

  get object(): Ihsla {
    return this.#hsla;
  }

  set object(obj: Ihsla) {
    this.#hsla = obj;
  }

  get array(): Required<TNumArr> {
    return Object.values(this.object) as Required<TNumArr>;
  }

  set array(arr: TNumArr) {
    this.object = { h: arr[0], s: arr[1], l: arr[2], a: arr[3] ?? 1 };
  }

  get format(): string {
    return "hsl";
  }

  get red(): number {
    return this.rgb().object.r;
  }

  get blue(): number {
    return this.rgb().object.b;
  }

  get green(): number {
    return this.rgb().object.g;
  }

  get alpha(): number {
    return this.object.a;
  }

  get hue(): number {
    return this.object.h;
  }

  get saturation(): number {
    return this.object.s;
  }

  get lightness(): number {
    return this.object.l;
  }

  string({ withAlpha = true, precision = [0, 0, 0, 1] }: IStringOpts = {}): string {
    const [Hp, Sp, Lp, Ap] = this.array.map((val, i) => round(val, precision[i] ?? 1));
    const alpha = withAlpha ? ", " + Ap : "";
    return `hsl${withAlpha ? "a" : ""}(${Hp}, ${Sp}%, ${Lp}%${alpha})`;
  }

  name({ exact = true }: { exact?: boolean } = {}): string {
    return this.rgb().name({ exact });
  }

  rgb(): RGBColors {
    const { h, s, l, a } = this.object;
    const L = l / BOUNDS.HSL_LIGHTNESS;
    const S = s / BOUNDS.HSL_SATURATION;

    const C = (1 - Math.abs(2 * L - 1)) * S;
    const X = C * (1 - Math.abs(((h / 60) % 2) - 1));
    const m = L - C / 2;

    const Rp = h < 60 || (300 <= h && h < 360) ? C : 120 <= h && h < 240 ? 0 : X;
    const Gp = 240 <= h && h < 360 ? 0 : 60 <= h && h < 180 ? C : X;
    const Bp = h < 120 ? 0 : 180 <= h && h < 300 ? C : X;

    const [r, g, b] = [Rp, Gp, Bp].map((val) => (val + m) * BOUNDS.RGB_CHANNEL);
    return new RGBColors(r, g, b, a);
  }

  hex(): HEXColors {
    return this.rgb().hex();
  }

  changeValueTo(channel: TChannelHSL, value: number): HSLColors {
    value = channel === "hue" ? value % 360 : clampNum(0, value, channel === "alpha" ? 1 : BOUNDS.HSL_LIGHTNESS);
    this.object = { ...this.object, [channel[0]]: value };
    return this;
  }

  changeValueBy(channel: TChannelHSL, delta: number): HSLColors {
    const firstChannelLetter = channel[0] as keyof Ihsla;
    const currVal = this.object[firstChannelLetter] + delta;
    const value =
      channel === "hue" ? currVal % 360 : clampNum(0, currVal, channel === "alpha" ? 1 : BOUNDS.HSL_LIGHTNESS);
    this.object[channel[0] as keyof Ihsla] = value < 0 ? value + 360 : value;
    return this;
  }

  hueTo(value: number | keyof typeof HueColors): HSLColors {
    return this.changeValueTo("hue", typeof value === "string" ? CM.RGBAFrom(HueColors[value]).hue : (value as number));
  }

  hueBy(delta: number): HSLColors {
    return this.changeValueBy("hue", delta);
  }

  alphaTo(value: number): HSLColors {
    return this.changeValueTo("alpha", value);
  }

  alphaBy(delta: number): HSLColors {
    return this.changeValueBy("alpha", delta);
  }

  invert({ includeAlpha = true }: IAlphaInvert = {}): HSLColors {
    return this.rgb().invert({ includeAlpha }).hsl();
  }

  saturateBy(delta: number): HSLColors {
    const s = clampNum(
      0,
      this.object.s + (Math.abs(delta) > 1 ? delta : delta * BOUNDS.HSL_SATURATION),
      BOUNDS.HSL_SATURATION
    );
    this.object = { ...this.object, s };
    return this;
  }

  desaturateBy(delta: number): HSLColors {
    return this.saturateBy(-1 * delta);
  }

  lighterBy(delta: number): HSLColors {
    const l = clampNum(
      0,
      this.object.l + (Math.abs(delta) > 1 ? delta : delta * BOUNDS.HSL_LIGHTNESS),
      BOUNDS.HSL_LIGHTNESS
    );
    this.object = { ...this.object, l };
    return this;
  }

  darkerBy(delta: number): HSLColors {
    return this.lighterBy(-1 * delta);
  }

  grayscale(): HSLColors {
    return this.desaturateBy(100);
  }

  rotate(value: number): HSLColors {
    return this.hueBy(value);
  }

  closestWebSafe(): HSLColors {
    return this.rgb().closestWebSafe().hsl();
  }

  brightness({ precision = 4, percentage = false }: IA11yOpts = {}): number {
    return this.rgb().brightness({ precision, percentage });
  }

  luminance({ precision = 4, percentage = false }: IA11yOpts = {}): number {
    return this.rgb().luminance({ precision, percentage });
  }

  contrast(
    bgColor: THSLAInput | HSLColors = [0, 0, 100, 1.0],
    { precision = 4, ratio = false }: IA11yOpts = {}
  ): string | number {
    bgColor = bgColor instanceof HSLColors ? bgColor : CM.HSLAFrom(bgColor);
    return this.rgb().contrast(bgColor.rgb(), { precision, ratio });
  }

  isLight(): boolean {
    return this.brightness() >= 0.5;
  }

  isDark(): boolean {
    return !this.isLight();
  }

  readableOn(
    bgColor: THSLAInput | HSLColors = [0, 0, 100, 1.0],
    { size = "body", ratio = "minimum" }: IReadable = {}
  ): boolean {
    bgColor = bgColor instanceof HSLColors ? bgColor : CM.HSLAFrom(bgColor);
    return this.rgb().readableOn(bgColor.rgb(), { size, ratio });
  }

  equalTo(compareColor: THSLAInput | HSLColors = [0, 0, 100, 1.0]): boolean {
    // ! do not convert to RGB space since HSLA is a many-to-one mapping in RGBA space (example, 100% lightness)
    compareColor = compareColor instanceof HSLColors ? compareColor : CM.HSLAFrom(compareColor);
    return JSON.stringify(this.array) === JSON.stringify(compareColor.array);
  }

  harmony(type: THarmony = "analogous", { effect = "tones", amount = 5 }: IMonochromatic = {}): HSLColors[] {
    const { h, s, l, a } = this.object;

    if (type === "monochromatic") {
      amount = clampNum(2, amount, 10);
    }

    switch (type) {
      case "analogous":
        return [-30, 0, 30].map((angle) => new HSLColors(h + angle, s, l, a));

      case "complementary":
        return [0, 180].map((angle) => new HSLColors(h + angle, s, l, a));

      case "split-complementary": // aka compound
        return [0, 150, 210].map((angle) => new HSLColors(h + angle, s, l, a));

      case "double-split-complementary":
        return [-30, 0, 30, 150, 210].map((angle) => new HSLColors(h + angle, s, l, a));

      case "triad":
        return [0, 120, 240].map((angle) => new HSLColors(h + angle, s, l, a));

      case "rectangle":
        return [0, 60, 180, 240].map((angle) => new HSLColors(h + angle, s, l, a));

      case "square":
        return [0, 90, 180, 270].map((angle) => new HSLColors(h + angle, s, l, a));

      case "monochromatic": {
        // tones uses saturation, tints/shades use lightness
        const valueToAdjust = effect === "tones" ? s : l;

        // form array of n (amount) evenly spaced items from current saturation/lightness to min/max value
        let delta = (effect === "tints" ? BOUNDS.HSL_LIGHTNESS - valueToAdjust : valueToAdjust) / amount;
        delta = effect === "tints" ? delta : -1 * delta;

        const valArr: number[] = [valueToAdjust];
        for (let i = 0; i < amount; i++) {
          valArr.push(valArr[i] + delta);
        }

        return effect === "tones"
          ? valArr.map((sat) => new HSLColors(h, sat, l, a))
          : valArr.map((light) => new HSLColors(h, s, light, a));
      }

      // no default
    }
  }

  isCool(): boolean {
    const { h } = this.object;
    return 75 <= h && h < 255;
  }

  isWarm(): boolean {
    return !this.isCool();
  }

  isTinted(): boolean {
    return this.object.l > 50.0;
  }

  isShaded(): boolean {
    return this.object.l < 50.0;
  }

  isToned(): boolean {
    return this.object.s < 100.0;
  }
}
