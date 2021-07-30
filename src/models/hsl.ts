import { BOUNDS } from "../enums/bounds";
import { IAlphaInvert, IStringOpts, TChannelHSL, TNumArr } from "../types/common";
import { Ihsla, IHSLColors } from "../types/hsl";
import { clampNum, round } from "../utils/numeric";
import HEXColors from "./hex";
import RGBColors from "./rgb";

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

  string({ withAlpha = true, precision = [0, 0, 0, 1] }: IStringOpts = {}): string {
    const [Hp, Sp, Lp, Ap] = this.array.map((val, i) => round(val, precision[i] ?? 1));
    const alpha = withAlpha ? ", " + Ap : "";
    return `hsl${withAlpha ? "a" : ""}(${Hp}, ${Sp}%, ${Lp}%${alpha})`;
  }

  name(): string {
    return this.rgb().name();
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

  hueTo(value: number): HSLColors {
    return this.changeValueTo("hue", value);
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
}
