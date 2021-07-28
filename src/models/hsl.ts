import { BOUNDS } from "../enums/bounds";
import { IStringOpts } from "../types/common";
import { Ihsla, TChannelHSL } from "../types/hsl";
import { clamp, round } from "../utils/numeric";
import HEXColors from "./hex";
import RGBColors from "./rgb";

export default class HSLColors {
  #hsla: Ihsla;

  constructor(h: number, s: number, l: number, a = 1) {
    // set values to reasonable numbers if provided value is undefined
    if (h === undefined || s === undefined || l === undefined) {
      h = h ?? 0;
      s = s ?? BOUNDS.HSL_LIGHTNESS;
      l = l ?? 0;
    }

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

  /**
   * Gives the string representation of an input HSLA color object
   * @param opts -
   *  - withAlpha → whether or not to include the alpha channel in the output
   *  - quotes → type of quotes to use around the output
   *  - precision → how many decimal places to include for each value
   * @returns ```'hsla?(h, s%, l%, a?)'``` or ```"hsla?(h, s%, l%, a?)"```
   * @example ({ h: 128, s: 100, l: 100, a: 0.5 }).string({ quotes: 'double' }) → "hsla(128, 100%, 100%, 0.5)"
   */
  string({ withAlpha = true, quotes = "single", precision = [0, 0, 0, 1] }: IStringOpts = {}): string {
    const { h, s, l, a } = this.#hsla;
    const quote = quotes === "single" ? "'" : '"';
    const [Hp, Sp, Lp, Ap] = [h, s, l, a].map((val, i) => round(val, precision[i] ?? 1));
    const alpha = withAlpha ? ", " + Ap : "";
    return `${quote}hsl${withAlpha ? "a" : ""}(${Hp}, ${Sp}%, ${Lp}%${alpha})${quote}`;
  }

  /**
   * Lets you set a single channel value to a specific number
   * @param channel Which HSLA channel to set
   * @param value In range [0, 359] for `hue`. In range [0, 1] for `alpha`
   *
   * @note Hue is degrees based, thus clamping does not apply. Instead a k*360 multiple is added/subtracted from the value to get a value in range [0, 359]
   * @returns The instance that was acted upon → for function chaining
   */
  channelValueTo(channel: TChannelHSL, value: number): this {
    value = channel === "hue" ? value % 360 : clamp(0, value, channel === "alpha" ? 1 : BOUNDS.HSL_LIGHTNESS);
    this.#hsla = { ...this.#hsla, [channel[0]]: value };
    return this;
  }

  /**
   * Instead of setting the value as in {@link HSLColors.channelValueTo channelValueTo}, this allows you to adjust the channel value by `delta` amount.
   * @param channel Which HSLA channel to increment/decrement
   * @param delta A positive OR negative integer/decimal number to adjust the channel by
   *
   * @note Hue is degrees based, thus clamping does not apply. Instead a k*360 multiple is added/subtracted from the value to get a value in range [0, 359]
   * @returns The instance that was acted upon → for function chaining
   */
  channelValueBy(channel: TChannelHSL, delta: number): this {
    const firstChannelLetter = channel[0] as keyof Ihsla;
    const currVal = this.#hsla[firstChannelLetter] + delta;
    const value = channel === "hue" ? currVal % 360 : clamp(0, currVal, channel === "alpha" ? 1 : BOUNDS.HSL_LIGHTNESS);
    this.#hsla[channel[0] as keyof Ihsla] = value < 0 ? value + 360 : value;
    return this;
  }

  /**
   * Syntactic sugar for {@link HSLColors.channelValueTo channelValueTo} with "hue" as the channel
   * @param value Must be in range [0, 359]
   * @returns The instance that was acted upon → for function chaining
   */
  hueTo(value: number): HSLColors {
    return this.channelValueTo("hue", value);
  }

  /**
   * Syntactic sugar for {@link HSLColors.channelValueBy channelValueBy} with "hue" as the channel
   * @param delta When added to current alpha value, range must remain in [0, 359]
   * @returns The instance that was acted upon → for function chaining
   */
  hueBy(delta: number): HSLColors {
    return this.channelValueBy("hue", delta);
  }

  /**
   * Syntactic sugar for {@link HSLColors.channelValueTo channelValueTo} with "alpha" as the channel
   * @param value Must be in range [0, 1] as this is the alpha channel
   * @returns The instance that was acted upon → for function chaining
   */
  alphaTo(value: number): HSLColors {
    return this.channelValueTo("alpha", value);
  }

  /**
   * Syntactic sugar for {@link HSLColors.channelValueBy channelValueBy} with "alpha" as the channel
   * @param delta When added to current alpha value, range must remain in [0, 1]
   * @returns The instance that was acted upon → for function chaining
   */
  alphaBy(delta: number): HSLColors {
    return this.channelValueBy("alpha", delta);
  }

  /**
   * Converts a HSLA color to RGBA color
   *
   * @link https://www.rapidtables.com/convert/color/hsl-to-rgb.html
   * @returns {RGBColors} An RGBA instance that can be acted upon → for function chaining
   */
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

  /**
   * Converts a HSLA color to HEXA color
   *
   * @note First we convert to RGBA space, then to HEXA space
   * @returns {RGBColors} An HEXA instance that can be acted upon → for function chaining
   */
  hex(): HEXColors {
    return this.rgb().hex();
  }

  /**
   * Given an input color, get its inverse value by subtracting current value from the upper bound for each channel
   * @param { includeAlpha } opts Whether or not to also invert the alpha channel
   *
   * @note Here ColorMaster first converts to RGBA color space, does the inversion, and converts back to HSLA colorspace
   * @link https://pinetools.com/invert-color
   * @returns The corresponding inverse color
   */
  invert({ includeAlpha = true }: { includeAlpha?: boolean } = {}): HSLColors {
    return this.rgb().invert({ includeAlpha }).hsl();
  }

  /**
   * Syntactic sugar for {@link HSLColors.channelValueBy channelValueBy} with "saturation" as the channel
   * @param delta When added to current saturation value, range must remain in [0, 100]
   *
   * @note A negative value can be used, but we recommend using {@link HSLColors.desaturateBy desaturateBy} for clarity
   * @returns The instance that was acted upon → for function chaining
   */
  saturateBy(delta: number): this {
    const s = clamp(
      0,
      this.#hsla.s + (Math.abs(delta) > 1 ? delta : delta * BOUNDS.HSL_SATURATION),
      BOUNDS.HSL_SATURATION
    );
    this.hslaObj = { ...this.#hsla, s };
    return this;
  }

  /**
   * Syntactic sugar for {@link HSLColors.saturateBy saturateBy} with a negative value
   * @param delta When added to current saturation value, range must remain in [0, 100]
   * @returns The instance that was acted upon → for function chaining
   */
  desaturateBy(delta: number): this {
    return this.saturateBy(-1 * delta);
  }

  /**
   * Syntactic sugar for {@link HSLColors.channelValueBy channelValueBy} with "lightness" as the channel
   * @param delta When added to current lightness value, range must remain in [0, 100]
   *
   * @note A negative value can be used, but we recommend using {@link HSLColors.darkerBy darkerBy} for clarity
   * @returns The instance that was acted upon → for function chaining
   */
  lighterBy(delta: number): this {
    const l = clamp(
      0,
      this.#hsla.l + (Math.abs(delta) > 1 ? delta : delta * BOUNDS.HSL_LIGHTNESS),
      BOUNDS.HSL_LIGHTNESS
    );
    this.hslaObj = { ...this.#hsla, l };
    return this;
  }

  /**
   * Syntactic sugar for {@link HSLColors.lighterBy lighterBy} with a negative value
   * @param delta When added to current saturation value, range must remain in [0, 100]
   * @returns The instance that was acted upon → for function chaining
   */
  darkerBy(delta: number): this {
    return this.lighterBy(-1 * delta);
  }

  /**
   * Syntactic sugar for {@link HSLColors.desaturateBy desaturateBy} with a very large delta. Sets the saturation to 0%
   *
   * @note The lightness of the color remains unchanged by this operation
   * @returns The instance that was acted upon → for function chaining
   */
  grayscale(): this {
    return this.desaturateBy(100);
  }
}
