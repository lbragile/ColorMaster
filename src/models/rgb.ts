import { IStringOpts, TChannel, TNumArr } from "../types/common";
import { Irgba, IRGBColors } from "../types/rgb";
import { BOUNDS } from "../enums/bounds";
import { clamp, round } from "../utils/numeric";
import HSLColors from "./hsl";
import HEXColors from "./hex";

export default class RGBColors implements IRGBColors {
  #rgba: Irgba;

  constructor(r = 0, g = 0, b = 0, a = 1) {
    // clamp the values
    const [Rp, Gp, Bp] = [r, g, b].map((val) => clamp(0, val, BOUNDS.RGB_CHANNEL));
    const Ap = clamp(0, a, 1);

    this.#rgba = { r: Rp, g: Gp, b: Bp, a: Ap };
  }

  get rgbaObj(): Irgba {
    return this.#rgba;
  }

  set rgbaObj(obj: Irgba) {
    this.#rgba = obj;
  }

  get rgbaArr(): Required<TNumArr> {
    return Object.values(this.#rgba) as Required<TNumArr>;
  }

  set rgbaArr(arr: TNumArr) {
    this.#rgba = { r: arr[0], g: arr[1], b: arr[2], a: arr[3] ?? 1 };
  }

  string({ withAlpha = true, quotes = "single", precision = [0, 0, 0, 1] }: IStringOpts = {}): string {
    const quote = quotes === "single" ? "'" : '"';
    const [Rp, Gp, Bp, Ap] = this.rgbaArr.map((val, i) => round(val, precision[i] ?? 1));
    const alpha = withAlpha ? ", " + Ap : "";
    return `${quote}rgb${withAlpha ? "a" : ""}(${Rp}, ${Gp}, ${Bp}${alpha})${quote}`;
  }

  hsl(): HSLColors {
    const { r, g, b, a } = this.#rgba;
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
    const { r, g, b, a } = this.rgbaObj;
    const [Rp, Gp, Bp, Ap] = [r, g, b, Math.round(a * BOUNDS.RGB_CHANNEL)].map((x) => x.toString(16).padStart(2, "0"));
    return new HEXColors(Rp, Gp, Bp, Ap);
  }

  changeValueTo(channel: TChannel, value: number): RGBColors {
    value = clamp(0, value, channel === "alpha" ? 1 : BOUNDS.RGB_CHANNEL);
    this.rgbaObj = { ...this.rgbaObj, [channel[0]]: value };
    return this;
  }

  changeValueBy(channel: TChannel, delta: number): RGBColors {
    const firstChannelLetter = channel[0] as keyof Irgba;
    const value = clamp(0, this.rgbaObj[firstChannelLetter] + delta, channel === "alpha" ? 1 : BOUNDS.RGB_CHANNEL);
    this.rgbaObj[channel[0] as keyof Irgba] = value;
    return this;
  }

  alphaTo(value: number): RGBColors {
    return this.changeValueTo("alpha", value);
  }

  alphaBy(delta: number): RGBColors {
    return this.changeValueBy("alpha", delta);
  }

  invert({ includeAlpha = true }: { includeAlpha?: boolean } = {}): RGBColors {
    const { r, g, b, a } = this.rgbaObj;
    const [Rnew, Gnew, Bnew] = [r, g, b].map((val) => BOUNDS.RGB_CHANNEL - val);
    const Anew = includeAlpha ? 1 - a : a;
    this.rgbaObj = { r: Rnew, g: Gnew, b: Bnew, a: Anew };
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
}
