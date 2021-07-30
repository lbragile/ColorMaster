import { IAlphaInvert, IStringOpts, TChannel, TNumArr } from "../types/common";
import { Irgba, IRGBColors } from "../types/rgb";
import { BOUNDS } from "../enums/bounds";
import { RGBExtended, WebSafe } from "../enums/colors";
import { clampNum, round } from "../utils/numeric";
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

  string({ withAlpha = true, precision = [0, 0, 0, 1] }: IStringOpts = {}): string {
    const [Rp, Gp, Bp, Ap] = this.array.map((val, i) => round(val, precision[i] ?? 1));
    const alpha = withAlpha ? ", " + Ap : "";
    return `rgb${withAlpha ? "a" : ""}(${Rp}, ${Gp}, ${Bp}${alpha})`;
  }

  name(): string {
    const { a } = this.object;
    if (a === 0) return "transparent";

    const COLORS_OBJ = JSON.parse(JSON.stringify(RGBExtended));
    const rgbStr = this.string({ withAlpha: false }).replace(/\s/g, "");
    const matchStr = Object.keys(COLORS_OBJ).find((key) => COLORS_OBJ[key] === rgbStr);

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
}
