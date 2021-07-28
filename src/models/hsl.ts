import { BOUNDS } from "../enums/bounds";
import { IStringOpts, TChannelHSL, TNumArr } from "../types/common";
import { Ihsla, IHSLColors } from "../types/hsl";
import { clamp, round } from "../utils/numeric";
import HEXColors from "./hex";
import RGBColors from "./rgb";

export default class HSLColors implements IHSLColors {
  #hsla: Ihsla;

  constructor(h = 0, s: number = BOUNDS.HSL_LIGHTNESS, l = 0, a = 1) {
    // clamp the values
    h %= 360;
    h = h < 0 ? h + 360 : h; // 0 === 360 degrees
    s = clamp(0, s, BOUNDS.HSL_SATURATION);
    l = clamp(0, l, BOUNDS.HSL_LIGHTNESS);
    a = clamp(0, a, 1);

    this.#hsla = { h, s, l, a };
  }

  get hslaObj(): Ihsla {
    return this.#hsla;
  }

  set hslaObj(obj: Ihsla) {
    this.#hsla = obj;
  }

  get hslaArr(): Required<TNumArr> {
    return Object.values(this.#hsla) as Required<TNumArr>;
  }

  set hslaArr(arr: TNumArr) {
    this.#hsla = { h: arr[0], s: arr[1], l: arr[2], a: arr[3] ?? 1 };
  }

  string({ withAlpha = true, quotes = "single", precision = [0, 0, 0, 1] }: IStringOpts = {}): string {
    const quote = quotes === "single" ? "'" : '"';
    const [Hp, Sp, Lp, Ap] = this.hslaArr.map((val, i) => round(val, precision[i] ?? 1));
    const alpha = withAlpha ? ", " + Ap : "";
    return `${quote}hsl${withAlpha ? "a" : ""}(${Hp}, ${Sp}%, ${Lp}%${alpha})${quote}`;
  }

  rgb(): RGBColors {
    const { h, s, l, a } = this.#hsla;
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
    value = channel === "hue" ? value % 360 : clamp(0, value, channel === "alpha" ? 1 : BOUNDS.HSL_LIGHTNESS);
    this.hslaObj = { ...this.hslaObj, [channel[0]]: value };
    return this;
  }

  changeValueBy(channel: TChannelHSL, delta: number): HSLColors {
    const firstChannelLetter = channel[0] as keyof Ihsla;
    const currVal = this.hslaObj[firstChannelLetter] + delta;
    const value = channel === "hue" ? currVal % 360 : clamp(0, currVal, channel === "alpha" ? 1 : BOUNDS.HSL_LIGHTNESS);
    this.hslaObj[channel[0] as keyof Ihsla] = value < 0 ? value + 360 : value;
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

  invert({ includeAlpha = true }: { includeAlpha?: boolean } = {}): HSLColors {
    return this.rgb().invert({ includeAlpha }).hsl();
  }

  saturateBy(delta: number): HSLColors {
    const s = clamp(
      0,
      this.hslaObj.s + (Math.abs(delta) > 1 ? delta : delta * BOUNDS.HSL_SATURATION),
      BOUNDS.HSL_SATURATION
    );
    this.hslaObj = { ...this.#hsla, s };
    return this;
  }

  desaturateBy(delta: number): HSLColors {
    return this.saturateBy(-1 * delta);
  }

  lighterBy(delta: number): HSLColors {
    const l = clamp(
      0,
      this.hslaObj.l + (Math.abs(delta) > 1 ? delta : delta * BOUNDS.HSL_LIGHTNESS),
      BOUNDS.HSL_LIGHTNESS
    );
    this.hslaObj = { ...this.#hsla, l };
    return this;
  }

  darkerBy(delta: number): HSLColors {
    return this.lighterBy(-1 * delta);
  }

  grayscale(): HSLColors {
    return this.desaturateBy(100);
  }
}
